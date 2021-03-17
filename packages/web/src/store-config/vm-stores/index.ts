import { dropdownComponentState } from 'components/synthesized-dropdown';
import { handlers as ClientDetailsWalletsTabHandlers } from 'components/client-details-tabs/ClientDetailsWalletsTab';
import * as deleteItemStateUtil from './deleteItemVmUtil';
import * as passwordEqualityCheckVm from './passwordEqualityCheckVm';
import * as modalVmUtil from './modalVmUtil';

export const visualCapsRouteState = {
  actions: {
    updateOptionsList: 'update_options_list',
    onChangeOptionValue: 'on_option_value_change',
    onChangeUserGroup: 'on_change_user_group',
    toggleOptionsValuesIsUpdated: 'toggle_options_values_is_updated'
  },

  initialState: {
    selectedGroup: null,
    optionsValues: undefined,
    optionsValuesIsUpdated: true
  },

  handlers: {
    update_options_list: (state: any, action: any) => {
      const {
        payload: { optionsList }
      } = action;
      if (optionsList) state.optionsList = optionsList;
      return state;
    },
    on_option_value_change: (state: any, action: any) => {
      const { payload } = action;
      state.optionsValuesIsUpdated = payload;
      return state;
    },

    on_change_user_group: (state: any, action: any) => {
      const { payload } = action;
      if (payload) state.optionsValues = payload;
      return state;
    },
    toggle_options_values_is_updated: (state: any, action: any) => {
      const {
        payload: { id }
      } = action;
      if (id) state.selectedGroupId = id;
      return state;
    }
  }
};

const routesStoresConfig = {
  visualCaps: visualCapsRouteState,
  layoutManager: {
    handlers: {
      ...modalVmUtil.handlers
    },
    initialState: {
      ...modalVmUtil.initialState
    }
  }
};

const synthesizedStoresConfig = {
  dropdown: {
    handlers: dropdownComponentState.handlers
  },
  customTagDropdown: dropdownComponentState,
  ClientDetailsWalletTab: {
    handlers: ClientDetailsWalletsTabHandlers
  }
};

export const vmStores = {
  ...synthesizedStoresConfig,
  ...routesStoresConfig
};

export { modalVmUtil, deleteItemStateUtil, passwordEqualityCheckVm };
