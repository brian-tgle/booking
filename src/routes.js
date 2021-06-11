import Dashboard from 'views/Dashboard';
import Icons from 'views/Icons';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin'
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'nc-icon nc-bullet-list-67',
    component: Icons,
    layout: '/admin'
  }
];

export default dashboardRoutes;
