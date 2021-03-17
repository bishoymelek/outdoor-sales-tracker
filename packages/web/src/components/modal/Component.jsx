import React from 'react';
import {
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
  Button
} from 'reactstrap';
import i18next from 'i18next';

const CustomFooter = ({ footerCustomBtnList }) => (
  <>
    {footerCustomBtnList && footerCustomBtnList.length
      ? // @ts-ignore
        footerCustomBtnList.map(one => {
          if (
            typeof one.btn === 'string' &&
            typeof one.handler === 'function'
          ) {
            return (
              <Col>
                <Button
                  variant={one.variant}
                  label={i18next.t(one.label)}
                  onClick={one.handler}
                />
              </Col>
            );
          }
          return <></>;
        })
      : null}
  </>
);

function Component(props) {
  const {
    children,
    onClickCloseModal,
    isModalOpen,
    outlineVariant,
    classNames,
    footerCustomBtnList,
    title
  } = props;
  return (
    <>
      {isModalOpen ? (
        <div id="modal-overlay">
          <Card className={outlineVariant && `modal-card ${classNames}`}>
            <CardHeader>
              {title ? <span>{i18next.t(title)}</span> : null}
              <div className="card-header-actions">
                <button
                  type="submit"
                  className="card-header-action btn btn-close"
                  onClick={onClickCloseModal}
                >
                  <i className="icon-close" />
                </button>
              </div>
            </CardHeader>
            <CardBody>{children}</CardBody>
            {footerCustomBtnList ? (
              <CardFooter>
                <Row>
                  <CustomFooter footerCustomBtnList={footerCustomBtnList} />
                </Row>
              </CardFooter>
            ) : null}
          </Card>
        </div>
      ) : null}
    </>
  );
}

export default Component;
