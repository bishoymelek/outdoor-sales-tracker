/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import i18next from 'i18next';
import { Card } from 'components';

export function ListingHOC(WrappedComponent: any): any {
  return class extends Component<any, any> {
    constructor(props: any) {
      super(props);
    }

    render(): JSX.Element {
      const { hasCreateNewBtn = true, createNewBtn } = this.props;
      return (
        <Card header={{ title: 'category.list.title' }}>
          <Row className="flex-row-reverse pb-4">
            <Col className="col-auto">
              {hasCreateNewBtn && createNewBtn ? (
                <Button onClick={createNewBtn.onClickHandler}>
                  <i className="fa icon-plus" />
                  {i18next.t('create.new.btn')}
                </Button>
              ) : null}
            </Col>
          </Row>
          <WrappedComponent {...this.props} />
        </Card>
      );
    }
  };
}
export default ListingHOC;
