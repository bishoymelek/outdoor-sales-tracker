import { TicketApi } from 'agent-client-sdk';
import { dataActions } from 'react-state';
import { getMultipleResponse } from '..';

export const customActions = {
  searchTicket: 'search_ticket'
};

const ticketApi = new TicketApi({ basePath: process.env.REACT_APP_BASE_API });

const handlers = {
  [customActions.searchTicket]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { searchString, ordered, activePage }
      } = action;
      const res: any = await ticketApi.searchtickets(
        searchString,
        ordered,
        undefined,
        activePage
      );
      return getMultipleResponse({
        payload: {
          data: [],
          ResultReport: []
        }
      });
      // TODO : uncomment this
      // return getMultipleResponse(res);
    } catch (error) {
      console.error('error/ticket/search-ticket: ', error);
      return error;
    }
  },
  [dataActions.create]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { ticketInfo }
      } = action;
      if (!ticketInfo) {
        throw Error('You must provide ticketInfo param');
      }
      return ticketApi.submitTransaction(ticketInfo);
    } catch (error) {
      console.error('error/ticket/submit-ticket: ', error);
      return error;
    }
  },
  [dataActions.getOne]: async (action: any = { payload: {} }) => {
    try {
      const {
        payload: { ticketId }
      } = action;
      if (!ticketId) {
        throw Error('You must provide ticketId param');
      }
      return ticketApi.getTicketById(ticketId);
    } catch (error) {
      console.error('error/ticket/get-one: ', error);
      return error;
    }
  }
};

export { handlers };
export default handlers;
