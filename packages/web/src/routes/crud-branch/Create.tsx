import React from 'react';
import { Col, Row } from 'reactstrap';
import { dataActions } from 'react-state';
import Spinner from 'components/synthesized-spinner';
import Form from 'components/synthesized-form';
import resourcesList from 'store-config/resourcesList.json';
import { responseMapper } from 'utils/api';
import { branchSchema } from 'configuration/schemas';

class Component extends React.Component<any, any> {
  isUpdating: any;

  isCreating: any;

  constructor(props: any) {
    super(props);
    this.state = {};
    this.submitHandler = this.submitHandler.bind(this);
    this.isCreating =
      (props.location &&
        props.location.state &&
        props.location.state.isCreating) ||
      props.isCreating;
    this.isUpdating =
      (props.location &&
        props.location.state &&
        props.location.state.isUpdating) ||
      props.isUpdating ||
      false;
  }

  submitHandler = (data: any): void => {
    const { fireDataAction, storeName, sid } = this.props;
    const { isUpdating, isCreating } = this;
    if (!storeName) {
      throw Error('Please pass storeName prop');
    } else if (isUpdating) {
      fireDataAction(dataActions.update, data, storeName, sid);
    } else if (isCreating) {
      fireDataAction(dataActions.create, data, storeName, sid);
    } else {
      throw Error('Please pass either `isUpdating` or `isCreating` prop');
    }
  };

  render(): JSX.Element {
    const { props, submitHandler, isCreating, isUpdating } = this;
    const {
      sid,
      isLoading,
      location: { state = {} }
    } = props;
    return (
      <>
        <Row>
          <Spinner isLoading={isLoading} hasOverlay psid={sid} />
          <Col xs="12">
            <Form
              dataRef={[
                {
                  storeName: resourcesList.Branch
                }
              ]}
              dataMapper={(data: any): any => ({
                ...responseMapper(data, resourcesList.Branch)
              })}
              onSubmitHandler={submitHandler}
              formData={state.item}
              isCreating={isCreating}
              isUpdating={isUpdating}
              withModal
              psid={props.sid}
              storeName={resourcesList.Branch}
              schema={branchSchema.form}
              title={isUpdating ? 'update.branch.title' : 'create.branch.title'}
            />
          </Col>
        </Row>
      </>
    );
  }
}

// @ts-ignore
Component.defaultProps = {
  isCreating: true,
  isUpdating: false,
  sid: 'BranchCreateRoute',
  permissions: {
    canCreateNew: true
  }
};

export default Component;
