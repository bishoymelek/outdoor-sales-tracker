import React from 'react';
import { Col, Row, Table, Badge } from 'reactstrap';
import { SynthesizedTable, Card, SynthesizedSpinner } from 'components';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';
import {
  tableMapper,
  transactionListMapper,
  ticketListMapper
} from 'configuration/dataMappers';

class TransactionDetails extends React.Component<any, {}> {
  mapTransactionDetails: () => {
    id: any;
    amount: any;
    fees: any;
    date: any;
    status: any;
    type: any;
  };

  mapDebitedWalletDetails: () => {
    id: any;
    walletName: any;
    clientMobileNumber: any;
  };

  mapCreditedWalletDetails: () => { id: any; walletName: any };

  constructor(props: any) {
    super(props);
    this.state = {};
    this.TransactionDetailList = this.TransactionDetailList.bind(this);
    this.TransactionRefundList = this.TransactionRefundList.bind(this);
    this.TransactionTicketList = this.TransactionTicketList.bind(this);
    this.DebitedWalletDetails = this.DebitedWalletDetails.bind(this);
    this.CreditedWalletDetails = this.CreditedWalletDetails.bind(this);
    this.mapTransactionDetails = () => {
      const {
        transactionType,
        amount,
        fees,
        id,
        transactionDate,
        transactionStatus
      } = this.props.location.state.transaction;
      return {
        id,
        amount,
        fees,
        date: transactionDate,
        status: transactionStatus,
        type: transactionType
      };
    };
    this.mapDebitedWalletDetails = () => {
      const {
        wallet: { id, name, mobileNumber }
      } = this.props.location.state.transaction;
      return { id, walletName: name, clientMobileNumber: mobileNumber };
    };
    this.mapCreditedWalletDetails = () => {
      const {
        beneficiaryWallet: { id, name }
      } = this.props.location.state.transaction;
      return { id, walletName: name };
    };
    props.fireDataAction(
      actionsList.Ticket.searchTicket,
      {
        activePage: 1,
        searchString: { transactionId: props.location.state.transaction.id }
      },
      resourcesList.Ticket,
      props.sid
    );
    // Refunds
    props.fireDataAction(
      actionsList.Transaction.searchTransactions,
      {
        activePage: 1,
        searchString: {
          referenceTransactionId: props.location.state.transaction.id,
          transactionType: 'refund'
        }
      },
      resourcesList.Transaction,
      props.sid,
      1
    );
  }

