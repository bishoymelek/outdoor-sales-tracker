import i18next from 'i18next';

export const localizeLookup = (data: any = {}): string =>
  data ? data[`lookupValue${i18next.language === 'ar' ? 'Ar' : 'En'}`] : '';

export const securityQuestionLookupMapper = (resp: any = {}): any => {
  return resp.data && resp.data.length
    ? resp.data.map((item: any) => ({ id: item._id, name: item.name }))
    : [];
};

export const lookupMapper = (resp: any = {}): any => {
  return resp.data?.length
    ? resp.data.map((item: any) => ({
        id: item.lookupId,
        name: item[`value_${i18next.language}`]
      }))
    : [];
};

export const customLookupListMapper = (
  list: any = {},
  nameField: string,
  idField: string
): any => {
  return list?.length
    ? list.map((item: any) => ({
        id: item[idField],
        name: item[nameField]
      }))
    : [];
};
export const genderLookupMapper = (resp: any = {}): any => {
  return resp.data && resp.data.length
    ? resp.data.map((item: any) => ({ id: item._id, name: item.name.ar }))
    : [];
};
