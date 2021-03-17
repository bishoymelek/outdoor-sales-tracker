import { AgentActionApi } from 'agent-client-sdk';
// import { dataActions } from 'react-state';
// import { httpSuccess, getMultipleResponse } from '../..';
import { dataActions } from 'react-state';
import AuthService from 'utils/auth';
import { ApiResponseMapper } from '..';

export const customActions = {
  submitAction: 'submit_action',
  searchActions: 'search_actions',
  registerClient: 'register_client'
};

const agentActionApi = new AgentActionApi({
  basePath: process.env.REACT_APP_BASE_API
});

const handlers = {
  [customActions.submitAction]: async (action: any = { payload: {} }) => {
    try {
      if (!action.payload && action.payload.actionInfo) {
        throw Error('You must provide actionInfo param');
      }
      const { actionInfo } = action.payload;
      const res: any = await agentActionApi.submitAction(
        // @ts-ignore
        { ...actionInfo }
      );
      return ApiResponseMapper(res);
    } catch (error) {
      console.error('error/action-api/submit-action: ', error);
      return error;
    }
  },
  [dataActions.getMultiple]: async (action: any = {}) => {
    try {
      const { payload } = action;
      if (payload.searchString || payload.ordered || payload.activePage) {
        const { searchString = {}, ordered = '', activePage = 1 } = payload;
        const res: any = await agentActionApi.searchActions(
          searchString,
          ordered,
          undefined,
          activePage
        );
        return ApiResponseMapper({
          payload: {
            list: res.payload && res.payload,
            paging: res && res.ResultReport
          }
        });
      }
      return Error('You must provide searchString or ordered param');
    } catch (error) {
      console.error('error/action-api/search: ', error);
      return error;
    }
  },
  [customActions.registerClient]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { actionInfo, client }
      } = action;
      if (!actionInfo) {
        throw Error('You must provide actionInfo param');
      }
      return await agentActionApi.registerClient(
        // @ts-ignore
        { action: actionInfo, client }
      );
    } catch (error) {
      console.error('error/action-api/submit: ', error);
      return error;
    }
  }
};

export { handlers };
export default handlers;
