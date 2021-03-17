import resourcesList from './resourcesList.json';
import * as sharedStores from './svm-stores';
import * as dmStoresConfig from './dm-stores';
import { vmStores } from './vm-stores';

// TODO: remove it
function httpSuccess(resp: any): any {
  try {
    const { data = {}, error = null, success = null } = resp;
    return {
      data,
      error,
      success
    };
  } catch (err) {
    console.error(err);
    return err;
  }
}

export function ApiResponseMapper({ payload, msg, code }: any): any {
  try {
    return {
      data: payload,
      error: code !== 200 && msg,
      success: code === 200 && msg
    };
  } catch (err) {
    throw Error(err);
  }
}

function getMultipleResponse({ payload, msg, code }: any): any {
  try {
    return ApiResponseMapper({
      payload: {
        list: payload && payload.data,
        paging: payload && payload.ResultReport
      },
      msg,
      code
    });
  } catch (err) {
    console.error(err);
    return err;
  }
}

export const storeConfig: object = {
  vm: { ...vmStores },
  svm: { ...sharedStores },
  dm: { ...dmStoresConfig }
};

export { getMultipleResponse, httpSuccess };
