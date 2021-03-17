import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import {
  Card,
  SynthesizedSpinner,
  SynthesizedTable,
  SynthesizedDropdown
} from 'components';
import i18next from 'i18next';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';
import { tableMapper, transactionListMapper } from 'configuration/dataMappers';
import { transactionTableSchema } from 'configuration/tableSchemas';

export const actions = {
  selectWallet: 'select_wallet'
};
export const handlers = {
  [actions.selectWallet]: (state: any, action: any) => {
    const { selectedWallet } = action.payload;
    return { ...state, selectedWallet };
  }
};

class ClientDetailsWalletTab extends React.Component<any, any> {
  mapWalletDetails: (
    selectedWallet: any
  ) => {
    'balance.title': any;
    'mobile.number.title': any;
    'name.title': any;
    'wallet.status.title': any;
    'points.title': any;
    'id.title': any;
  };

  constructor(props: any) {
    super(props);
    props.fireDataAction(
      actionsList.Transaction.searchTransactions,
      { activePage: 1 },
      resourcesList.Transaction,
      props.sid
    );
    this.state = {};
    this.ClientWalletDetails = this.ClientWalletDetails.bind(this);
    this.ClientWalletList = this.ClientWalletList.bind(this);
    this.ClientDisputeList = this.ClientDisputeList.bind(this);
    this.ClientRecentTransactionList = this.ClientRecentTransactionList.bind(
      this
    );

    this.mapWalletDetails = (selectedWallet: any = {}) => {
      const {
        balance,
        mobileNumber,
        name,
        walletStatus,
        id,
        points
      } = selectedWallet;
      return {
        'balance.title': balance,
        'mobile.number.title': mobileNumber,
        'name.title': name,
        'wallet.status.title': walletStatus,
        'points.title': points,
        'id.title': id
      };
    };
  }

  ClientWalletList(): JSX.Element {
    const { sid, clientDetails, fireAction, fireDataAction } = this.props;
    const { wallet = [] } = clientDetails;
    return (
      <Card
        header={{
          title: 'wallet.list.title',
          icon: 'far fa-money-bill-alt'
        }}
      >
        <SynthesizedTable
          psid={sid}
          rowEvents={{
            onClick: (e: any, row: any) => {
              fireAction(actions.selectWallet, { selectedWallet: row });
              fireDataAction(
                actionsList.Transaction.searchTransactions,
                {
                  searchString: { wallet: { id: row.id } }
                },
                resourcesList.Transaction,
                sid
              );
            }
          }}
          schema={{
            keyField: '_id',
            columns: [
              {
                dataField: 'mobileNumber',

                text: 'mobile.number.title'
              },
              {
                dataField: 'balance',

                text: 'balance.title'
              }
            ]
          }}
          storeName={resourcesList.Transaction}
          dataMapper={(data: any = []): any => {
            return {
              data: wallet,
              ...tableMapper(data[`${resourcesList.Transaction}_0`])
            };
          }}
        />
      </Card>
    );
  }

  ClientWalletDetails(): JSX.Element {
    const { selectedWallet, sid } = this.props;
    const mappedWalletDetails: any = this.mapWalletDetails(selectedWallet);

    return (
      <Card
        header={{
          title: 'client.wallet.details.title',
          icon: 'fa fa-list-alt'
        }}
      >
        {selectedWallet && mappedWalletDetails ? (
          <>
            <Table>
              <tbody>
                {Object.entries(mappedWalletDetails).map(
                  ([key, value]: any, i) => (
                    <>
                      <tr key={i}>
                        <th scope="row">{i18next.t(key)}</th>
                        <td>{value}</td>
                      </tr>
                    </>
                  )
                )}
              </tbody>
            </Table>
            <SynthesizedDropdown
              permissions={{ canSelect: true }}
              label={i18next.t('action.title')}
              // handler={handleChangeSelectedRole}
              list={[
                { name: i18next.t('suspend.title'), value: 'suspend_wallet' },
                { name: i18next.t('close.title'), value: 'close_wallet' }
              ]}
              psid={sid}
            />
          </>
        ) : null}
      </Card>
    );
  }

  ClientRecentTransactionList(): JSX.Element {
    const { sid, selectedWallet } = this.props;
    return (
      <Card
        header={{
          title: 'recent.transaction.list.title',
          icon: 'fas fa-dollar-sign'
        }}
      >
        {selectedWallet ? (
          <SynthesizedTable
            actionCriteria={{
              searchString: { wallet: { id: selectedWallet.id } }
            }}
            psid={sid}
            schema={transactionTableSchema}
            storeName={resourcesList.Transaction}
            dataRef={[{ storeName: resourcesList.Transaction }]}
            dataMapper={(data: any = []): any => ({
              ...tableMapper(data[`${resourcesList.Transaction}_0`]),
              data: transactionListMapper(
                tableMapper(data[`${resourcesList.Transaction}_0`]).data
              )
            })}
          />
        ) : null}
      </Card>
    );
  }

  ClientDisputeList(): JSX.Element {
    const { selectedWallet, numberOfLatestDisputes = 3 } = this.props;
    return (
      <Card
        header={{
          title: 'dispute.list.title',
          icon: 'fa fa-exclamation-circle'
        }}
      >
        {selectedWallet ? (
          <>
            {`${numberOfLatestDisputes}` +
              ` ${i18next.t('number.of.latest.disputes.text')}`}
          </>
        ) : null}
      </Card>
    );
  }

  render(): JSX.Element {
    const {
      props,
      ClientWalletList,
      ClientWalletDetails,
      ClientDisputeList,
      ClientRecentTransactionList
    } = this;
    const { sid, isLoading } = props;
    return (
      <>
        <SynthesizedSpinner isLoading={isLoading} hasOverlay psid={sid} />
        <Row>
          <Col xs={12} md={4}>
            <ClientWalletList />
          </Col>
          <Col xs={12} md={8}>
            <Row>
              <Col xs={12} md={8}>
                <ClientWalletDetails />
              </Col>
              <Col xs={12} md={4}>
                <ClientDisputeList />
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <ClientRecentTransactionList />
          </Col>
        </Row>
      </>
    );
  }
}

// @ts-ignore
ClientDetailsWalletTab.defaultProps = {
  sid: 'ClientDetailsWalletTab',
  permissions: {
    canCreateNew: true
  }
};
export { ClientDetailsWalletTab };
export default ClientDetailsWalletTab;
