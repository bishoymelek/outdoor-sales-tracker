import { getOne } from 'react-state';
import resourcesList from 'store-config/resourcesList.json';
import { dmStoreResponseMapper } from 'utils/api';

export const stateConfig = {
  resources: [
    {
      storeName: resourcesList.App,
      initAction: {
        handler: getOne,
        criteria: { id: '5e26f603eeb3f839fdae46a9' }
      }
    },
    { storeName: resourcesList.Account }
  ],
  dataMapper: state => ({
    ...dmStoreResponseMapper(state, resourcesList.App),
    layoutConfig: dmStoreResponseMapper(state, resourcesList.App).data
  }),
  dataRef: [
    {
      storeName: resourcesList.App
    },
    { storeName: resourcesList.Account }
  ]
};

export default stateConfig;
