import React from 'react';
import { Col, Row } from 'reactstrap';
import { Card, SynthesizedTable } from 'components';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';
import history from 'utils/history';
import { transactionListMapper, tableMapper } from 'configuration/dataMappers';
import { transactionTableSchema } from 'configuration/tableSchemas';

class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    props.fireDataAction(
      actionsList.Transaction.searchTransactions,
      { activePage: 1 },
      resourcesList.Transaction,
      props.sid
    );
    this.state = {};
  }

  render(): JSX.Element {
    const { sid } = this.props;
    return (
      <Card header={{ title: 'transaction.list.title' }}>
        <Row>
          <Col xs={12}>
            <SynthesizedTable
              rowEvents={{
                onClick: (e: any, row: any) => {
                  history.push(`/transaction/${row.id}`, { transaction: row });
                }
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
          </Col>
        </Row>
      </Card>
    );
  }
}

// @ts-ignore
Component.defaultProps = {
  sid: 'TransactionList',
  permissions: {
    depend: ['Table']
  }
};

export default Component;
