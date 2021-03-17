import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from 'reactstrap';
import {
  AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler
} from '@coreui/react';
import AuthService from 'utils/auth';
import logo from 'assets/img/brand/logo.jpg';
import sygnet from 'assets/img/brand/logo-img.jpg';
import { ToggleDirection } from 'components';

const handlersList = {
  Logout: () => {
    AuthService.removeToken();
    window.location.reload();
  }
};

class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.HandleDropDownItem = this.HandleDropDownItem.bind(this);
    this.DropDownList = this.DropDownList.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  onClickHandler(handlerName) {
    if (handlersList[handlerName]) {
      return handlersList[handlerName];
    }
    return null;
  }

  DropDownList = ({ listConfig }) => {
    const { HandleDropDownItem } = this;
    const { menuItems, icon, badge } = listConfig;
    const dummyData = { badgeName: '42' };
    const logoSrc = 'assets/img/avatars/account-logo.png';
    return (
      <UncontrolledDropdown nav direction="down">
        <DropdownToggle nav>
          {!logo ? (
            <>
              {!icon ? null : <i className={icon} />}
              {!badge ? null : (
                <Badge color={badge.variant}>{dummyData.badgeName}</Badge>
              )}
            </>
          ) : (
            <img src={logoSrc} className="img-avatar" alt="" />
          )}
        </DropdownToggle>
        <DropdownMenu right>
          {!menuItems
            ? null
            : menuItems.map((item, index) => (
                <HandleDropDownItem key={index} item={item} />
              ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  HandleDropDownItem = ({ item }) => {
    const { type, name, url, icon, badge } = item;
    const dummyData = { badgeName: '42' };
    switch (type) {
      case 'item':
        return (
          <DropdownItem tag="div">
            {!icon ? null : <i className={icon} />}
            {!url ? (
              name
            ) : (
              <Link onClick={this.onClickHandler(name)} to={url} as="div">
                {name}
              </Link>
            )}
            {!badge ? null : (
              <Badge color={badge.variant}>{dummyData.badgeName}</Badge>
            )}
          </DropdownItem>
        );
      case 'header':
        return (
          <DropdownItem header tag="div" className="text-center">
            <strong>{name}</strong>
          </DropdownItem>
        );
      case 'divider':
        return <DropdownItem divider />;
      default:
        return null;
    }
  };

  render() {
    const { DropDownList } = this;
    const { mainConfig, config } = this.props;
    const { hasSidebar, hasAside } = mainConfig;
    const { primaryMenu, secondaryMenu } = config;

    const HandleMenuItem = ({ item }) => {
      const { type, name, url } = item;
      switch (type) {
        case 'LogoNavItem':
          return <DropDownList logo listConfig={item} />;
        case 'NavItem':
          return (
            <NavItem className="d-md-down-none">
              <NavLink
                to={url}
                className="nav-link"
                style={{ margin: '0 5px' }}
              >
                {name}
              </NavLink>
            </NavItem>
          );
        case 'StyledNavItem':
          return (
            <>
              <DropDownList listConfig={item} />
            </>
          );
        default:
          return null;
      }
    };

    const HandleMenu = ({ menuItems }) =>
      menuItems.map(item => <HandleMenuItem key={item.index} item={item} />);

    return (
      <>
        <AppNavbarBrand
          full={{ src: logo, height: 30, alt: 'app logo' }}
          minimized={{ src: sygnet, height: 30, alt: 'app logo' }}
        />
        {!hasSidebar ? null : (
          <>
            <AppSidebarToggler className="d-md-down-none" display="lg" />
            <AppSidebarToggler className="d-lg-none" display="md" mobile />
          </>
        )}
        <Nav className="d-md-down-none" navbar>
          <HandleMenu menuItems={primaryMenu} />
        </Nav>
        <Nav className="ml-auto" navbar>
          <HandleMenu menuItems={secondaryMenu} />
        </Nav>
        <ToggleDirection />
        {!hasAside ? null : (
          <>
            <AppAsideToggler className="d-md-down-none" />
            <AppAsideToggler className="d-lg-none" mobile />
          </>
        )}
      </>
    );
  }
}
export default DefaultHeader;
