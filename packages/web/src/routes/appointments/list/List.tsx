import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import i18next from 'i18next';
import { dataActions } from 'react-state';
import { userListConfig } from 'configuration/cms-config';
import resourcesList from 'store-config/resourcesList.json';
import WidgetContainer from 'components/WidgetContainer';
import { handleDeleteItem, getListWithCityOrBranchId } from 'utils/api';
import { deleteItemActionList } from 'store-config/deleteItemVmUtil';
import DeleteModal from 'components/DeleteModal';
import Calendar from 'components/Calendar';

class Component extends React.Component<any, {}> {
  constructor(props: object) {
    super(props);
    this.state = {};
    this.confirmDeleteItem = this.confirmDeleteItem.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
  }

  componentDidUpdate(): void {
    getListWithCityOrBranchId({
      ...this.props,
      storeName: resourcesList.User
    });
    handleDeleteItem(this.props);
  }

  onClickCloseModal(): void {
    const { fireAction } = this.props;
    fireAction(deleteItemActionList.closeModalClearState);
  }

  confirmDeleteItem(): void {
    const { fireDataAction, fireAction, sid, itemToDelete } = this.props;
    fireDataAction(
      dataActions.deleteOne,
      itemToDelete,
      resourcesList.User,
      sid
    );
    fireAction(deleteItemActionList.confirmDeletingItem);
  }

  render(): JSX.Element {
    const { createNewBtn, ...restTableProps } = userListConfig.tableWidget;

    const { sid, fireAction, isModalOpen, permissions } = this.props;
    const { canCreateNewItem } = permissions;

    return (
      <WidgetContainer header={{ title: 'user.list.title' }}>
        <DeleteModal
          isDeleteModalOpen={isModalOpen}
          onClickHandler={this.confirmDeleteItem}
          onClickCloseModal={this.onClickCloseModal}
        />
        <Row className="pb-4 flex-row-reverse">
          <Col className="col-auto">
            {canCreateNewItem && createNewBtn ? (
              <Button onClick={createNewBtn.onClickHandler}>
                <i className="fa icon-plus" />
                {i18next.t('create.new.btn')}
              </Button>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Calendar />
          </Col>
        </Row>
      </WidgetContainer>
    );
  }
}

// @ts-ignore
Component.defaultProps = {
  sid: 'AppointmentsListingRoute',
  permissions: {
    canCreateNewItem: false
  }
};

export default Component;
