import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import { transactionTableSchema } from 'configuration/tableSchemas';
import i18next from 'i18next';
import { SynthesizedSpinner, SynthesizedTable, Card } from 'components';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';
import { tableMapper, transactionListMapper } from 'configuration/dataMappers';
import { mapLoadingProp } from 'utils/data-mappers';

class ClientDetailsInfoTab extends React.Component<any, any> {
  mapClientInfo: () =>
    | {
        'fullname.title': any;
        'email.title': any;
        'id.title': any;
        'governorate.title': any;
        'district.title': any;
        'address.title': any;
      }
    | {
        'fullname.title'?: undefined;
        'email.title'?: undefined;
        'id.title'?: undefined;
        'governorate.title'?: undefined;
        'district.title'?: undefined;
        'address.title'?: undefined;
      };

  constructor(props: any) {
    super(props);
    props.fireDataAction(
      actionsList.Transaction.searchTransactions,
      { activePage: 1, searchString: { client: props.clientDetails.id } },
      resourcesList.Transaction,
      props.sid
    );
    this.state = {};
    this.mapClientInfo = () => {
      const { clientDetails } = this.props;
      try {
        const {
          fullName,
          email,
          id,
          governorate,
          district,
          address
        } = clientDetails;
        return {
          'fullname.title': fullName,
          'email.title': email,
          'id.title': id,
          'governorate.title': governorate.name,
          'district.title': district.name,
          'address.title': address
        };
      } catch (error) {
        console.error('error/client-details-tab/map-client-info', error);
        return {};
      }
    };
    this.ClientInfo = this.ClientInfo.bind(this);
    this.ClientWalletList = this.ClientWalletList.bind(this);
    this.ClientDisputeList = this.ClientDisputeList.bind(this);
    this.ClientRecentTransactionList = this.ClientRecentTransactionList.bind(
      this
    );
  }

  ClientWalletList(): JSX.Element {
    const { clientDetails } = this.props;
    const { wallet = [] } = clientDetails;
    return (
      <Card
        header={{ title: 'wallet.list.title', icon: 'far fa-money-bill-alt' }}
      >
        <Table>
          <tbody>
            {wallet.length
              ? wallet.map((oneWallet: any) => (
                  <>
                    <tr key={oneWallet.id}>
                      <th scope="row">{oneWallet.mobileNumber}</th>
                      <td>{oneWallet.balance}</td>
                    </tr>
                  </>
                ))
              : null}
          </tbody>
        </Table>
      </Card>
    );
  }

  ClientRecentTransactionList(): JSX.Element {
    const { sid } = this.props;
    return (
      <Card
        header={{
          title: 'recent.transaction.list.title',
          icon: 'fas fa-dollar-sign'
        }}
      >
        <SynthesizedTable
          psid={sid}
          schema={transactionTableSchema}
          storeName={resourcesList.Transaction}
          dataRef={[{ storeName: resourcesList.Transaction }]}
          dataMapper={(data: any = []): any => {
            return {
              ...tableMapper(data[`${resourcesList.Transaction}_0`]),
              data: transactionListMapper(
                tableMapper(data[`${resourcesList.Transaction}_0`]).data
              )
            };
          }}
        />
      </Card>
    );
  }

  ClientInfo(): JSX.Element {
    const mappedClientDetails: any = this.mapClientInfo();
    return (
      <Card
        header={{
          title: 'client.details.title',
          icon: 'far fa-address-card'
        }}
      >
        <Table>
          <tbody>
            {Object.entries(mappedClientDetails).map(([key, value]: any, i) => {
              return (
                <tr key={key}>
                  <th scope="row">
                    <b>{i18next.t(key)}</b>
                  </th>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    );
  }

  ClientDisputeList(): JSX.Element {
    const { numberOfLatestDisputes = 3 } = this.props;
    return (
      <Card
        header={{
          title: 'dispute.list.title',
          icon: 'fa fa-exclamation-circle'
        }}
      >
        <b> {numberOfLatestDisputes} </b>
        {i18next.t('number.of.latest.disputes.text')}
      </Card>
    );
  }

  render(): JSX.Element {
    const {
      props,
      ClientInfo,
      ClientWalletList,
      ClientDisputeList,
      ClientRecentTransactionList
    } = this;
    const { sid, resources } = props;
    return (
      <>
        <SynthesizedSpinner
          dataRef={resources}
          dataMapper={(data: any): synthesizedSpinnerTypes => ({
            isLoading: mapLoadingProp(data)
          })}
          hasOverlay
          psid={sid}
        />
        <Row>
          <Col xs={12} md={6}>
            <ClientInfo />
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <ClientWalletList />
              </Col>
              <Col xs={12}>
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
ClientDetailsInfoTab.defaultProps = {
  sid: 'clientDetailsInfoTab',
  permissions: {
    canCreateNew: true
  }
};
export { ClientDetailsInfoTab };
export default ClientDetailsInfoTab;
