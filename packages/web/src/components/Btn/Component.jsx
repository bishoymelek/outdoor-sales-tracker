import React from 'react';
import { Button } from 'reactstrap';

function Component({
  variant = 'primary',
  label = 'Untitled',
  onClickHandler
}) {
  return (
    <Button color={variant} onClick={onClickHandler}>
      {label}
    </Button>
  );
}

export default Component;
