import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      inputValue: ''
    };
    this.handleChangeSelected = this.handleChangeSelected.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  handleChangeSelected(e) {
    const { handler } = this.props;
    const { id, name } = e.target.dataset;
    if (!id) {
      return this.resetSelected(handler);
    }
    this.setState(prevState => ({
      ...prevState,
      selected: { id, name }
    }));
    return handler && handler({ id, name });
  }

  handleChangeSearch(e) {
    this.setState({ inputValue: e.target.value.toLowerCase().trim() });
  }

  resetSelected(handler) {
    this.setState(prevState => ({
      ...prevState,
      selected: {}
    }));
    handler({});
  }

  renderList(inputValue) {
    const { list } = this.props;
    if (inputValue) {
      return list
        .filter(one => one.name.toLowerCase().includes(inputValue))
        .map(({ name, id }) => (
          <DropdownItem
            key={id}
            data-id={id}
            data-name={name}
            onClick={this.handleChangeSelected}
          >
            {name}
          </DropdownItem>
        ));
    }
    return list.map(({ name, id }) => (
      <DropdownItem
        key={id}
        data-id={id}
        data-name={name}
        onClick={this.handleChangeSelected}
      >
        {name}
      </DropdownItem>
    ));
  }

  render() {
    const { inputValue, selected } = this.state;
    const {
      CustomButton,
      isListOpen,
      fireAction,
      name,
      value,
      clearOption,
      list = []
    } = this.props;
    return (
      <>
        <Dropdown
          name={name}
          value={selected.name ? selected.name : value}
          isOpen={isListOpen}
          toggle={() => fireAction('toggle_list')}
        >
          <DropdownToggle
            tag={internalProps => (
              <CustomButton list={list} {...internalProps} />
            )}
          />
          <DropdownMenu
            modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: data => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: 'auto',
                      maxHeight: 200
                    }
                  };
                }
              }
            }}
          >
            {(() => {
              if (list.length) {
                return (
                  <>
                    {clearOption && clearOption.label ? (
                      <DropdownItem
                        data-id={null}
                        data-name={null}
                        onClick={this.handleChangeSelected}
                      >
                        {clearOption.label}
                      </DropdownItem>
                    ) : null}
                    {this.renderList(inputValue)}
                  </>
                );
              }
              return null;
            })()}
          </DropdownMenu>
        </Dropdown>
      </>
    );
  }
}

const listItemProps = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string
});

DropDown.propTypes = {
  list: PropTypes.arrayOf(listItemProps),
  sid: PropTypes.string,
  permissions: PropTypes.shape({
    canSelect: PropTypes.bool,
    canSearch: PropTypes.bool
  })
};

DropDown.defaultProps = {
  list: [],
  sid: 'customTagDropdown',
  permissions: {
    canSelect: true
  }
};

export default DropDown;
