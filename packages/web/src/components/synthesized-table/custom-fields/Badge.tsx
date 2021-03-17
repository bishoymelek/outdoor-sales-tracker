import React from 'react';

function CustomTableField(props: any): any {
  const { CustomComponent, value } = props;
  if (CustomComponent && typeof CustomComponent == 'function') {
    return CustomComponent({ value });
  }
  return <></>;
}

export default CustomTableField;
