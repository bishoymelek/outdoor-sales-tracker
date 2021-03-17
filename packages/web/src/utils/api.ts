import { deleteItemActionList } from 'store-config/deleteItemVmUtil';

type dmResponseMapperReturnedTypes = {
  isApiLoading: boolean;
  hasApiFinished: boolean;
  apiResponseStatus: string;
  apiSuccessMessage: string;
  apiFailureMessage: string;
  data: any;
};

/**
 * Gets state framework response in dataMapper function with storeName and optionally index
 * And returns back api success or failure message, is currently loading (connecting to API) and if API call finished
 * @param data state returned from dataMapper method
 * @param storeName store name which you want to listen to
 * @param index optionally index, default is 0
 */
const dmStoreResponseMapper = (
  data: any,
  storeName: string,
  index = 0
): dmResponseMapperReturnedTypes => ({
  apiResponseStatus: data[`${storeName}_${index}`]?.status,
  isApiLoading: data[`${storeName}_${index}`]?.status === 'loading',
  hasApiFinished: !!(
    data[`${storeName}_${index}`]?.status === 'success' ||
    data[`${storeName}_${index}`]?.status === 'error'
  ),
  apiSuccessMessage: data[`${storeName}_${index}`]?.success,
  apiFailureMessage: data[`${storeName}_${index}`]?.error,
  data: data[`${storeName}_${index}`]?.data
});

export const responseMapper = (data: any, storeName: any, index = 0) => ({
  isApiLoading:
    data[`${storeName}_${index}`] &&
    data[`${storeName}_${index}`].status &&
    data[`${storeName}_${index}`].status === 'loading',
  hasApiFinished:
    data[`${storeName}_${index}`] &&
    data[`${storeName}_${index}`].status &&
    data[`${storeName}_${index}`].status === 'success',
  apiSuccessMessage:
    data[`${storeName}_${index}`] &&
    data[`${storeName}_${index}`].success &&
    data[`${storeName}_${index}`].success,
  apiFailureMessage:
    data[`${storeName}_${index}`] &&
    data[`${storeName}_${index}`].error &&
    data[`${storeName}_${index}`].error
});

export function getListWithCityOrBranchId(props: any) {
  const { shouldUpdateMainList, changeValue, sid } = props;
  if (shouldUpdateMainList && sid) {
    changeValue('nav', 'branch', { isUpdated: false, id: undefined });
    changeValue('nav', 'shouldUpdateMainList', false);
  }
}

export function handleDeleteItem(props: any) {
  const {
    hasConfirmedToDeleteItem,
    isModalOpen,
    fireAction,
    itemToDelete
  } = props;

  if (itemToDelete && isModalOpen && hasConfirmedToDeleteItem) {
    fireAction(deleteItemActionList.closeModalClearState);
  }
}

export { dmStoreResponseMapper };
export default dmStoreResponseMapper;
