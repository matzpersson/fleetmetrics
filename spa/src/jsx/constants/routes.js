import Dashboard from '../components/Dashboard.jsx';
import Fleet from '../components/Fleet.jsx';
import Metrics from '../components/Metrics.jsx';
import Assets from '../components/Assets.jsx';

export const routes = [
  {
    path: "/",
    component: Dashboard,
    title: "Dashboard",
    exact: true,
    authRequired: false
  },
  {
    path: "/fleet",
    component: Fleet,
    title: "Fleet",
    exact: true,
    authRequired: false
  },
  {
    path: "/metrics",
    component: Metrics,
    title: "Metrics",
    exact: true,
    authRequired: false
  },
  {
    path: "/Assets",
    component: Assets,
    title: "Assets",
    exact: true,
    authRequired: false
  }
];
