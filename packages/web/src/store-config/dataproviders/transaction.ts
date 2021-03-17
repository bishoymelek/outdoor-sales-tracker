import { TransactionApi } from 'agent-client-sdk';
// import { dataActions } from 'react-state';
// import { httpSuccess, getMultipleResponse } from '../..';
import AuthService from 'utils/auth';
import { getMultipleResponse } from '..';

export const customActions = {
  getTransactionById: 'get_transaction_by_id',
  searchTransactions: 'search_transactions',
  submitTransaction: 'submitTransaction'
};

const transactionApi = new TransactionApi({
  basePath: process.env.REACT_APP_BASE_API
});

const handlers = {
  [customActions.getTransactionById]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { transactionId }
      } = action;
      if (!transactionId) {
        throw Error('You must provide transactionId param');
      }
      return transactionApi.getTransactionById(transactionId);
    } catch (error) {
      console.error('error/transaction/get-by-id: ', error);
      return error;
    }
  },
  [customActions.searchTransactions]: async (action: any = { payload: {} }) => {
    try {
      // const {
      //   payload: { searchString, ordered, activePage }
      // } = action;
      // const res: any = await transactionApi.searchtransactions(
      //   searchString,
      //   ordered,
      //   undefined,
      //   activePage,
      //
      // );
      return getMultipleResponse({
        payload: {
          data: [],
          ResultReport: []
        }
      });
      // TODO : uncomment this
      // return getMultipleResponse(res);
    } catch (error) {
      console.error('error/transaction/search: ', error);
      return error;
    }
  },
  [customActions.submitTransaction]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { transactionInfo }
      } = action;
      if (!transactionInfo) {
        throw Error('You must provide transactionInfo param');
      }
      return transactionApi.submitRransaction(transactionInfo);
    } catch (error) {
      console.error('error/transaction/submit: ', error);
      return error;
    }
  }
};

export { handlers };
export default handlers;
