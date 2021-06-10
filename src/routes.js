import Dashboard from 'views/Dashboard';
import UserProfile from 'views/UserProfile';
import TableList from 'views/TableList';
import Typography from 'views/Typography';
import Icons from 'views/Icons';
import Notifications from 'views/Notifications';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin'
  },
  {
    path: '/user',
    name: 'User Profile',
    icon: 'nc-icon nc-circle-09',
    component: UserProfile,
    layout: '/admin'
  },
  {
    path: '/table',
    name: 'Table List',
    icon: 'nc-icon nc-notes',
    component: TableList,
    layout: '/admin'
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'nc-icon nc-paper-2',
    component: Typography,
    layout: '/admin'
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'nc-icon nc-atom',
    component: Icons,
    layout: '/admin'
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'nc-icon nc-bell-55',
    component: Notifications,
    layout: '/admin'
  }
];

export default dashboardRoutes;
