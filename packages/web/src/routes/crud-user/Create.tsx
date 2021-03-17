import React from 'react';
import { Col, Row } from 'reactstrap';
import { dataActions } from 'react-state';
import { userSchema } from 'configuration/schemas/user-schema';
import Spinner from 'components/synthesized-spinner';
import Form from 'components/synthesized-form';
import resourcesList from 'store-config/resourcesList.json';
import { responseMapper } from 'utils/api';

class Component extends React.Component<any, any> {
  isUpdating: any;

  isCreating: any;

  constructor(props: any) {
    super(props);
    this.state = {};
    this.submitHandler = this.submitHandler.bind(this);
    this.isCreating = props?.location?.state?.isCreating || props.isCreating;
    this.isUpdating =
      props?.location?.state?.isUpdating || props.isUpdating || false;
    props.fireDataAction(
      dataActions.getMultiple,
      {},
      resourcesList.UserGroup,
      props.sid
    );
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
                  storeName: resourcesList.User
                }
              ]}
              dataMapper={(data: any): any => ({
                ...responseMapper(data, resourcesList.User)
              })}
              onSubmitHandler={submitHandler}
              formData={state?.item}
              isCreating={isCreating}
              isUpdating={isUpdating}
              fieldsMapper={(value: any): any => {
                console.log(value);

                return value.length
                  ? value.map((item: any): any => ({
                      ...item,
                      groups: item.groups ? item.groups : undefined
                    }))
                  : null;
              }}
              withModal
              psid={props.sid}
              storeName={resourcesList.User}
              schema={userSchema.form}
              title="user.create.title"
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
  sid: 'UserCreateRoute',
  permissions: {
    canCreateNew: true
  }
};

export default Component;
