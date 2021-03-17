import i18next from 'i18next';
import { dateFormatter } from '.';

export const agentActionListMapper = (data: any = {}): any => {
  return data?.length
    ? data.map((item: any) => ({
        ...item,
        createdAt: dateFormatter(item.createdAt)
      }))
    : [];
};

const currencySymbolMapper = (val: any): string => i18next.t(`lookup.${val}`);

export const walletTransactionListMapper = (data: any = {}): any => {
  return data?.length
    ? data.map((item: any) => {
        return {
          ...item,
          txnCommitTs: dateFormatter(item.txnCommitTs),
          txnEffectiveAmount: `${
            item.txnEffectiveAmount
          } ${currencySymbolMapper(item.txnCurrency)}`,
          walletBalanceAfter: `${
            item.walletBalanceAfter
          } ${currencySymbolMapper(item.txnCurrency)}`
        };
      })
    : [];
};

export const userGroupListMapper = (resp: any = {}): any => {
  return resp.data && resp.data.length
    ? resp.data.map((item: any) => ({
        name: item.name && item.name.ar ? item.name.ar : '',
        id: item._id
      }))
    : [];
};
