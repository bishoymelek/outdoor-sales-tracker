import React from 'react';
import { Redirect } from 'react-router-dom';
import history from 'utils/history';
import AuthService from 'utils/auth';

const ProtectedRoute = ({ children }) => {
  return <>{AuthService.isLoggedIn() ? children : <Redirect to="/login" />}</>;
};

const ProtectedRouteHOC = (Component, index) => {
  const ProtectedRouteWrapper = props => {
    const { permissions = {}, location } = props;
    if (
      AuthService.getFirstTimeLoginStatus() &&
      location &&
      location.pathname !== '/first-time-login'
    ) {
      history.push('./first-time-login');
    }
    // // TODO: uncomment this
    // if (permissions.showRoute) {
    return <Component key={index} {...props} />;
    // }
    // return (
    //   <h2 className="text-center">{i18next.t('user.unauthorized.title')}</h2>
    // );
  };

  ProtectedRouteWrapper.defaultProps = {
    sid: Component.defaultProps.sid
  };
  return ProtectedRouteWrapper;
};
export { ProtectedRouteHOC, ProtectedRoute };
