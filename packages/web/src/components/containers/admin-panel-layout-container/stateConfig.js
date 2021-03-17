import resourcesList from 'store-config/resourcesList.json';

export const stateConfig = {
  dataMapper: state => ({
    layoutConfig: state.App_0
  }),
  dataRef: [
    {
      storeName: resourcesList.App
    }
  ]
};

export default stateConfig;
