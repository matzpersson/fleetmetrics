import { combineReducers } from 'redux';
// import ajaxRequests from '../components/core/loader/reducers';
import metrics from './metrics';
import assets from './assets';
import gauges from './gauges';
import users from './users';

export default combineReducers({
  metrics,
  assets,
  gauges,
  users
});
