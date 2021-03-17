import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import Pagination from 'react-js-pagination';
import BootstrapTable from 'react-bootstrap-table-next';
import { dataActions } from 'react-state';
import i18next from 'i18next';
import { SynthesizedSpinner } from 'components';
import { schemaFactory } from './utils';

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      activePageUpdated: false
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidUpdate() {
    const { activePage, activePageUpdated } = this.state;
    if (activePage && activePageUpdated) {
      this.setState(prevState => ({
        ...prevState,
        activePageUpdated: false
      }));
      const {
        fireDataAction,
        psid,
        storeName,
        actionCriteria,
        customDmAction
      } = this.props;
      fireDataAction(
        customDmAction?.type || dataActions.getMultiple,
        { activePage, ...actionCriteria },
        storeName,
        psid,
        customDmAction?.index || 0
      );
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber, activePageUpdated: true });
  }

  render() {
    const schema = schemaFactory({
      schema: this.props.schema,
      customFieldProps: this.props.customFieldProps
    });
    const {
      props,
      state: { activePage }
    } = this;
    const {
      hover = true,
      rowEvents,
      sid,
      isLoading,
      storeName,
      striped = false,
      data = [],
      totalPageCount,
      createNewBtn,
      permissions: { hasCreateNewBtn }
    } = props;
    if (isLoading) {
      return <SynthesizedSpinner isLoading={isLoading} hasOverlay psid={sid} />;
    }
    return (
      <div className={`${storeName}-list widget`}>
        {data && data.length ? (
          <>
            {createNewBtn && hasCreateNewBtn ? (
              <Row className="pb-3 flex-row-reverse">
                <Col xs="auto">
                  <Button color="primary" onClick={createNewBtn.onClickHandler}>
                    <i
                      tabIndex={0}
                      onKeyPress={createNewBtn.onClickHandler}
                      role="button"
                      className="icon-plus pr-1"
                    />
                    {i18next.t(createNewBtn.label)}
                  </Button>
                </Col>
              </Row>
            ) : null}
            <BootstrapTable
              rowEvents={rowEvents || null}
              striped={striped}
              bordered={false}
              hover={hover}
              data={data}
              {...schema}
            />
            <Pagination
              hideNavigation
              activePage={activePage}
              itemsCountPerPage={5}
              itemClass="page-item"
              linkClass="page-link"
              totalItemsCount={totalPageCount}
              onChange={this.handlePageChange}
            />
          </>
        ) : (
          <Row className="pt-5">
            <Col>
              <h3>{i18next.t('empty.list.title')}</h3>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

TableComponent.defaultProps = {
  sid: 'table',
  isLoading: false,
  createNewBtn: { title: '', isVisible: false },
  data: [],
  schema: {},
  t: Function,
  storeName: 'customStoreName',
  striped: false,
  permissions: {
    hasCreateNewBtn: false
  },
  totalPageCount: 1
};

export default TableComponent;