  TransactionDetailList = (): JSX.Element => {
    const { mapTransactionDetails } = this;
    const detailsList = mapTransactionDetails();

    return (
      <Card
        header={{
          title: 'transaction.details.title',
          icon: 'fas fa-dollar-sign'
        }}
      >
        {detailsList ? (
          <>
            <Table>
              <tbody>
                {Object.entries(detailsList).map(([key, value]: any, i) => (
                  <>
                    <tr key={i}>
                      <th scope="row">{key}:</th>
                      <td>{value}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </>
        ) : null}
      </Card>
    );
  };

  TransactionTicketList(): JSX.Element {
    const { sid, location } = this.props;
    return (
      <Card
        header={{
          title: 'transaction.ticket.list.title',
          icon: 'fas fa-dollar-sign'
        }}
      >
        <SynthesizedTable
          psid={sid}
          actionCriteria={{
            searchString: { transactionId: location.state.transaction.id }
          }}
          schema={{
            keyField: '_id',
            columns: [
              {
                dataField: 'ticketDate',
                text: 'ticket.date.title'
              },
              {
                dataField: 'ticketType',
                text: 'ticket.type.title'
              },
              {
                dataField: 'ticketSeverity',
                text: 'ticket.severity.title',
                fieldType: 'customField',
                CustomComponent: ({ value }: any): JSX.Element => {
                  if (value === 'high') {
                    return <Badge color="danger">{value}</Badge>;
                  }
                  if (value === 'medium') {
                    return <Badge color="warning">{value}</Badge>;
                  }
                  if (value === 'low') {
                    return <Badge color="secondary">{value}</Badge>;
                  }
                  return <>{value}</>;
                }
              },
              {
                dataField: 'ticketStatus',
                text: 'status.title',
                fieldType: 'customField',
                CustomComponent: ({ value }: any): JSX.Element => {
                  if (value === 'open') {
                    return <Badge color="warning">{value}</Badge>;
                  }
                  if (value === 'delayed') {
                    return <Badge color="danger">{value}</Badge>;
                  }
                  if (value === 'closed') {
                    return <Badge color="primary">{value}</Badge>;
                  }
                  return <>{value}</>;
                }
              }
            ]
          }}
          storeName={resourcesList.Ticket}
          dataRef={[{ storeName: resourcesList.Ticket }]}
          dataMapper={(data: any = []): any => ({
            ...tableMapper(data[`${resourcesList.Ticket}_0`]),
            data: ticketListMapper(
              tableMapper(
                data[`${resourcesList.Ticket}_0`] &&
                  data[`${resourcesList.Ticket}_0`]
              ).data
            )
          })}
        />
      </Card>
    );
  }

  TransactionRefundList(): JSX.Element {
    const {
      sid,
      location: {
        state: { transaction }
      }
    } = this.props;
    return (
      <Card
        header={{
          title: 'transaction.refund.list.title',
          icon: 'far fa-money-bill-alt'
        }}
      >
        <SynthesizedTable
          actionCriteria={{
            searchString: { transactionId: transaction.id }
          }}
          psid={sid}
          schema={{
            keyField: 'id',
            columns: [
              {
                dataField: 'id',
                text: 'transaction.id.title'
              },
              {
                dataField: 'transactionDate',
                text: 'transaction.date.title'
              },
              {
                dataField: 'transactionType',
                text: 'transaction.type.title'
              },
              {
                dataField: 'transactionStatus',
                fieldType: 'customField',
                text: 'status.title',
                CustomComponent: ({ value }: any): JSX.Element => {
                  if (value === 'success') {
                    return <Badge color="primary">{value}</Badge>;
                  }
                  if (value === 'failed') {
                    return <Badge color="danger">{value}</Badge>;
                  }
                  return <>{value}</>;
                }
              },
              {
                dataField: 'notes',
                text: 'notes.name'
              }
            ]
          }}
          storeName={resourcesList.Transaction}
          dataRef={[{ storeName: resourcesList.Transaction, index: 1 }]}
          dataMapper={(data: any = []): any => ({
            ...tableMapper(data[`${resourcesList.Transaction}_1`]),
            data: transactionListMapper(
              tableMapper(
                data[`${resourcesList.Transaction}_1`] &&
                  data[`${resourcesList.Transaction}_1`]
              ).data
            )
          })}
        />
      </Card>
    );
  }

  DebitedWalletDetails(): JSX.Element {
    const { mapDebitedWalletDetails } = this;
    const debitedWalletDetailList = mapDebitedWalletDetails();
    return (
      <Card
        header={{
          title: 'debited.wallet.title',
          icon: 'fas fa-arrow-up'
        }}
      >
        {debitedWalletDetailList ? (
          <>
            <Table>
              <tbody>
                {Object.entries(debitedWalletDetailList).map(
                  ([key, value]: any, i) => (
                    <>
                      <tr key={i}>
                        <th scope="row">{key}</th>
                        <td>{value}</td>
                      </tr>
                    </>
                  )
                )}
              </tbody>
            </Table>
          </>
        ) : null}
      </Card>
    );
  }

  CreditedWalletDetails(): JSX.Element {
    const { mapCreditedWalletDetails } = this;
    const creditedWalletDetailList = mapCreditedWalletDetails();
    return (
      <Card
        header={{
          title: 'credited.wallet.title',
          icon: 'fas fa-arrow-down'
        }}
      >
        {creditedWalletDetailList ? (
          <>
            <Table>
              <tbody>
                {Object.entries(creditedWalletDetailList).map(
                  ([key, value]: any, i) => (
                    <>
                      <tr key={i}>
                        <th scope="row">{key}</th>
                        <td>{value}</td>
                      </tr>
                    </>
                  )
                )}
              </tbody>
            </Table>
          </>
        ) : null}
      </Card>
    );
  }

  render(): JSX.Element {
    const {
      props,
      TransactionRefundList,
      TransactionTicketList,
      TransactionDetailList,
      DebitedWalletDetails,
      CreditedWalletDetails
    } = this;
    const { sid, isLoading } = props;

    return (
      <>
        <SynthesizedSpinner isLoading={isLoading} hasOverlay psid={sid} />
        <Row>
          <Col xs={12} md={6}>
            <TransactionDetailList />
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <DebitedWalletDetails />
              </Col>
              <Col xs={12}>
                <CreditedWalletDetails />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <TransactionRefundList />
          </Col>
          <Col xs={12} md={6}>
            <TransactionTicketList />
          </Col>
        </Row>
      </>
    );
  }
}

// @ts-ignore
TransactionDetails.defaultProps = {
  sid: 'TransactionDetailsRoute',
  permissions: {}
};
export { TransactionDetails };
export default TransactionDetails;
