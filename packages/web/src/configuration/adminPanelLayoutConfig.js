export default {
  footer: {
    poweredBy: {
      name: 'Raseedy',
      url: 'raseedyapp.com'
    },
    company: {
      name: ' Tasaheel - Mashrooy Middleware',
      url: 'http://raseedyapp.com/'
    }
  },
  header: {
    primaryMenu: [],
    secondaryMenu: [
      {
        type: 'LogoNavItem',
        toggle: '',
        src: '',
        index: 4,
        class: '',
        badge: {
          variant: 'warning'
        },
        icon: 'icon-list',
        alt: '',
        menuItems: [
          {
            type: 'header',
            name: 'Account'
          },
          {
            type: 'item',
            icon: 'icon-user-follow text-success',
            name: 'Updates',
            url: '/users',
            badge: {
              variant: 'success'
            }
          },
          {
            type: 'item',
            icon: 'fa fa-bell-o',
            name: 'Settings',
            url: '/users',
            badge: {
              variant: 'info'
            }
          },
          {
            type: 'header',
            name: 'Settings'
          },
          {
            type: 'item',
            icon: 'fa fa-user',
            name: 'Profile',
            url: '/users',
            badge: {
              variant: 'info'
            }
          },
          {
            type: 'item',
            icon: 'fa fa-wrench',
            name: 'Settings',
            url: '/users',
            badge: {
              variant: 'info'
            }
          },
          {
            type: 'divider'
          },
          {
            type: 'item',
            icon: 'fa fa-shield',
            name: 'Lock account',
            url: '/users',
            badge: {
              variant: 'info'
            }
          },
          {
            type: 'item',
            icon: 'fa fa-lock',
            name: 'Logout',
            url: '/users',
            badge: {
              variant: 'info'
            }
          }
        ]
      }
    ]
  },
  sidebar: {
    ar: {
      nav: {
        items: [
          {
            name: 'Layout Manager',
            url: 'layout-manager',
            icon: 'icon-settings'
          },
          {
            name: 'Visual Capabilities Manager',
            url: 'visual-caps',
            icon: 'icon-lock'
          }
        ]
      },
      minimizer: {}
    }
  },
  breadcrumb: {},
  main: {
    hasSidebar: true,
    hasAside: false
  }
};
