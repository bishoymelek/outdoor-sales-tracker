import { AgentNotificationApi } from 'agent-client-sdk';
// import { httpSuccess, getMultipleResponse } from '../..';
import { dataActions } from 'react-state';
import { getMultipleResponse } from '..';
import { dummyResp } from './dummyResponses';
// import { ApiResponseMapper } from 'module-user/data-provider/mapperUtils';

export const customActions = {
  searchAgentNotificationList: 'search_agent_notification'
};

const agentNotificationApi = new AgentNotificationApi({
  basePath: process.env.REACT_APP_BASE_API
});

const handlers = {
  [dataActions.getMultiple]: async (action: any = {}) => {
    try {
      const { payload } = action;
      if (payload.searchString || payload.ordered || payload.activePage) {
        const { searchString = {}, ordered = '', activePage = 1 } = payload;
        const res: any = await agentNotificationApi.searchAgentNotification(
          searchString,
          ordered,
          undefined,
          activePage
        );
        // return ApiResponseMapper({
        //   payload: {
        //     list: res.payload && res.payload,
        //     paging: res && res.ResultReport
        //   }
        // });
        return getMultipleResponse({
          payload: {
            data: dummyResp.notification.search.results,
            ResultReport: dummyResp.notification.search.resultreport
          },
          msg: 'success',
          code: 200
        });
      }
      return Error('You must provide searchString or ordered param');
    } catch (error) {
      console.error('error/notification/search: ', error);
      return error;
    }
  }
};

export { handlers };
export default handlers;
