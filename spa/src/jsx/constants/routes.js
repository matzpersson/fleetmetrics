import Dashboard from '../components/dashboard/Dashboard.jsx';
import Fleet from '../components/Fleet.jsx';
import Metrics from '../components/Metrics.jsx';
import Assets from '../components/assets/Assets.jsx';
import Asset from '../components/assets/Asset.jsx';
import AssetPoint from '../components/assets/AssetPoint.jsx';
import Statistics from '../components/Statistics.jsx';
import Login from '../components/Login.jsx';

export const routes = [
  {
    path: "/",
    component: Dashboard,
    title: "Dashboard",
    exact: true,
    authRequired: false
  },
  {
    path: "/login",
    component: Login,
    title: "Login",
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
  },
  {
    path: "/asset/:id",
    component: Asset,
    title: "Asset",
    exact: true,
    authRequired: false
  },
  {
    path: "/asset/:id/points/:id",
    component: AssetPoint,
    title: "AssetGauge",
    exact: true,
    authRequired: false
  },
  {
    path: "/Statistics",
    component: Statistics,
    title: "Statistics",
    exact: true,
    authRequired: false
  }
];
