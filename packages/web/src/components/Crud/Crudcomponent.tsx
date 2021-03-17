import React, { Suspense } from 'react';
// import { Col, Row } from 'reactstrap';
// import Pagination from 'react-js-pagination';
// import BootstrapTable from 'react-bootstrap-table-next';
// import { dataActions } from 'react-state';
// import { Switch } from 'react-router-dom';
// import initBindedRoutes from 'portal-manager';

// interface TableComponentProps {
//   sid: string;
// data: Array<any>;
// schema: object;
// t: Function;
// storeName: string;
// striped: boolean;
// totalPageCount: number;
// }

class TableComponent extends React.PureComponent<any, any> {
  // static defaultProps: any = {
  //   sid: 'table',
  //   data: [],
  //   schema: {},
  //   t: () => {},
  //   storeName: 'customStoreName',
  //   striped: false,
  //   totalPageCount: 1
  // };

  constructor(props: any) {
    super(props);
    this.state = {
      activePage: 1,
      activePageUpdated: false
    };
    // // this.routes = initBindedRoutes(routesList, routesConfig, ProtectedRouteHOC);
    // this.handlePageChange = this.handlePageChange.bind(this);
  }

  // componentDidUpdate(): void {
  //   const { activePage, activePageUpdated } = this.state;
  //   if (activePage && activePageUpdated) {
  //     this.setState((prevState: Function) => ({
  //       ...prevState,
  //       activePageUpdated: false
  //     }));
  //     const { fireDataAction, psid, storeName } = this.props;
  //     fireDataAction(dataActions.getMultiple, { activePage }, storeName, psid);
  //   }
  // }

  // handlePageChange(pageNumber: number): void {
  //   this.setState({ activePage: pageNumber, activePageUpdated: true });
  // }

  render(): JSX.Element {
    // const {
    //   t,
    //   storeName,
    //   striped = false,
    //   data = [],
    //   schema = {},
    //   totalPageCount
    // } = this.props;
    // const { activePage } = this.state;
    return <></>;
    // return (
    //   <div className={`${storeName}-list widget`}>
    //      <Suspense fallback={this.loading()}>
    //       <Switch>
    //         {this.routes && this.routes.length
    //           ? this.routes.map((OneRoute, idx) => {
    //               const {
    //                 Component,
    //                 path,
    //                 exact = true,
    //                 name,
    //                 // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //                 ...routeRestProps
    //               } = OneRoute;
    //               return Component ? (
    //                 <Route
    //                   key={`${idx}_${name}`}
    //                   path={path}
    //                   exact={exact}
    //                   name={name}
    //                   render={props => (
    //                     <HeadTags t={t} name={OneRoute.name}>
    //                       <Component psid={sid} t={t} {...props} />
    //                     </HeadTags>
    //                   )}
    //                 />
    //               ) : (
    //                 <Redirect key={name} from="/" to="/loan" />
    //               );
    //             })
    //           : null}
    //       </Switch>
    //     </Suspense>
    //   </div>
    // );
  }
}

export default TableComponent;
