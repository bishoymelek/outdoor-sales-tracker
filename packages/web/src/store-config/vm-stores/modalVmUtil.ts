/* eslint-disable no-param-reassign */
const modalActionList = {
  openModal: 'open_modal',
  closeModalClearState: 'close_modal_clear_state',
  confirmItem: 'confirm_item'
};

const initialState = {
  isModalOpen: false,
  hasConfirmedOperation: false
};

const handlers = {
  [modalActionList.openModal]: (state: any): any => {
    state.isModalOpen = true;
    return state;
  },
  [modalActionList.confirmItem]: (state: any): any => {
    state.hasConfirmedOperation = true;
    return state;
  },
  [modalActionList.closeModalClearState]: (state: any): any => {
    state.isModalOpen = false;
    state.hasConfirmedOperation = false;
    return state;
  }
};

export { handlers, initialState, modalActionList };
