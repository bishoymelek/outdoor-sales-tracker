/* eslint-disable no-param-reassign */
import { customActions } from 'store-config/dataproviders/client';

const type = 'dm';

const handlers = {
  [customActions.search]: (state: any, action: any): any => {
    return action.payload;
  },
  [customActions.sendOtpCode]: (state: any, action: any): any => {
    return action.payload;
  },
  [customActions.verifyOtp]: (state: any, action: any): any => {
    return action.payload;
  },
  [customActions.getClientByMobileNumber]: (state: any, action: any): any => {
    return action.payload;
  }
};
export { type, handlers };
export default { type, handlers };
