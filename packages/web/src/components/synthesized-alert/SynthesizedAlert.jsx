import React from 'react';
import i18next from 'i18next';
import { synthesizeComponent } from 'react-state';
import { Alert } from 'reactstrap';

class AlertComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ toggled: true });
  }

  render() {
    const {
      hasApiFinished,
      apiFailureMessage,
      apiSuccessMessage,
      apiResponseStatus
    } = this.props;
    const { toggled } = this.state;

    if (toggled) return <></>;
    if (hasApiFinished) {
      if (apiResponseStatus === 'error') {
        return (
          <Alert color="danger" toggle={this.onDismiss}>
            {i18next.t(apiFailureMessage)}
          </Alert>
        );
      }

      return (
        <Alert
          color={apiSuccessMessage ? 'success' : 'danger'}
          toggle={this.onDismiss}
        >
          {i18next.t(apiSuccessMessage || apiFailureMessage)}
        </Alert>
      );
    }
    return <></>;
  }
}
AlertComponent.defaultProps = {
  sid: 'synthesizedAlert'
};
export const SynthesizedAlert = synthesizeComponent(AlertComponent);
export default SynthesizedAlert;
