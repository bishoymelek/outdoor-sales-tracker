/* eslint-disable no-param-reassign */
const deleteItemActionList = {
  openDeletingModal: 'open_delete_modal',
  closeModalClearState: 'close_modal_clear_state',
  confirmDeletingItem: 'confirm_deleting_item'
};

const initialState = {
  itemToDelete: undefined,
  isModalOpen: false,
  hasConfirmedToDeleteItem: false
};

const handlers = {
  [deleteItemActionList.openDeletingModal]: (state: any, action: any): any => {
    state.itemToDelete = action.payload;
    state.isModalOpen = true;
    return state;
  },
  [deleteItemActionList.confirmDeletingItem]: (
    state: any,
    action: any
  ): any => {
    state.hasConfirmedToDeleteItem = true;
    return state;
  },
  [deleteItemActionList.closeModalClearState]: (state: any): any => {
    state = initialState;
    return state;
  }
};

export { handlers, initialState, deleteItemActionList };
