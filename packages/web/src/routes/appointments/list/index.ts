/* eslint-disable no-param-reassign */
import Container from './List';

const actions = {
  changeCategory: 'change_category',
  toggleListFetching: 'toggle_list_fetching'
};

const initialState = {
  shouldUpdateMainList: false
};

const handlers = {
  [actions.changeCategory]: (state: any, action: any): any => {
    const { payload } = action;
    state.categoryCode = payload;
    return state;
  },
  [actions.toggleListFetching]: (state: any): any => {
    state.shouldUpdateMainList = !state.shouldUpdateMainList;
    return state;
  }
};

export { initialState, handlers, actions };
export default Container;
