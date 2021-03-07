import { INav } from '../interfaces/nav'

export const NAV: INav[] = [
  {
    type: 'nav',
    link: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'speed'
  },
  {
    type: 'header',
    name: 'Folders',
  },
  {
    type: 'nav',
    name: 'Forms',
    icon: 'dynamic_form',
    children: [
      {
        type: 'nav',
        link: '/admin/form/basic',
        name: 'basic',
        icon: 'ballot'
      },
      {
        type: 'nav',
        link: '/admin/form/wizard',
        name: 'wizard',
        icon: 'flash_auto'
      }
    ]
  },
  {
    type: 'nav',
    name: 'Components',
    icon: 'settings_input_component',
    children: [
      {
        type: 'nav',
        link: '/admin/patter-bridge',
        name: 'Bridge',
        icon: 'folder'
      },
      {
        type: 'nav',
        link: '/admin/ctr-value-access',
        name: 'Controller Value',
        icon: 'folder'
      },
      {
        type: 'nav',
        link: '/admin/custom-form',
        name: 'Custom Form',
        icon: 'folder'
      },
    ]
  }
]
