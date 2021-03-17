import React from 'react';
import { Col, Row } from 'reactstrap';
import i18next from 'i18next';
import { SynthesizedSpinner, Tabs } from 'components';
import resourcesList from 'store-config/resourcesList.json';
import history from 'utils/history';
import {
  ClientDetailsInfoTab,
  ClientDetailsTransactionsTab,
  ClientDetailsTicketsTab,
  ClientDetailsWalletsTab
} from 'components/client-details-tabs';

function ClientDetails(props: any): JSX.Element | null {
  const { sid, isLoading, selectedClient } = props;
  if (!selectedClient) {
    history.push('/500');
    return null;
  }
  const { fullName, id, email, mobileNumber } = selectedClient;
  return (
    <>
      <SynthesizedSpinner isLoading={isLoading} hasOverlay psid={sid} />
      <Row className="bg-secondary p-3">
        <Col xs={12} className="pb-3">
          <b className="pb-2 text-capitalize">{`${i18next.t(
            'client.name.title'
          )}`}</b>
          :{` ${fullName}`}
          <br />
          <b className="pb-2 text-capitalize">
            {`${i18next.t('client.id.title')}`}
          </b>
          :{` ${id}`}
          <br />
          <b className="pb-2 text-capitalize">{`${i18next.t(
            'client.email.title'
          )}`}</b>
          :{` ${email}`}
          <br />
          <b className="pb-2 text-capitalize">{`${i18next.t(
            'client.mobile.number.title'
          )}`}</b>
          :{` ${mobileNumber}`}
        </Col>
        <Col xs="12">
          <Tabs
            tabsConfig={[
              {
                icon: 'fas fa-info',
                label: 'information.title',
                content: (): JSX.Element => (
                  <>
                    <ClientDetailsInfoTab
                      psid={sid}
                      resources={[
                        {
                          storeName: resourcesList.Transaction
                        }
                      ]}
                      clientDetails={selectedClient}
                    />
                  </>
                )
              },
              {
                icon: 'fas fa-dollar-sign',
                label: 'transactions.title',
                content: (): JSX.Element => (
                  <>
                    <ClientDetailsTransactionsTab
                      psid={sid}
                      clientDetails={selectedClient}
                      resources={[
                        {
                          storeName: resourcesList.Transaction
                        }
                      ]}
                    />
                  </>
                )
              },
              {
                icon: 'far fa-money-bill-alt',
                label: 'wallet.list.title',
                content: (): JSX.Element => (
                  <ClientDetailsWalletsTab
                    resources={[
                      {
                        storeName: resourcesList.Transaction
                      }
                    ]}
                    clientDetails={selectedClient}
                    psid={sid}
                  />
                )
              },
              {
                icon: 'fas fa-life-ring',
                label: 'tickets.title',
                content: (): JSX.Element => (
                  <ClientDetailsTicketsTab
                    psid={sid}
                    clientDetails={selectedClient}
                    resources={[
                      {
                        storeName: resourcesList.Ticket
                      }
                    ]}
                  />
                )
              }
            ]}
          />
        </Col>
      </Row>
    </>
  );
}

// @ts-ignore
ClientDetails.defaultProps = {
  sid: 'ClientDetailsRoute',
  permissions: {
    canCreateNew: true
  }
};

export default ClientDetails;
