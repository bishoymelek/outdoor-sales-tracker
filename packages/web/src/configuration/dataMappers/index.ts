export function dateFormatter(date: Date) {
  return new Date(date).toLocaleString();
}

export const tableMapper = (resp: any): any => {
  try {
    if (typeof resp === 'object') {
      const { data, error, success, status = 'init' } = resp;
      return {
        listingErrMsg: error,
        listingSuccessMsg: success,
        totalItemsCount: data && data.paging && data.paging.totalCount,
        data: data && data.list,
        isLoading: status === 'loading' || status === 'init'
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const branchLookupMapper = (resp: any = {}): any => {
  return resp.data && resp.data.length
    ? resp.data.map((item: any) => ({ id: item._id, name: item.name.ar }))
    : [];
};

export const lookupMapper = (
  data: any = [],
  nameField: string,
  keyField: any
): any => {
  return data && data.length
    ? data.map((item: any) => ({ id: item[keyField], name: item[nameField] }))
    : [];
};

export const ticketListMapper = (data: any = []): any => {
  return data && data.length
    ? data.map((item: any) => ({
        ...item,
        ticketDate: dateFormatter(item.ticketDate)
      }))
    : [];
};

export const transactionListMapper = (data: any = []): any => {
  return data && data.length
    ? data.map((item: any) => ({
        ...item,
        transactionDate: dateFormatter(item.transactionDate)
      }))
    : [];
};

export const clientListMapper = (data: any = []): any => {
  return data && data.length
    ? data.map((item: any) => ({
        ...item,
        registeredOn: dateFormatter(item.registeredOn)
      }))
    : [];
};

export const userListMapper = (data: any = []): any => {
  return data && data.length
    ? data.map((item: any) => ({
        ...item,
        firstLogin: item.firstLogin ? 'نعم' : 'لا',
        active: item.active ? 'نعم' : 'لا'
      }))
    : [];
};

export const userGroupListMapper = (resp: any = {}): any => {
  return resp.data && resp.data.list && resp.data.list.length
    ? resp.data.list.map((item: any) => ({
        name: item.name && item.name.ar ? item.name.ar : '',
        id: item._id
      }))
    : [];
};
