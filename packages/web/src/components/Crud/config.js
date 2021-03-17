import resourcesList from 'store-config/resourcesList.json';

const routesConfig = [
  {
    path: '/',
    name: 'dashboard.title',
    key: 'Dashboard',
    dataRef: [
      {
        type: 'svm',
        storeName: 'nav'
      },
      {
        storeName: resourcesList.Account
      }
    ],
    dataMapper: state => ({
      branchId: state.nav_0.branch && state.nav_0.branch.id,
      shouldUpdateMainList: state.nav_0.shouldUpdateMainList,
      userBranchId:
        state[`${resourcesList.Account}_0`] &&
        state[`${resourcesList.Account}_0`].branchId &&
        state[`${resourcesList.Account}_0`].branchId._id
    })
  }
];

export default routesConfig;
