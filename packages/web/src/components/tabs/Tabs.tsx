import React, { useState } from 'react';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import i18next from 'i18next';

function Tabs(props: Tabs): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);
  /** Toggle active tab */
  const toggle = (tab: any): void => {
    setActiveTab(tab);
  };
  const { tabsConfig } = props;
  /** Render nav items(Tabs) */
  const renderNav = (): JSX.Element => {
    return (
      <Nav tabs>
        {tabsConfig && tabsConfig.length ? (
          tabsConfig.map((oneTab: any, index: number) => (
            <NavItem>
              <NavLink
                active={activeTab === index}
                onClick={(): void => {
                  toggle(index);
                }}
              >
                {oneTab.icon ? <i className={oneTab.icon} /> : null}
                {i18next.t(oneTab.label)}
              </NavLink>
            </NavItem>
          ))
        ) : (
          <div />
        )}
      </Nav>
    );
  };

  return (
    <Row>
      <Col xs={12}>
        {renderNav()}
        <TabContent activeTab={activeTab}>
          <TabPane tabId={activeTab}>{tabsConfig[activeTab].content()}</TabPane>
        </TabContent>
      </Col>
    </Row>
  );
}

Tabs.defaultProps = {
  tabsConfig: [
    {
      label: 'Ahmed',
      content: () => <h1>try</h1>
    },
    {
      label: 'Mohamed',
      content: () => <h1>try 2</h1>
    }
  ]
};

interface TabDetails {
  label: string;
  icon?: string;
  content: any;
}

interface Tabs {
  tabsConfig: Array<TabDetails>;
}

export default Tabs;
