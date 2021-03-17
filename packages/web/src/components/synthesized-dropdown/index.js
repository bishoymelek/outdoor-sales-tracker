/* eslint-disable no-param-reassign */
import { synthesizeComponent } from 'react-state';
import Component from './DropDown';

const dropdownComponentActions = {
  toggleList: 'toggle_list'
};

const dropdownComponentState = {
  initialState: {
    isListOpen: false,
    isName: true
  },
  handlers: {
    [dropdownComponentActions.toggleList]: draft => {
      draft.isListOpen = !draft.isListOpen;
      return draft;
    }
  }
};

export const Dropdown = synthesizeComponent(Component, {
  state: dropdownComponentState.initialState
});
export { dropdownComponentState };
export default Dropdown;
