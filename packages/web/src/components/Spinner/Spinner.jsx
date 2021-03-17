import React from 'react';
import { Spinner as InternalSpinner } from 'reactstrap';

function CoreSpinner({ color = 'primary', className = '' }) {
  return <InternalSpinner id="spinner" color={color} className={className} />;
}

function SpinnerWithOverlay(props) {
  return <div id="cover-spin">{CoreSpinner(props)}</div>;
}

function Spinner(props) {
  const { isLoading, hasOverlay, ...restProps } = props;
  if (isLoading) {
    if (hasOverlay) {
      return (
        <div className="spinner-container">
          <SpinnerWithOverlay {...props} />
        </div>
      );
    }
    return (
      <div className="spinner-container">
        <CoreSpinner {...restProps} />
      </div>
    );
  }
  return null;
}

Spinner.defaultProps = {
  sid: 'spinner'
};

export default Spinner;
