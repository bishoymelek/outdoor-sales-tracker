import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        ...props.initialSelectedItem
      },
      inputValue: ''
    };
    this.handleChangeSelected = this.handleChangeSelected.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value && !this.props.value) {
      this.resetSelected();
    }
  }

  resetSelected(handler) {
    this.setState(prevState => ({
      ...prevState,
      selected: {}
    }));
    if (handler) {
      handler({});
    }
  }

  handleChangeSelected(e) {
    try {
      const { handler } = this.props;
      const { id, name } = e.target.dataset;
      if (!id) {
        return this.resetSelected(handler);
      }
      this.setState(prevState => ({
        ...prevState,
        selected: { id, name }
      }));
      handler && handler({ id, name });
    } catch (error) {
      console.error(error);
    }
  }

  handleChangeSearch(e) {
    this.setState({ inputValue: e.target.value.toLowerCase().trim() });
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
      isListOpen,
      fireAction,
      name,
      color = 'secondary',
      value,
      clearOption,
      label = 'Untitled',
      permissions: { canSearch = true, canSelect },
      list = [],
      ...rest
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
            color={color}
            onBlur={rest.onBlur}
            onClick={rest.onClick}
            // className="main-btn"
            caret
            disabled={!canSelect}
          >
            {selected.name ? selected.name : value || label}
          </DropdownToggle>
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
            {canSearch && (
              <Input
                type="text"
                id="name"
                placeholder="Search"
                onChange={this.handleChangeSearch}
                value={inputValue}
              />
            )}
            {list.length ? (
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
            ) : null}
          </DropdownMenu>
        </Dropdown>
      </>
    );
  }
}

const listItemProps = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.any
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
  sid: 'dropdown',
  permissions: {
    canSelect: false,
    canSearch: true
  }
};

export default DropDown;
