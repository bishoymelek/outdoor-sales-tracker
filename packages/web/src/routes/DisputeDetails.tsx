import React from 'react';
import { Col, Row } from 'reactstrap';
import { SynthesizedSpinner } from 'components';
import { mapLoadingProp } from 'utils/data-mappers';

class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render(): JSX.Element {
    const { props } = this;
    const { sid, resources } = props;
    return (
      <>
        <Row>
          <SynthesizedSpinner
            dataRef={resources}
            dataMapper={(data: any): synthesizedSpinnerTypes => ({
              isLoading: mapLoadingProp(data)
            })}
            hasOverlay
            psid={sid}
          />
          <Col xs="12" />
        </Row>
      </>
    );
  }
}

// @ts-ignore
Component.defaultProps = {
  sid: 'DisputeDetailsRoute',
  permissions: {
    canCreateNew: true
  }
};

export default Component;
