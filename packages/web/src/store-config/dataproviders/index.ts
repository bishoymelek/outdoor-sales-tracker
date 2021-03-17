import * as App from './app';
import * as Account from './Account';
import * as Ticket from './ticket';
import * as Transaction from './transaction';
import * as Notification from './notification';
import * as AgentAction from './agentAction';
import * as Client from './client';

/**
 * list of available resources in the portal
 */
const resourcesList = {
  App: 'App',
  Account: 'Account',
  UserGroup: 'UserGroup',
  Branch: 'Branch',
  User: 'User',
  City: 'City',
  Client: 'Client',
  Ticket: 'Ticket',
  Transaction: 'Transaction',
  AgentAction: 'AgentAction',
  Wallet: 'Wallet',
  Notification: 'Notification',
  Nav: 'nav',
  Category: 'Category'
};

/**
 * list of available DM actions to be dispatched
 */
export const actionsList = {
  AgentAction: AgentAction.customActions,
  Client: Client.customActions,
  Ticket: Ticket.customActions,
  Transaction: Transaction.customActions,
  Notification: Notification.customActions
};

export {
  resourcesList,
  App,
  Notification,
  Ticket,
  Client,
  Transaction,
  Account
};
