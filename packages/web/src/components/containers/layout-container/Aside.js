import React, { Component } from 'react';
import classNames from 'classnames';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import NotificationList from './NotificationList';

class DefaultAside extends Component {
  static tabContentHandler(item) {
    if (item.type === 'notifList') {
      return <NotificationList config={item} />;
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const {
      config: { tabs, content }
    } = this.props;
    const { activeTab } = this.state;
    return (
      <>
        <Nav tabs>
          {tabs.map(tab => (
            <NavItem key={tab.index}>
              <NavLink
                className={classNames({
                  active: activeTab === tab.index
                })}
                onClick={() => this.toggle(tab.index)}
              >
                <i className={tab.icon} />
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent activeTab={activeTab}>
          {content.map(tab => (
            <TabPane key={tab.index} tabId={tab.index}>
              {DefaultAside.tabContentHandler(tab)}
            </TabPane>
          ))}
        </TabContent>
      </>
    );
  }
}

export default DefaultAside;
