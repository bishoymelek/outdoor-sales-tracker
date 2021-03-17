import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { AppAside, AppFooter, AppHeader } from '@coreui/react';
import { synthesizeComponent } from 'react-state';
import { initSynthesizedRoutes } from 'utils/state-framework';
import resourcesList from 'store-config/resourcesList.json';
import AppBreadcrumb from 'components/bread-crump';
import * as routesList from 'routes';
import { SynthesizedSpinner } from 'components';
import routesConfig from 'configuration/routes-config';
import { HeadTags, ProtectedRouteHOC } from 'components';
import SideBar from './SideBar';
import Header from './Header';

const DynamicAside = React.lazy(() => import('./Aside'));
const DynamicFooter = React.lazy(() => import('./Footer'));
const DynamicHeader = synthesizeComponent(Header);

class LayoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.routes = initSynthesizedRoutes(
      routesList,
      routesConfig,
      ProtectedRouteHOC
    );
    this.logout = this.logout.bind(this);
  }

  loading = () => {
    const { sid } = this.props;
    return <SynthesizedSpinner isLoading hasOverlay psid={sid} />;
  };

  logout() {
    const { history, fireDataAction } = this.props;
    fireDataAction('logout', null, resourcesList.Account, 'layout');
    history.push('/login');
  }

  render() {
    const { sid, layoutConfig = null, changeValue, ...restProps } = this.props;
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
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DynamicHeader
                resources={[{ storeName: resourcesList.Notification }]}
                psid={sid}
                config={header}
                mainConfig={main}
                handlersList={{
                  logout: e => this.logout(e)
                }}
              />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <SideBar {...restProps} mainConfig={main} sidebarConfig={sidebar} />
            <main className="main">
              <Row className="pb-2">
                <Col>
                  <AppBreadcrumb appRoutes={this.routes} router={router} />
                </Col>
              </Row>
              <Container fluid className="mt-4">
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {this.routes?.length
                      ? this.routes.map((OneRoute, idx) => {
                          const {
                            Component,
                            path,
                            exact = true,
                            name,
                            ...routeRestProps
                          } = OneRoute;
                          return Component ? (
                            <Route
                              key={`${idx}_${name}`}
                              path={path}
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
                            <Redirect key={name} to="/" />
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

LayoutContainer.defaultProps = {
  sid: 'layout'
};

export default LayoutContainer;
