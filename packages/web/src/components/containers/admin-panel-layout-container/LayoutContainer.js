import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { AppAside, AppFooter, AppHeader } from '@coreui/react';
import { initSynthesizedRoutes } from 'utils/state-framework';
import resourcesList from 'store-config/resourcesList.json';
import AppBreadcrumb from 'components/bread-crump';
import { SynthesizedSpinner } from 'components';
import { HeadTags, ProtectedRouteHOC } from 'components';
import * as routesList from 'routes/AdminPanelRoutes';
import routesConfig from 'configuration/adminPanelRoutesConfig';
import layoutConfig from 'configuration/adminPanelLayoutConfig';
import history from 'utils/history';
import 'styles/style.scss';
import SideBar from './SideBar';

const DynamicAside = React.lazy(() => import('./Aside'));
const DynamicFooter = React.lazy(() => import('./Footer'));
const DynamicHeader = React.lazy(() => import('./Header'));

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this.routes = initSynthesizedRoutes(
      routesList,
      routesConfig,
      ProtectedRouteHOC
    );
  }

  loading = () => {
    const { sid } = this.props;
    return <SynthesizedSpinner isLoading hasOverlay psid={sid} />;
  };

  signOut() {
    const { fireDataAction } = this.props;
    fireDataAction('logout', null, resourcesList.Account, 'layout');
    history.push('/login');
    window.location.reload();
  }

  render() {
    const { sid, match } = this.props;
    if (layoutConfig) {
      const {
        sidebar,
        footer,
        header,
        main = { hasAside: false, hasSidebar: true },
        aside
      } = layoutConfig;

      if (!sidebar || !footer || !header) {
        return this.loading();
      }
      return (
        <div className="app admin-layout">
          <SynthesizedSpinner
            hasOverlay
            className="spinner"
            dataRef={[
              {
                type: 'svm',
                storeName: 'api'
              }
            ]}
            dataMapper={state => ({
              isLoading: state.api_0.isLoading
            })}
            psid={sid}
          />
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DynamicHeader
                config={header}
                mainConfig={main}
                handlersList={{
                  'تسجيل الخروج': e => this.signOut(e)
                }}
              />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <SideBar
              {...this.props}
              mainConfig={main}
              sidebarConfig={sidebar}
            />
            <main className="main">
              <Row className=" pb-2">
                <Col>
                  <AppBreadcrumb appRoutes={this.routes} router={router} />
                </Col>
              </Row>
              <Container fluid className="mt-4">
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {this.routes && this.routes.length
                      ? this.routes.map((OneRoute, idx) => {
                          const {
                            Component,
                            path,
                            exact = false,
                            name,
                            ...routeRestProps
                          } = OneRoute;
                          return Component ? (
                            <Route
                              key={`${idx}_${name}`}
                              path={`${match.path}/${path}`}
                              exact={exact}
                              name={name}
                              render={props => (
                                <HeadTags name={OneRoute.name}>
                                  <Component
                                    psid={sid}
                                    {...props}
                                    {...routeRestProps}
                                  />
                                </HeadTags>
                              )}
                            />
                          ) : (
                            <Redirect
                              key={name}
                              from="/admin"
                              to="/admin/dashboard"
                            />
                          );
                        })
                      : null}
                  </Switch>
                </Suspense>
              </Container>
            </main>
            {aside ? (
              <AppAside fixed>
                <Suspense fallback={this.loading()}>
                  <DynamicAside config={aside} />
                </Suspense>
              </AppAside>
            ) : null}
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DynamicFooter config={footer} />
            </Suspense>
          </AppFooter>
        </div>
      );
    }
    return null;
  }
}

AdminLayout.defaultProps = {
  sid: 'adminLayout'
};

export default AdminLayout;
