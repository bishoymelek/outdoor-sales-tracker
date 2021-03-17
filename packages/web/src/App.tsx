import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {
  LayoutContainer,
  AdminPanelContainer,
  ProtectedRoute,
  Translation,
  SynthesizedSpinner
} from 'components';
import history from 'utils/history';

import resourcesList from 'store-config/resourcesList.json';
import { Page404, Page500, Login } from 'routes';
import 'styles/App.scss';

function App(appProps: any): JSX.Element {
  const { sid } = appProps;
  return (
    <Router history={history}>
      <React.Suspense fallback={<SynthesizedSpinner hasOverlay psid={sid} />}>
        <Switch>
          <Route
            path="/login"
            exact
            render={props => (
              <Translation>
                <Login
                  {...props}
                  psid={sid}
                  resources={[{ storeName: resourcesList.Account }]}
                  dataRef={[
                    {
                      type: 'svm',
                      storeName: 'api'
                    },
                    {
                      storeName: resourcesList.Account,
                      psid: 'loginRoute'
                    }
                  ]}
                  dataMapper={(data: any) => ({
                    accountDetails:
                      data[`${resourcesList.Account}_0`] &&
                      data[`${resourcesList.Account}_0`].data,
                    loginErrMsg:
                      data[`${resourcesList.Account}_0`] &&
                      data[`${resourcesList.Account}_0`].error,
                    loginSuccessMsg:
                      data[`${resourcesList.Account}_0`] &&
                      data[`${resourcesList.Account}_0`].success
                  })}
                />
              </Translation>
            )}
          />
          <Route
            path="/admin"
            render={props => {
              return (
                <Translation>
                  <AdminPanelContainer {...props} psid="adminLayout" />
                </Translation>
              );
            }}
          />
          <Route path="/404" render={(props: any) => <Page404 {...props} />} />
          <Route path="/500" render={(props: any) => <Page500 {...props} />} />
          <Route
            render={props => (
              <>
                <ProtectedRoute>
                  <Translation>
                    <LayoutContainer psid="layout" {...props} />
                  </Translation>
                </ProtectedRoute>
              </>
            )}
          />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

App.defaultProps = {
  sid: 'app'
};

export default App;
