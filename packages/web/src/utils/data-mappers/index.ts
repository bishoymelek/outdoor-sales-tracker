import { dmStoreResponseMapper } from 'utils/api';

export * from './lookups';

/**
 * Format date according to current country format
 * @param date date
 */
export function dateFormatter(date: Date): string {
  return new Date(date).toLocaleString();
}

/**
 * remove country code if the mobile/landline number starts with it
 * @param number mobile/landline number as string
 */
export function removeCountryCode(number: string): string {
  return number?.length > 3 ? number.substr(3) : number;
}

/**
 * Loops and checks if any one is loading so we can show spinner
 * @param array whole state returned from dataMapper() method
 */
// TODO: refactor to use entries.find, better
export const mapLoadingProp = (array: any): boolean => {
  try {
    let isLoading = false;
    const list: any = Object.entries(array).map(([, value]: any) => value);
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].status === 'loading') {
        isLoading = true;
        break;
      }
    }
    return isLoading;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Map data from dataMapper() method to the table component data model
 */
export const mapListingResponseToComponent = (
  data: any,
  storeName: string,
  index = 0,
  listMapper?: Function
): {
  listingErrMsg: string;
  listingSuccessMsg: string;
  data: any;
  totalPageCount: number;
} => {
  try {
    return {
      listingErrMsg: data[`${storeName}_${index}`]?.error,
      listingSuccessMsg: data[`${storeName}_${index}`]?.success,
      data: listMapper
        ? listMapper(data[`${storeName}_${index}`]?.data?.list)
        : data[`${storeName}_${index}`]?.data?.list,
      totalPageCount: data[`${storeName}_${index}`]?.data?.paging?.totalCount
    };
  } catch (error) {
    throw Error(error);
  }
};

// TODO: check if it's still needed
export const clientVerificationResMapper = (
  data: any
): {
  agent: any;
} => ({
  agent:
    dmStoreResponseMapper(data, 'account') &&
    dmStoreResponseMapper(data, 'account').data
});
