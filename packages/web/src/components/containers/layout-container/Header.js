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
import logo from 'assets/img/brand/logo.jpg';
import sygnet from 'assets/img/brand/logo-img.jpg';
import i18next from 'i18next';
import resourcesList from 'store-config/resourcesList.json';
import { customLookupListMapper } from 'utils/data-mappers';
import { dataActions } from 'react-state';
import { ToggleDirection, CustomTagDropdown } from 'components';

class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.HandleDropDownItem = this.HandleDropDownItem.bind(this);
    this.DropDownList = this.DropDownList.bind(this);
  }

  componentDidMount() {
    const { fireDataAction, sid } = this.props;
    fireDataAction(
      dataActions.getMultiple,
      { searchString: {} },
      resourcesList.Notification,
      sid
    );
  }

  // eslint-disable-next-line class-methods-use-this
  onClickHandler(handlerName) {
    const { handlersList } = this.props;
    if (handlersList[handlerName]) {
      return handlersList[handlerName];
    }
    return null;
  }

  DropDownList = ({ listConfig }) => {
    const { HandleDropDownItem } = this;
    const { menuItems, icon, badge } = listConfig;
    const dummyData = { badgeName: '' };
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
    const { type, name, label, url, icon, badge } = item;
    const dummyData = { badgeName: '' };
    switch (type) {
      case 'item':
        return (
          <DropdownItem tag="div">
            {!icon ? null : <i className={icon} />}
            {!url ? (
              i18next.t(label || name)
            ) : (
              <Link onClick={this.onClickHandler(name)} to={url} as="div">
                {i18next.t(label || name)}
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
            <strong>{i18next.t(label)}</strong>
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
    const {
      sid,
      mainConfig,
      config,
      permissions: { hasToggleDirection }
    } = this.props;
    const { hasSidebar, hasAside } = mainConfig;
    const { primaryMenu, secondaryMenu } = config;

    const HandleMenuItem = ({ item }) => {
      const {
        type,
        name,
        url,
        badge: { variant },
        ...restProps
      } = item;
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
              <CustomTagDropdown
                {...restProps}
                dataRef={[
                  {
                    storeName: resourcesList.Notification
                  }
                ]}
                dataMapper={data => ({
                  list: customLookupListMapper(
                    data[`${resourcesList.Notification}_0`]?.data?.list,
                    'notificationTitle',
                    'id'
                  )
                })}
                CustomButton={customBtnProps => (
                  <NavLink {...customBtnProps} to="#" className="nav-link">
                    <i className="icon-bell" />
                    <Badge color={variant}>{customBtnProps.list.length}</Badge>
                  </NavLink>
                )}
                psid={sid}
                permissions={{ canSelect: true }}
                label={i18next.t('role.title')}
              />
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
        {hasToggleDirection ? <ToggleDirection /> : null}
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
DefaultHeader.defaultProps = {
  sid: 'header',
  permissions: { hasToggleDirection: true }
};
export default DefaultHeader;
