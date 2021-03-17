import React from 'react';
import Form from 'components/Form';
import Card from 'components/Card';

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
