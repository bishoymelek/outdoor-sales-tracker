import React from 'react';
import { Col, Row } from 'reactstrap';
import { categoryListConfig } from 'configuration/cms-config';
import ListingComponent from 'components/hoc-listing';

class Component extends React.Component<any, {}> {
  constructor(props: object) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(): void {}

  render(): JSX.Element {
    const { props } = this;
    const { showListingWidget } = props.permissions;
    const { sid } = this.props;
    return (
      <>
        <Row>
          {showListingWidget && (
            <Col xs="12">
              <ListingComponent
                {...categoryListConfig.tableWidget}
                psid={sid}
              />
            </Col>
          )}
        </Row>
      </>
    );
  }
}

// @ts-ignore
Component.defaultProps = {
  sid: 'categoryListingRoute',
  permissions: {
    showListingWidget: true,
    depend: ['Table']
  }
};

export default Component;
