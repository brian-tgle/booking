import { lazy } from 'react';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-chart-pie-35',
    component: lazy(() => import('views/Dashboard')),
    layout: '/admin',
    needAdminPermission: false
  },
  {
    path: '/type-of-event',
    name: 'Type of Event',
    icon: 'nc-icon nc-bullet-list-67',
    component: lazy(() => import('views/TypeOfEvent')),
    layout: '/admin',
    needAdminPermission: true
  }
];

export default dashboardRoutes;
