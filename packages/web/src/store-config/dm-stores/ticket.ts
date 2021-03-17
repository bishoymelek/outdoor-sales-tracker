/* eslint-disable no-param-reassign */
import { customActions } from 'store-config/dataproviders/ticket';

const type = 'dm';

const handlers = {
  [customActions.searchTicket]: (state: any, action: any): any => {
    return action.payload;
  }
};
export { type, handlers };
export default { type, handlers };
