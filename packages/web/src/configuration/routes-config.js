import resourcesList from 'store-config/resourcesList.json';

/**
 * Routes Array available with some props
 * Every Object should has:
 * @param {string} path path of route
 * @param {Boolean} exact whether it should be exact route or not
 * @param {string} name Name to be shown
 * @param {string} key To be used while mapping the route with its component
 */
const routesConfig = [
  {
    path: '/',
    name: 'dashboard.title',
    key: 'Dashboard'
  },
  {
    path: '/client',
    name: 'client.list.title',
    key: 'ClientList',
    resources: [
      {
        storeName: resourcesList.Client
      }
    ]
  },
  {
    path: '/client/:clientId',
    name: 'client.details.title',
    key: 'ClientDetails',
    resources: [
      {
        storeName: resourcesList.Client
      }
    ],
    dataRef: [
      {
        storeName: 'nav',
        type: 'svm'
      }
    ],
    dataMapper: data => {
      return {
        selectedClient: data[`${resourcesList.Nav}_0`]?.selectedClient
      };
    }
  },
  {
    path: '/transaction',
    name: 'transaction.list.title',
    key: 'TransactionList',
    resources: [
      {
        storeName: resourcesList.Transaction
      }
    ]
  },
  {
    path: '/transaction/:transactionId',
    name: 'transaction.details.title',
    key: 'TransactionDetails',
    resources: [
      {
        storeName: resourcesList.Transaction
      },
      // refunds list
      { storeName: resourcesList.Transaction, index: 1 },
      { storeName: resourcesList.Ticket }
    ]
  },
  {
    path: '/dispute',
    name: 'dispute.list.title',
    key: 'DisputeList',
    resources: [
      {
        storeName: resourcesList.Transaction
      }
    ]
  },
  {
    path: '/ticket',
    name: 'ticket.list.title',
    key: 'TicketList',
    resources: [
      {
        storeName: resourcesList.Ticket
      }
    ]
  },
  {
    path: '/wallet',
    name: 'wallet.list.title',
    key: 'WalletList',
    resources: [
      {
        storeName: resourcesList.Wallet
      }
    ]
  }
];

export default routesConfig;
