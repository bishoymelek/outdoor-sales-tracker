import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import classNames from 'classnames';
import i18next from 'i18next';

let router: { matchPath?: any; Link?: any; Route?: any };

const defaultProps = {
  tag: 'div',
  className: '',
  appRoutes: [{ path: '/', exact: true, name: 'Home', component: null }]
};

class AppBreadcrumb2 extends Component<any, any> {
  routes: any;

  constructor(props: any) {
    super(props);
    this.routes = props.appRoutes || [];
    router = props.router;
  }

  getPaths = (pathname: string) => {
    const paths = ['/'];

    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev: any, curr: any) => {
      const currPath = `${prev}/${curr}`;
      paths.push(currPath);
      return currPath;
    });
    return paths;
  };

  findRouteName2 = (url: any) => {
    const { matchPath } = router;
    const { routes } = this;
    const aroute: any = routes.length
      ? routes.find((route: { path: any; exact: any }) => {
          return matchPath(url, {
            path: route.path,
            exact: route.exact || true
          });
        })
      : null;
    return aroute && aroute.name ? i18next.t(aroute.name) : null;
  };

  BreadcrumbsItem2 = ({ match }: any) => {
    const routeName = this.findRouteName2(match.url);
    const { Link } = router;
    if (routeName) {
      return (
        // eslint-disable-next-line react/prop-types
        match.isExact ? (
          <BreadcrumbItem active>{routeName}</BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <Link to={match.url || ''}>{routeName}</Link>
          </BreadcrumbItem>
        )
      );
    }
    return null;
  };

  Breadcrumbs2 = (props: any) => {
    const {
      location: { pathname }
    } = props;
    const { Route } = router;
    const paths = this.getPaths(pathname);
    const items = paths.map((path, i) => (
      <Route key={i.toString()} path={path} component={this.BreadcrumbsItem2} />
    ));
    return <Breadcrumb>{items}</Breadcrumb>;
  };

  render() {
    // @ts-ignore
    const { className, tag: Tag, ...attributes } = this.props;

    delete attributes.children;
    // @ts-ignore
    delete attributes.appRoutes;
    // @ts-ignore
    delete attributes.router;

    const classes = classNames(className);

    const { Route } = router;

    return (
      <Tag className={classes}>
        <Route path="/:path" component={this.Breadcrumbs2} {...attributes} />
      </Tag>
    );
  }
}

// @ts-ignore
AppBreadcrumb2.defaultProps = defaultProps;

export default AppBreadcrumb2;
