import React from 'react';
import i18next from 'i18next';
import { Row, Col, Button } from 'reactstrap';
import { Modal } from 'components';

/**
 * A generic Modal(Delete) to confirm deleting a selected record
 */
function DeleteModal({
  isDeleteModalOpen = false,
  onClickHandler,
  onClickCloseModal,
  children,
  outlineVariant
}: {
  isDeleteModalOpen: boolean;
  onClickHandler: any;
  onClickCloseModal: any;
  children?: any;
  outlineVariant?: string;
}): JSX.Element {
  return (
    <>
      <Modal
        isModalOpen={isDeleteModalOpen}
        title="delete.item.confirm.title"
        onClickCloseModal={onClickCloseModal}
        outlineVariant={outlineVariant}
      >
        <>
          <h5>{i18next.t('delete.item.confirm.message')}</h5>
          {children || (
            <Row className="pt-3">
              <Col>
                <Button onClick={onClickHandler} color="danger">
                  {i18next.t('delete.title')}
                </Button>
              </Col>
              <Col>
                <Button onClick={onClickCloseModal}>
                  {i18next.t('cancel.title')}
                </Button>
              </Col>
            </Row>
          )}
        </>
      </Modal>
    </>
  );
}
export default DeleteModal;
