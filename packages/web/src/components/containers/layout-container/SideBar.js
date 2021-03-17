import React, { Suspense } from 'react';
import * as router from 'react-router-dom';

import {
  AppSidebar,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav
} from '@coreui/react';
import i18next from 'i18next';

const sidebarNameMapper = ({ nav }) =>
  nav.length
    ? nav.map(oneNavItem => {
        const { children = [] } = oneNavItem;
        return {
          ...oneNavItem,
          name: i18next.t(oneNavItem.name),
          children: children.length
            ? oneNavItem.children.map(oneChild => ({
                ...oneChild,
                name: i18next.t(oneChild.name)
              }))
            : undefined
        };
      })
    : [];

function SideBar(props) {
  const {
    sidebarConfig,
    mainConfig: { hasSidebar },
    location,
    match
  } = props;
  const nav = sidebarNameMapper(sidebarConfig);
  if (!(hasSidebar || !nav.length)) {
    return null;
  }
  return (
    <AppSidebar fixed display="lg">
      <AppSidebarHeader />
      <AppSidebarForm />
      <Suspense>
        <AppSidebarNav
          navConfig={{ items: nav }}
          location={location}
          match={match}
          router={router}
        />
      </Suspense>
      <AppSidebarMinimizer />
    </AppSidebar>
  );
}

export default SideBar;
