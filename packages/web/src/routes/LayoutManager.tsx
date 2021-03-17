/* eslint-disable no-restricted-globals */
import React from 'react';
import { SchemaEditor, Modal } from 'components';
import resourcesList from 'store-config/resourcesList.json';
import { modalActionList } from 'store-config/vm-stores/modalVmUtil';
import { dataActions } from 'react-state';
import { dmStoreResponseMapper } from 'utils/api';

class LayoutManager extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.confirmSaveLayoutConfig = this.confirmSaveLayoutConfig.bind(this);
  }

  onClickCloseModal() {
    const { fireAction } = this.props;
    fireAction(modalActionList.closeModalClearState);
  }

  confirmSaveLayoutConfig() {
    const {
      fireDataAction,
      fireAction,
      sid,
      selectedGroupId,
      optionsValues
    } = this.props;
    if (selectedGroupId && optionsValues) {
      fireDataAction(
        dataActions.update,
        {
          _id: selectedGroupId,
          permissions: JSON.stringify(optionsValues)
        },
        resourcesList.UserGroup,
        sid
      );
      fireAction(modalActionList);
    }
  }

  render(): JSX.Element {
    const { sid, isModalOpen } = this.props;

    return (
      <>
        <Modal
          confirmMsg="confirm.saving.vcaps"
          isModalOpen={isModalOpen}
          onClickHandler={this.confirmSaveLayoutConfig}
          onClickCloseModal={this.onClickCloseModal}
        />
        <SchemaEditor
          storeName={resourcesList.App}
          psid={sid}
          title="layout.config.title"
          dataMapper={(state: any): any => ({
            ...dmStoreResponseMapper(
              state[`${resourcesList.App}_0`],
              resourcesList.App
            ),
            obj: dmStoreResponseMapper(
              state[`${resourcesList.App}_0`],
              resourcesList.App
            ).data
          })}
          dataRef={[
            {
              storeName: resourcesList.App
            }
          ]}
        />
      </>
    );
  }
}

// @ts-ignore
LayoutManager.defaultProps = {
  sid: 'layoutManager'
};

export default LayoutManager;
