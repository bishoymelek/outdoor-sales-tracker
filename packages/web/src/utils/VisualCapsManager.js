/* eslint-disable no-unused-expressions, array-callback-return */

/**
 * Mainly, this class handles visual capabilities from:
 *  getting,parsing, formatting and stringify
 */
class VisualCapsManager {
  constructor(routesList, widgetsList) {
    this.routesList = routesList;
    this.widgetsList = widgetsList;
    this.dependVisualPermissionsList = {};
    this.collectVisualPermissions = this.collectVisualPermissions.bind(this);
    this.getVisualPermissionsList = this.getVisualPermissionsList.bind(this);
  }

  populateRouteDependVisualCaps = dependList => {
    const resultDependList = {};
    dependList &&
      dependList.map(name => {
        resultDependList[name] = this.dependVisualPermissionsList[name];
      });
    return resultDependList;
  };

  getVisualPermissionsList = list => {
    const resultedVisualCapsList = {};
    Object.entries(list).map(([, component]) => {
      const { defaultProps } = component || {};
      if (defaultProps) {
        const { sid = defaultProps.psid } = defaultProps;
        if (defaultProps.permissions) {
          const { permissions } = defaultProps;
          resultedVisualCapsList[sid] = permissions;
          if (permissions.depend && permissions.depend.length) {
            resultedVisualCapsList[
              sid
            ].depend = this.populateRouteDependVisualCaps(permissions.depend);
          } else {
            resultedVisualCapsList[sid] = defaultProps.permissions;
          }
        } else {
          resultedVisualCapsList[sid] = {};
        }
      }
    });
    return Promise.resolve(resultedVisualCapsList);
  };

  collectVisualPermissions = async () => {
    const { routesList, widgetsList } = this;
    this.dependVisualPermissionsList = await this.getVisualPermissionsList(
      widgetsList
    );
    // TODO: do it
    // const widgetdata = this.dependVisualPermissionsList;
    const routesData = await this.getVisualPermissionsList(routesList);
    return Promise.resolve({ ...routesData });
  };
}

export { VisualCapsManager };
export default VisualCapsManager;
