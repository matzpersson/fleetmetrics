import axios from "axios";
import 'dotenv/config';
import {
  userUrl,
  currentUrl
} from '../constants/api.js';

export function saveUserDashboard(dashboard) {
  return function(dispatch) {
    const url = `${currentUrl}`
    const data = {dashboard: dashboard};
    axios({
      method: 'PUT',
      url,
      data
    })
    .then((response) => {
      dispatch({type: "SAVE_USER_FULFILLED"});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}

export function fetchCurrentUser() {
  return function(dispatch) {
    dispatch({type: "FETCH_CURRENT_PENDING"});
    axios({
      method: 'GET',
      url: currentUrl
    })
    .then((response) => {
        dispatch({type: "FETCH_CURRENT_FULLFILLED", payload: response.data.data});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}
