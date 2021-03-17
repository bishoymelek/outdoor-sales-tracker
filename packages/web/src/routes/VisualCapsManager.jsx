/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { Col, Row, Input, Button } from 'reactstrap';
import { dataActions } from 'react-state';
import * as RoutesList from 'routes';
import { SynthesizedDropdown, Card } from 'components';
import { visualCapsConfig } from 'configuration/widgets-config';
import resourcesList from 'store-config/resourcesList.json';
import i18next from 'i18next';
import { modalActionList } from 'store-config/vm-stores/modalVmUtil';
import Modal from 'components/ConfirmModal';
import { VisualCapsManager } from 'utils/VisualCapsManager';
import { visualCapsRouteState } from 'store-config/vm-stores/index';
class VisualCapabilities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visualLabels: {
        branchCreateRoute: {
          label: 'Create Branch',
          showListingWidget: {
            label: 'Show Table'
          },
          depend: {
            Table: {
              label: 'Employees List',
              showPagination: {
                label: 'Show Pagination'
              },
              showSizePerPageOption: {
                label: 'Show size per page'
              },
              showSearchBar: {
                label: 'Can search'
              },
              showExportCsv: {
                label: 'Can Export CSV'
              }
            }
          }
        },
        branchListingRoute: {
          label: 'Branch List',
          showListingWidget: {
            label: 'Show Table'
          },
          canCreateNew: {
            label: 'Create Form'
          },
          depend: {
            Table: {
              label: 'Products List',
              showPagination: {
                label: 'Show Pagination'
              },
              showSizePerPageOption: {
                label: 'Show size per page'
              },
              showSearchBar: {
                label: 'Can search'
              },
              showExportCsv: {
                label: 'Can Export CSV'
              }
            }
          }
        }
      }
    };
    this.confirmExportingVCaps = this.confirmExportingVCaps.bind(this);
    this.handleItem = this.handleItem.bind(this);
    this.handleRenderingListItem = this.handleRenderingListItem.bind(this);
    this.handleRenderingWholeList = this.handleRenderingWholeList.bind(this);
    this.handleChangeSelectedRole = this.handleChangeSelectedRole.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
  }

  async componentDidMount() {
    const { fireAction, sid } = this.props;
    const portalManager = new VisualCapsManager(RoutesList);
    const permissionsList = await portalManager.collectVisualPermissions();
    fireAction(
      visualCapsRouteState.actions.updateOptionsList,
      { optionsList: permissionsList },
      sid
    );
  }

  componentDidUpdate() {
    const {
      userGroupPermissionsList,
      optionsValuesIsUpdated,
      fireAction
    } = this.props;
    if (!optionsValuesIsUpdated && userGroupPermissionsList) {
      fireAction(
        visualCapsRouteState.actions.onChangeOptionValue,
        userGroupPermissionsList
      );
      fireAction(
        visualCapsRouteState.actions.toggleOptionsValuesIsUpdated,
        true
      );
    }
  }

  onClickCloseModal() {
    const { fireAction } = this.props;
    fireAction(modalActionList.closeModalClearState);
  }

  handleItem(e) {
    const {
      props: { optionsList, optionsValues, fireAction }
    } = this;
    const resultedVisualCaps = JSON.parse(
      JSON.stringify(optionsValues || optionsList)
    );
    const isChecked = e.target.checked;
    const { route, widget, option } = e.target.dataset;
    if (widget && resultedVisualCaps[route].depend[widget]) {
      resultedVisualCaps[route].depend[widget][option] = isChecked;
    } else {
      resultedVisualCaps[route]
        ? (resultedVisualCaps[route][option] = isChecked)
        : (resultedVisualCaps[route] = { [option]: isChecked });
    }
    fireAction(
      visualCapsRouteState.actionsonChangeOptionValue,
      resultedVisualCaps
    );
  }

  handleChangeSelectedRole(item) {
    const { fireAction, fireDataAction, sid } = this.props;
    if (item && item.id) {
      fireAction(visualCapsRouteState.actionsonChangeUserGroup, item);
      fireAction(
        visualCapsRouteState.actionstoggleOptionsValuesIsUpdated,
        false
      );
      fireDataAction(
        dataActions.getOne,
        { id: item.id },
        resourcesList.UserGroup,
        sid,
        1
      );
    } else {
      console.error(`no user group was provided`);
    }
  }

  handleRenderingWholeList(listKey, list, dependId = null) {
    if (list) {
      const { optionsValues = {} } = this.props;
      return (
        <Row className="mt-3 md-3">
          {listKey ? (
            <Col xs={6} sm={4} key={listKey}>
              {this.handleRenderingListItem(
                `showRoute`,
                optionsValues[listKey] && optionsValues[listKey].showRoute,
                listKey,
                dependId
              )}
            </Col>
          ) : null}
          {Object.entries(list).map(([optionKey, optionData]) => {
            if (optionKey !== 'depend') {
              return (
                <Col xs={6} sm={4} key={optionKey}>
                  {this.handleRenderingListItem(
                    optionKey,
                    optionsValues[listKey] && optionsValues[listKey][optionKey],
                    listKey,
                    dependId
                  )}
                </Col>
              );
            }
            return (
              <Col xs={12}>
                {Object.entries(optionData).map(
                  // eslint-disable-next-line no-return-assign
                  ([dependKey, dependOptionData]) => (
                    // eslint-disable-next-line no-return-assign
                    <Row className="ml-3 mt-3">
                      <Col xs={12}>
                        <h3 className="text-primary">{dependKey}</h3>
                      </Col>
                      <Col>
                        {this.handleRenderingWholeList(
                          listKey,
                          dependOptionData,
                          // eslint-disable-next-line no-param-reassign
                          (dependId = dependKey)
                        )}
                      </Col>
                    </Row>
                  )
                )}
              </Col>
            );
          })}
        </Row>
      );
    }
    return null;
  }

  handleRenderingListItem(option, value = true, routeId, widgetId = null) {
    const { visualLabels } = this.state;
    return (
      <Row>
        <Col xs="auto">
          <Input
            onChange={e => this.handleItem(e)}
            data-route={routeId}
            data-option={option}
            data-widget={widgetId}
            type="checkbox"
            checked={value}
          />
        </Col>
        <Col>
          {widgetId &&
          visualLabels[routeId] &&
          visualLabels[routeId].depend &&
          visualLabels[routeId].depend[widgetId] &&
          visualLabels[routeId].depend[widgetId][option] &&
          visualLabels[routeId].depend[widgetId][option].label
            ? visualLabels[routeId].depend[widgetId][option].label
            : option}
        </Col>
      </Row>
    );
  }

  confirmExportingVCaps() {
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
      fireAction(modalActionList.confirmDeletingItem);
    }
  }

  render() {
    const {
      state,
      props: { userGroupList, sid, optionsList, isModalOpen, fireAction },
      confirmExportingVCaps,
      handleRenderingWholeList,
      handleChangeSelectedRole
    } = this;
    const { visualLabels } = state;
    const vCaps = optionsList || {};
    return (
      <Card header={{ title: i18next.t('visualCaps.list.title') }}>
        <Modal
          confirmMsg="confirm.saving.vcaps"
          isModalOpen={isModalOpen}
          onClickHandler={confirmExportingVCaps}
          onClickCloseModal={this.onClickCloseModal}
        />
        <Row>
          <Col>
            <SynthesizedDropdown
              psid={sid}
              permissions={{ canSelect: true }}
              label={i18next.t('role.title')}
              handler={handleChangeSelectedRole}
              {...visualCapsConfig.userGroupDropDown}
              list={userGroupList}
            />
          </Col>
          <Col>
            <Button
              variant="warning"
              onClick={fireAction.bind(this, modalActionList.openModal)}
              label={i18next.t('save.title')}
            />
          </Col>
        </Row>
        <section id="v-caps-wrapper">
          {Object.entries(vCaps).length
            ? Object.entries(vCaps).map(([routeKey, routeData]) => {
                return (
                  <Row className="mt-5" key={routeKey}>
                    <Col xs={12}>
                      <h3 className="text-primary">
                        {visualLabels[routeKey] && visualLabels[routeKey].label
                          ? `Route - ${visualLabels[routeKey].label}`
                          : `Route - ${routeKey}`}
                      </h3>
                    </Col>
                    <Col>{handleRenderingWholeList(routeKey, routeData)}</Col>
                  </Row>
                );
              })
            : null}
        </section>
      </Card>
    );
  }
}

VisualCapabilities.defaultProps = {
  sid: 'visualCaps'
};
export default VisualCapabilities;
