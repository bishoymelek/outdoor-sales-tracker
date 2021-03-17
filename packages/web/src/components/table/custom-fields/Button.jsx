import React from 'react';
import { Button } from 'reactstrap';
import i18next from 'i18next';

function Component(props) {
  const { variant = 'primary', text, onClickHandler } = props;
  return (
    <Button color={variant} onClick={onClickHandler}>
      {i18next.t(text)}
    </Button>
  );
}

export default Component;
