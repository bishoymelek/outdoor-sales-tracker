import { UserApi } from 'agent-client-sdk';
import AuthService from 'utils/auth';
import { ApiResponseMapper } from 'store-config';

const userApi = new UserApi({ basePath: process.env.REACT_APP_BASE_API });
// const securityQuestionApi = new SecurityQuestionApi({
//   basePath: process.env.REACT_APP_BASE_API
// });

export const accountCustomActionList = {
  getProfile: 'get_profile',
  updateProfile: 'update_profile',
  login: 'login',
  logout: 'logout',
  getSecurityQuestionLookupList: 'security_question_lookup_list'
};

const handlers = {
  login: async (action: any): Promise<any> => {
    try {
      const { email, password } = action?.payload;
      const res: any = await userApi.userLogin({
        email,
        password
      });
      const { msg } = res;
      const { token, userData } = res?.payload || {};
      if (token) {
        AuthService.setToken(token);
        return ApiResponseMapper({ payload: userData, msg, code: 200 });
      }
      return ApiResponseMapper({ msg, code: 404 });
    } catch (err) {
      console.error('err: ', err);
      return err;
    }
  },
  [accountCustomActionList.logout]: (): Promise<any> => {
    AuthService.removeToken();
    return ApiResponseMapper({ payload: null });
  }
  // [accountCustomActionList.getProfile]: async (action: any) => {
  //   try {
  //     const { mobileNumber } = action.payload;
  //     const res: any = await userApi.getUserByMobileNumber(mobileNumber);
  //     return ApiResponseMapper({
  //       ...res,
  //       payload: res.payload && res.payload.data,
  //       msg: res.msg
  //     });
  //   } catch (error) {
  //     console.log('error/get-profile', error);
  //   }
  // },
  // [accountCustomActionList.updateProfile]: async (
  //   action: any
  // ): Promise<any> => {
  //   try {
  //     const { payload } = action;
  //     if (!payload) {
  //       throw Error('error/update-profile,no payload been passed');
  //     } else {
  //       const { userId, ...rest } = payload;
  //       const res: any = await userApi.firstTimeLogin(userId, rest);
  //       return ApiResponseMapper(res);
  //     }
  //   } catch (error) {
  //     console.log('error/update-profile', error);
  //   }
  // }
  // [accountCustomActionList.getSecurityQuestionLookupList]: async (
  //   action: any
  // ) => {
  //   try {
  //     const res: any = await securityQuestionApi.getAllSecurityQuestions();
  //     return ApiResponseMapper(res);
  //   } catch (error) {
  //     console.log('error/get-profile', error);
  //   }
  // }
};

export { handlers };
export default handlers;
