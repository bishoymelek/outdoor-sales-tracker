
import React from 'react';
import { Badge } from 'reactstrap';
import i18next from 'i18next';
import { localizeLookup } from 'utils/data-mappers/lookups';
import { dateFormatter } from 'utils/data-mappers';

/* eslint-disable no-param-reassign */

export const consumerTableSchema = {
  keyField: '_id',
  columns: [
    {
      dataField: 'fullName',
      text: 'fullName.title'
    },
    {
      dataField: 'email',
      text: 'email.title'
    },
    {
      dataField: 'role.code',
      text: 'job.title',
      sort: true
    },
    {
      dataField: 'update',
      text: 'update.title',
      fieldType: 'button'
    },
    {
      dataField: 'delete',
      text: 'delete.title',
      fieldType: 'button'
    }
  ]
};

export const transactionTableSchema = {
  keyField: 'id',
  columns: [
    {
      dataField: 'transactionDate',
      text: 'transaction.date.title'
    },
    {
      dataField: 'transactionType',
      text: 'transaction.type.title'
    },
    {
      dataField: 'amount',
      text: 'amount.title'
    },
    {
      dataField: 'beneficiaryWallet.name',
      text: 'beneficiary.wallet.name'
    },
    {
      dataField: 'transactionStatus',
      fieldType: 'customField',
      text: 'status.title',
      CustomComponent: ({ value }) => {
        if (value === 'success') {
          return <Badge color="primary">{value}</Badge>;
        }
        if (value === 'failed') {
          return <Badge color="danger">{value}</Badge>;
        }
      }
    },
    {
      dataField: 'notes',
      text: 'notes.name'
    }
  ]
};

export const walletTableSchema = {
  keyField: 'id',
  columns: [
    {
      dataField: 'notes',
      text: 'notes.name'
    }
  ]
};

export const ticketTableSchema = {
  keyField: 'id',
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
      CustomComponent: ({ value }) => {
        if (value === 'high') {
          return <Badge color="danger">{value}</Badge>;
        }
        if (value === 'medium') {
          return <Badge color="warning">{value}</Badge>;
        }
        if (value === 'low') {
          return <Badge color="secondary">{value}</Badge>;
        }
        return <></>;
      }
    },
    {
      dataField: 'client.id',
      text: 'client.id.title'
    },
    {
      dataField: 'transaction.id',
      text: 'transaction.id.title'
    },
    {
      dataField: 'ticketStatus',
      text: 'status.title',
      fieldType: 'customField',
      CustomComponent: ({ value }) => {
        if (value === 'open') {
          return <Badge color="warning">{value}</Badge>;
        }
        if (value === 'delayed') {
          return <Badge color="danger">{value}</Badge>;
        }
        if (value === 'closed') {
          return <Badge color="primary">{value}</Badge>;
        }
        return <></>;
      }
    }
  ]
};
