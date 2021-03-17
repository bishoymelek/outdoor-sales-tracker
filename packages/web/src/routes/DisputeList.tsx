import React from 'react';
import { Col, Row } from 'reactstrap';
import { Card, SynthesizedTable } from 'components';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';
import { transactionTableSchema } from 'configuration/tableSchemas';
import {
  tableMapper,
  transactionListMapper
} from '../configuration/dataMappers';

class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    props.fireDataAction(
      actionsList.Transaction.searchTransactions,
      { activePage: 1, searchString: { transactionType: 'refund' } },
      resourcesList.Transaction,
      props.sid
    );
  }

  render(): JSX.Element {
    const { props } = this;
    const { sid } = props;
    return (
      <Card header={{ title: 'dispute.list.title' }}>
        <Row>
          <Col xs={12}>
            <SynthesizedTable
              psid={sid}
              actionCriteria={{ searchString: { transactionType: 'refund' } }}
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
  sid: 'disputeListRoute',
  permissions: {
    depend: ['Table']
  }
};

export default Component;
