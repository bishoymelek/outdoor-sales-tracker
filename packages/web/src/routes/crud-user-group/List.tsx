import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import i18next from 'i18next';
import { dataActions } from 'react-state';
import Table from 'components/synthesized-table';
import { userGroupListConfig } from 'configuration/cms-config';
import resourcesList from 'store-config/resourcesList.json';
import WidgetContainer from 'components/WidgetContainer';
import history from 'utils/history';
import { handleDeleteItem, getListWithCityOrBranchId } from 'utils/api';
import { deleteItemActionList } from 'store-config/deleteItemVmUtil';
import DeleteModal from 'components/DeleteModal';

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
      resourcesList.UserGroup,
      sid
    );
    fireAction(deleteItemActionList.confirmDeletingItem);
  }

  render(): JSX.Element {
    const { props } = this;
    const { sid, isModalOpen, fireAction } = props;
    const { hasCreateNewBtn } = props.permissions;
    const { createNewBtn, ...restTableProps } = userGroupListConfig.tableWidget;
    return (
      <WidgetContainer header={{ title: 'userGroup.list.title' }}>
        <DeleteModal
          isDeleteModalOpen={isModalOpen}
          onClickHandler={this.confirmDeleteItem}
          onClickCloseModal={this.onClickCloseModal}
        />
        <Row className="pb-4 flex-row-reverse">
          <Col className="col-auto">
            {hasCreateNewBtn && createNewBtn ? (
              <Button onClick={createNewBtn.onClickHandler}>
                <i className="fa icon-plus" />
                {i18next.t('create.new.btn')}
              </Button>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Table
              customFieldProps={{
                update: {
                  onClickHandler: (cell: any): void => {
                    history.push('/user-group/update', {
                      item: cell,
                      isUpdating: true
                    });
                  },
                  variant: 'warning'
                },
                delete: {
                  onClickHandler: (cell: any): void => {
                    fireAction(deleteItemActionList.openDeletingModal, cell);
                  }
                }
              }}
              {...restTableProps}
              psid={sid}
            />
          </Col>
        </Row>
      </WidgetContainer>
    );
  }
}

// @ts-ignore
Component.defaultProps = {
  sid: 'userGroupListingRoute',
  permissions: {
    hasCreateNewBtn: true,
    depend: ['Table']
  }
};

export default Component;
