import React, { Suspense } from 'react';
import * as router from 'react-router-dom';

import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav
} from '@coreui/react';

function SideBar(props) {
  const {
    sidebarConfig: { ar, en },
    mainConfig: { hasSidebar }
  } = props;
  const { nav, footer } = ar || en;
  if (!(hasSidebar || nav || !nav || !nav.length)) {
    return null;
  }

  return (
    <AppSidebar fixed display="lg">
      <AppSidebarHeader />
      <AppSidebarForm />
      <Suspense>
        <AppSidebarNav {...props} navConfig={nav} router={router} />
      </Suspense>
      <AppSidebarFooter>
        {footer && footer.desc && <p>{footer.desc}</p>}
      </AppSidebarFooter>
      <AppSidebarMinimizer />
    </AppSidebar>
  );
}

export default SideBar;
