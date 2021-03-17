import AuthService from 'utils/auth';

/* eslint-disable no-param-reassign */
const type = 'dm';

const actions = {
  login: 'login',
  logout: 'logout'
};

const handlers = {
  [actions.login]: (state: any, action: any): any => {
    try {
      const {
        payload: { data, error, status, success }
      } = action;
      const permissions =
        data && data.groups && data.groups.length && data.groups[0].permissions
          ? JSON.parse(data.groups[0].permissions)
          : [];
      state = {
        ...state,
        error,
        status,
        success,
        data: { ...data, permissions }
      };
      return state;
    } catch (error) {
      console.log(error);
    }
  },
  [actions.logout]: (state: any, action: any): any => {
    // console.log('action', action);
    AuthService.removeToken();
  }
};
export { type, handlers };
export default { type, handlers };
