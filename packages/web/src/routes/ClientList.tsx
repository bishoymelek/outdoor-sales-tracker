import React from 'react';
import { Col, Row } from 'reactstrap';
import { Card, SynthesizedTable } from 'components';
import { tableMapper, clientListMapper } from 'configuration/dataMappers';
import { deleteItemActionList } from 'store-config/deleteItemVmUtil';
import history from 'utils/history';
import { actionsList } from 'store-config/dataproviders';
import resourcesList from 'store-config/resourcesList.json';

class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    props.fireDataAction(
      actionsList.Client.search,
      { activePage: 1 },
      resourcesList.Client,
      props.sid
    );
  }

  render(): JSX.Element {
    const { props } = this;
    const { sid, fireAction } = props;
    return (
      <Card header={{ title: 'client.list.title' }}>
        <Row>
          <Col xs={12}>
            <SynthesizedTable
              psid={sid}
              schema={{
                keyField: '_id',
                columns: [
                  {
                    dataField: 'fullName',
                    text: 'client.name.title'
                  },
                  {
                    dataField: 'mobileNumber',
                    text: 'client.mobile.number'
                  },
                  {
                    dataField: 'registeredOn',

                    text: 'date.registered.title'
                  },
                  { dataField: 'clientStatus', text: 'status.title' }
                ]
              }}
              rowEvents={{
                onClick: (e: any, row: any, rowIndex: any) => {
                  props.changeValue('nav', 'selectedClient', row);
                  history.push(`/client/${row.id}`, { client: row });
                }
              }}
              customFieldProps={{
                update: {
                  onClickHandler: (cell: any): void => {
                    history.push('/branch/update', {
                      item: cell,
                      isUpdating: true
                    });
                  },
                  variant: 'warning'
                },
                delete: {
                  onClickHandler: (cell: any): void => {
                    fireAction(deleteItemActionList.openDeletingModal, cell);
                  }
                }
              }}
              storeName={resourcesList.Client}
              dataRef={[{ storeName: resourcesList.Client }]}
              dataMapper={(data: any = []): any => {
                return {
                  ...tableMapper(data[`${resourcesList.Client}_0`]),
                  data: clientListMapper(
                    tableMapper(data[`${resourcesList.Client}_0`]).data
                  )
                };
              }}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

// @ts-ignore
Component.defaultProps = {
  sid: 'clientListRoute',
  permissions: {
    depend: ['Table']
  }
};

export default Component;
