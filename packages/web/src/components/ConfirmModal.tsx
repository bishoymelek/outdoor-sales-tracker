import React from 'react';
import i18next from 'i18next';
import { Row, Col, Button } from 'reactstrap';
import { Modal } from '.';

function ConfirmModal(props: any): JSX.Element {
  const { confirmMsg, isModalOpen, onClickHandler, onClickCloseModal } = props;
  return (
    <>
      {isModalOpen ? (
        <Modal title={confirmMsg}>
          <h5>{i18next.t(confirmMsg)}</h5>
          <Row className="pt-3">
            <Col>
              <Button color="warning" onClick={onClickHandler}>
                {i18next.t('confirm.title')}
              </Button>
            </Col>
            <Col>
              <Button onClick={onClickCloseModal}>
                {i18next.t('cancel.title')}
              </Button>
            </Col>
          </Row>
        </Modal>
      ) : null}
    </>
  );
}
export { ConfirmModal };
export default ConfirmModal;
