/* eslint-disable no-param-reassign */
import { customActions } from 'store-config/dataproviders/transaction';

const type = 'dm';

const handlers = {
  [customActions.searchTransactions]: (state: any, action: any): any => {
    return action.payload;
  },
  [customActions.getTransactionById]: (state: any, action: any): any => {
    return action.payload;
  },
  [customActions.submitTransaction]: (state: any, action: any): any => {
    return action.payload;
  }
};
export { type, handlers };
export default { type, handlers };
