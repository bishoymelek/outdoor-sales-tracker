import React from 'react';
import history from 'utils/history';

function ErrorHandler(props) {
  const { errCode, children } = props;
  if (errCode) {
    if (props.errCode === 500) {
      history.push(`./500`);
    }
  }
  return <>{children}</>;
}

ErrorHandler.defaultProps = {
  sid: 'internal_error'
};

export default ErrorHandler;
