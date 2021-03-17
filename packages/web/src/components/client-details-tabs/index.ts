import synthesizeComponent from 'react-state/lib/factory';
import ClientDetailsInfoTabComponent from './ClientDetailsInfoTab';
import ClientDetailsWalletsTabComponent from './ClientDetailsWalletsTab';
import ClientDetailsTransactionTabComponent from './ClientDetailsTransactionsTab';
import ClientDetailsTicketsTabComponent from './ClientDetailsTicketsTab';

const ClientDetailsTicketsTab = synthesizeComponent(
  ClientDetailsTicketsTabComponent
);
const ClientDetailsWalletsTab = synthesizeComponent(
  ClientDetailsWalletsTabComponent
);
const ClientDetailsInfoTab = synthesizeComponent(ClientDetailsInfoTabComponent);
const ClientDetailsTransactionsTab = synthesizeComponent(
  ClientDetailsTransactionTabComponent
);
export {
  ClientDetailsWalletsTab,
  ClientDetailsInfoTab,
  ClientDetailsTransactionsTab,
  ClientDetailsTicketsTab
};
