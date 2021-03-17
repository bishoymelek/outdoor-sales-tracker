import { synthetizeComponent as synthesizeComponent } from 'react-state';
import Dashboard from './dashboard';
import { Page404, Page500, Register } from './Pages';
// import { Profile, FirstTimeLogin } from '../module-user/routes';
import LoginRoute from './Login';
import ClientList from './ClientList';
import ClientDetails from './ClientDetails';
import DisputeList from './DisputeList';
import DisputeDetails from './DisputeDetails';
import TransactionList from './TransactionList';
import TransactionDetails from './TransactionDetails';
import TicketList from './TicketList';
import WalletList from './WalletList';

const Login = synthesizeComponent(LoginRoute);

export {
  ClientList,
  ClientDetails,
  DisputeList,
  DisputeDetails,
  TransactionList,
  TransactionDetails,
  TicketList,
  WalletList,
  // FirstTimeLogin,
  // Profile,
  Page404,
  Page500,
  Register,
  Login,
  Dashboard
};
