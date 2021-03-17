import React from 'react';
import { Col, Row } from 'reactstrap';
import { SynthesizedSpinner, Card, SynthesizedTable } from 'components';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';
import { tableMapper, ticketListMapper } from 'configuration/dataMappers';
import { ticketTableSchema } from 'configuration/tableSchemas';

class ClientDetailsTicketsTab extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    props.fireDataAction(
      actionsList.Ticket.searchTicket,
      { activePage: 1, searchString: { client: props.clientDetails.id } },
      resourcesList.Ticket,
      props.sid
    );
    this.state = {};
  }

  render(): JSX.Element {
    const { sid, isLoading, clientDetails } = this.props;
    return (
      <>
        <SynthesizedSpinner isLoading={isLoading} hasOverlay psid={sid} />
        <Row>
          <Col xs={12}>
            <Card
              header={{ title: 'ticket.list.title', icon: 'fas fa-life-ring' }}
            >
              <SynthesizedTable
                psid={sid}
                actionCriteria={{
                  searchString: { client: clientDetails.id }
                }}
                schema={ticketTableSchema}
                storeName={resourcesList.Ticket}
                dataRef={[{ storeName: resourcesList.Ticket }]}
                dataMapper={(data: any = []): any => ({
                  ...tableMapper(data[`${resourcesList.Ticket}_0`]),
                  data: ticketListMapper(
                    tableMapper(data[`${resourcesList.Ticket}_0`]).data
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
ClientDetailsTicketsTab.defaultProps = {
  sid: 'clientDetailsTicketsTab',
  permissions: {}
};
export { ClientDetailsTicketsTab };
export default ClientDetailsTicketsTab;
