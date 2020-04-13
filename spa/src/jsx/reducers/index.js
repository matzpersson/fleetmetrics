import { combineReducers } from 'redux';
// import ajaxRequests from '../components/core/loader/reducers';
import metrics from './metrics';
import assets from './assets';

export default combineReducers({
  metrics,
  assets
});
