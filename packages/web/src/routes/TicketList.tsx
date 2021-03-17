import React from 'react';
import { Col, Row } from 'reactstrap';
import { Card, SynthesizedTable } from 'components';
import { ticketTableSchema } from 'configuration/tableSchemas';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';
import { tableMapper, ticketListMapper } from '../configuration/dataMappers';

class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    props.fireDataAction(
      actionsList.Ticket.searchTicket,
      { activePage: 1 },
      resourcesList.Ticket,
      props.sid
    );
    this.state = {};
  }

  render(): JSX.Element {
    const { sid } = this.props;
    return (
      <Card header={{ title: 'ticket.list.title' }}>
        <Row>
          <Col xs={12}>
            <SynthesizedTable
              psid={sid}
              schema={ticketTableSchema}
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
          </Col>
        </Row>
      </Card>
    );
  }
}

// @ts-ignore
Component.defaultProps = {
  sid: 'TicketListRoute',
  permissions: {
    depend: ['Table']
  }
};

export default Component;
