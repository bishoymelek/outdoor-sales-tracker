/* eslint-disable no-param-reassign */
const actions = {
  toggleConfirmPasswordMsg: 'toggle_confirm_password_msg',
  toggleConfirmPinMsg: 'toggle_confirm_pin_msg'
};

const initialState = {
  showConfirmPasswordShouldMatchMsg: false,
  showConfirmPinShouldMatchMsg: false
};

const handlers = {
  [actions.toggleConfirmPasswordMsg]: (state, action) => {
    state.showConfirmPasswordShouldMatchMsg = action.payload;
    return state;
  },
  [actions.toggleConfirmPinMsg]: (state, action) => {
    state.showConfirmPinShouldMatchMsg = action.payload;
    return state;
  }
};
export { handlers, initialState, actions };
