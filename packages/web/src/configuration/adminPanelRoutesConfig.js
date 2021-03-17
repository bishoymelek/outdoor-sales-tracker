import { getOne, getMultiple } from 'react-state';
import resourcesList from 'store-config/resourcesList.json';

/**
 * Routes Array available with some props
 * Every Object should has:
 * @param {string} path path of route
 * @param {Boolean} exact whether it should be exact route or not
 * @param {string} name Name to be shown
 * @param {string} key To be used while mapping the route with its component
 */
const routesConfig = [
  {
    path: 'dashboard',
    name: 'dashboard.title',
    key: 'Dashboard'
    // exact: true
  },
  {
    path: 'visual-caps',
    name: 'visualCaps.list.title',
    key: 'VisualCaps',
    storeName: 'visualCaps',
    resources: [
      {
        storeName: resourcesList.UserGroup,
        initAction: { handler: getMultiple }
      },
      {
        storeName: resourcesList.UserGroup,
        index: 1
      }
    ],
    dataRef: [
      {
        storeName: resourcesList.UserGroup,
        index: 1,
        psid: 'visualCaps'
      }
    ],
    dataMapper: state => ({
      userGroupPermissionsList:
        state[`${resourcesList.UserGroup}_1`] &&
        state[`${resourcesList.UserGroup}_1`].data &&
        state[`${resourcesList.UserGroup}_1`].data.permissions &&
        JSON.parse(state[`${resourcesList.UserGroup}_1`].data.permissions)
    })
  },
  {
    path: 'layout-manager',
    name: 'layout.config.title',
    key: 'LayoutEditor',
    resources: [
      {
        storeName: resourcesList.App,
        initAction: {
          handler: getOne,
          criteria: { id: '5e26f5f3eeb3f839fdae467e' }
        }
      }
    ]
  }
];

export default routesConfig;
