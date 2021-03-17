import React from 'react';
// eslint-disable-next-line import/no-cycle
import { Form, Card } from '..';

function FormWrapper(props) {
  const { withModal, title, ...restProps } = props;
  if (withModal) {
    return (
      <Card header={{ title }}>
        <Form {...restProps} />
      </Card>
    );
  }
  return <Form {...restProps} />;
}

FormWrapper.defaultProps = {
  sid: 'FormWrapper',
  permissions: {
    hasBulkBtn: true
  }
};

export default FormWrapper;
