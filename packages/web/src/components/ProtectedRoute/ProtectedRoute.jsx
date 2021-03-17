/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Redirect } from 'react-router-dom';
// import i18next from 'i18next';
import AuthService from 'utils/auth';

const ProtectedRoute = props => (
  <>{AuthService.isLoggedIn() ? props.children : <Redirect to="/login" />}</>
);

const ProtectedRouteHOC = Component => {
  class ProtectedRouteWrapper extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
    }

    render() {
      const { permissions = {} } = this.props;
      // if (permissions.showRoute) {
      return <Component {...this.props} />;
      // }
      // return (
      //   <h2 className="text-center">{i18next.t('user.unauthorized.title')}</h2>
      // );
    }
  }
  ProtectedRouteWrapper.defaultProps = {
    sid: Component.defaultProps.sid
  };
  return ProtectedRouteWrapper;
};
export { ProtectedRouteHOC, ProtectedRoute };
