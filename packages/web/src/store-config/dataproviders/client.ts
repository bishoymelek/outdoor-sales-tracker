import { ClientApi } from 'agent-client-sdk';
import { getMultipleResponse, ApiResponseMapper } from '..';
import { dummyResp } from './dummyResponses';

export const customActions = {
  sendOtpCode: 'send_otp_code',
  verifyOtp: 'verify_otp_code',
  getClientByMobileNumber: 'get_one_by_mobile_number',
  getClientById: 'get_one_by_id',
  getClientWalletList: 'get_client_wallet_list',
  search: 'search'
};

const clientApi = new ClientApi({ basePath: process.env.REACT_APP_BASE_API });

const handlers = {
  [customActions.search]: async (action: any = { payload: {} }) => {
    try {
      const {
        searchString = {},
        ordered = '',
        activePage = 1
      } = action.payload;
      // TODO: adjust params from backend
      const res: any = await clientApi.searchClients(
        searchString,
        ordered,
        undefined,
        activePage
      );
      // return getMultipleResponse(res);
      return getMultipleResponse({
        payload: {
          data: dummyResp.client.search.payload.results,
          ResultReport: dummyResp.client.search.payload.resultreport
        }
      });
    } catch (error) {
      console.error('error/client/send-otp: ', error);
      return error;
    }
  },
  [customActions.sendOtpCode]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { clientMobileNumber }
      } = action;
      if (!clientMobileNumber) {
        throw Error('You must provide Client mobile number');
      } else {
        // const res = await clientApi.sendOTP(clientMobileNumber);
        // TODO: remove this and make it working with backend
        return ApiResponseMapper({
          code: 200,
          msg: 'done successfully',
          payload: { clientMobileNumber }
        });
      }
    } catch (error) {
      console.error('error/client/send-otp: ', error);
      return error;
    }
  },
  [customActions.verifyOtp]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { clientMobileNumber, otpCode }
      } = action;
      if (!clientMobileNumber) {
        throw Error('You must provide ClientMobileNumber param');
      } else if (!otpCode) {
        throw Error('You must provide otpCode param');
      } else {
        // const res: any = await clientApi.verifyOTP(
        //   clientMobileNumber,
        //   otpCode,
        //
        // );
        // TODO: make it functional
        return ApiResponseMapper({ code: 200, msg: 'verified successfully' });
      }
    } catch (error) {
      console.error('error/client/verify-otp: ', error);
      return error;
    }
  },
  [customActions.getClientByMobileNumber]: async (
    action: any = { payload: {} }
  ) => {
    try {
      const {
        payload: { clientMobileNumber }
      } = action;
      if (!clientMobileNumber) {
        throw Error('You must provide clientMobileNumber param');
      } else {
        const res: any = await clientApi.getByMobile(clientMobileNumber);
        return ApiResponseMapper(res);
      }
    } catch (error) {
      console.error('error/client/get-client-by-mob-num: ', error);
      return error;
    }
  },
  [customActions.getClientById]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { clientId }
      } = action;
      if (!clientId) {
        throw Error('You must provide clientId param');
      }
      return clientApi.getClientById(clientId);
    } catch (error) {
      console.error('error/client/get-client-by-id: ', error);
      return error;
    }
  },
  [customActions.getClientWalletList]: async (
    action: any = { payload: {} }
  ) => {
    try {
      const {
        payload: { clientId }
      } = action;
      if (!clientId) {
        throw Error('You must provide clientId param');
      }
      return clientApi.getClienthWallets(clientId);
    } catch (error) {
      console.error('error/client/get-client-wallet-list: ', error);
      return error;
    }
  }
};

export { handlers };
export default handlers;
