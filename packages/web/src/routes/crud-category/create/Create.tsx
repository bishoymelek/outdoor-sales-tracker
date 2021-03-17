import React from 'react';
import { Col, Row } from 'reactstrap';
import { dataActions } from 'react-state';
import WidgetContainer from 'components/WidgetContainer';
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
    const { fireDataAction, storeName, sid, psid } = this.props;
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
      updatedItem,
      sid,
      isLoading,
      location: { state = {} }
    } = props;
    return (
      <>
        <Row>
          <Spinner isLoading={isLoading} hasOverlay psid={sid} />
          <Col xs="12">
            <WidgetContainer
              header={{
                title: isUpdating
                  ? 'update.category.title'
                  : 'create.category.title'
              }}
            >
              <Form
                dataRef={[
                  {
                    storeName: resourcesList.Category
                  }
                ]}
                dataMapper={(data: any): any => ({
                  ...responseMapper(data, resourcesList.Category)
                })}
                onSubmitHandler={submitHandler}
                formData={updatedItem || state.item}
                isCreating={isCreating}
                isUpdating={isUpdating}
                psid={props.sid}
                storeName={resourcesList.Category}
                schema={{
                  core: [
                    {
                      id: 'categoryName',
                      label: 'name.ar.title',
                      type: 'text',
                      validationType: 'string',
                      validations: [
                        {
                          type: 'required',
                          params: ['validation.required.title']
                        }
                      ]
                    },
                    {
                      id: 'categoryCode',
                      label: 'code.title',
                      type: 'text',
                      inputType: 'number',
                      validationType: 'number',
                      validations: [
                        {
                          type: 'required',
                          params: ['validation.required.title']
                        }
                      ]
                    },
                    {
                      id: 'img',
                      label: 'image.title',
                      type: 'text',
                      inputType: 'text',
                      validationType: 'string',
                      validations: [
                        {
                          type: 'required',
                          params: ['validation.required.title']
                        }
                      ]
                    }
                  ],
                  ui: [
                    {
                      categoryName: {
                        label: {
                          xs: 12
                        },
                        input: {
                          xs: 12
                        }
                      },
                      categoryCode: {
                        label: {
                          xs: 12
                        },
                        input: {
                          xs: 12
                        }
                      }
                    },
                    {
                      img: {
                        label: {
                          xs: 12
                        },
                        input: {
                          xs: 12
                        }
                      }
                    }
                  ]
                }}
              />
            </WidgetContainer>
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
  sid: 'CategoryCreateRoute',
  permissions: {
    canCreateNew: true
  }
};

export default Component;
