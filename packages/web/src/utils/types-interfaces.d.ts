type synthesizedDropdownHandlerType = {
  id: string;
  name: string;
};

type resourceType = {
  storeName: string;
  index?: number;
  psid?: string;
};

type dataRefType = {
  storeName: string;
  index?: number;
  psid?: string;
};

type BaseCUIRoutePropTypes = {
  fireDataAction: Function;
  psid?: string;
  sid?: string;
  index?: number;
  permissions?: any;
  t: Function;
  dataRef?: DataRefCUIProps[];
  dataMapper(dataRef: DataRefCUIProps[], data: any, schema?: any): any;
  events?: {
    [key: string]: (event: React.MouseEvent<any, MouseEvent>) => void;
  };
  fireAction: Function;
  resources: Array<resourceType>;
  match: any;
  location: any;
};

type KYCBatchDetailsRouteTypes = {
  agent: any;
  itemToDelete: any;
  isDeleteModalOpen: boolean;
  isCancelBatchModalOpen: boolean;
  isSubmitBatchModalOpen: boolean;
};

type UserBatchDetailsRouteTypes = {
  agent: any;
  itemToDelete: any;
  isDeleteModalOpen: boolean;
  isCancelBatchModalOpen: boolean;
  isSubmitBatchModalOpen: boolean;
};

type KycBatchListRouteTypes = {};

type synthesizedSpinnerTypes = { isLoading: boolean };

type dataMapperStateTypes = Array<{
  data?: any;
  status?: any;
  success?: string;
  error?: string;
}>;

interface CashInCUIPropTypes {
  transactionFees: number;
  client: any;
  agent: any;
  clientMobileNumber: number;
  transactionDetails: SendCashInOutRequest;
}

interface CashOutCUIPropTypes {
  transactionFees: number;
  client: any;
  agent: any;
  clientMobileNumber: number;
  transactionDetails: SendCashInOutRequest;
}
