import React from 'react';
import { Col, Row } from 'reactstrap';
import { Card, SynthesizedSpinner, SynthesizedTable } from 'components';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';
import { tableMapper, transactionListMapper } from 'configuration/dataMappers';
import { transactionTableSchema } from 'configuration/tableSchemas';

class ClientDetailsInfoTab extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    props.fireDataAction(
      actionsList.Transaction.searchTransactions,
      { activePage: 1, searchString: { client: props.clientDetails.id } },
      resourcesList.Transaction,
      props.sid
    );
  }

  render(): JSX.Element {
    const { sid, isLoading, clientDetails } = this.props;
    return (
      <>
        <SynthesizedSpinner isLoading={isLoading} hasOverlay psid={sid} />
        <Row>
          <Col xs={12}>
            <Card
              header={{
                title: 'recent.transaction.list.title',
                icon: 'fas fa-dollar-sign'
              }}
            >
              <SynthesizedTable
                actionCriteria={{
                  searchString: { client: clientDetails.id }
                }}
                psid={sid}
                schema={transactionTableSchema}
                storeName={resourcesList.Transaction}
                dataRef={[{ storeName: resourcesList.Transaction }]}
                dataMapper={(data: any = []): any => ({
                  data: transactionListMapper(
                    tableMapper(data[`${resourcesList.Transaction}_0`]).data
                  )
                })}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

// @ts-ignore
ClientDetailsInfoTab.defaultProps = {
  sid: 'clientDetailsTransactionTab',
  permissions: {}
};
export { ClientDetailsInfoTab };
export default ClientDetailsInfoTab;
