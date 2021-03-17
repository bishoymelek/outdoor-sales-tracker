import React from 'react';
import { Col, Row } from 'reactstrap';
import { Card, SynthesizedTable } from 'components';
import { walletTableSchema } from 'configuration/tableSchemas';
import resourcesList from 'store-config/resourcesList.json';

class WalletList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    // props.fireDataAction(
    //   actionsList.wallet.getMultiple,
    //   { activePage: 1 },
    //   resourcesList.Ticket,
    //   props.sid
    // );
    console.log(props);
  }

  render(): JSX.Element {
    const { sid } = this.props;
    return (
      <Card header={{ title: 'wallet.list.title' }}>
        <Row>
          <Col xs={12}>
            <SynthesizedTable
              psid={sid}
              schema={walletTableSchema}
              storeName={resourcesList.Ticket}
              dataRef={[{ storeName: resourcesList.Ticket }]}
              dataMapper={(data: any = []): any => ({})}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

// @ts-ignore
WalletList.defaultProps = {
  sid: 'TicketListRoute',
  permissions: {
    depend: ['Table']
  }
};

export default WalletList;
