import axios from "axios";
import 'dotenv/config';
import {
  userUrl
} from '../constants/api.js';

export function saveUser(user) {
  return function(dispatch) {
    dispatch({type: "SAVE_USER_PENDING"});
    const url = `${userUrl}/${user._id}`
    axios({
      method: 'PUT',
      url,
      data: user
    })
    .then((response) => {
      console.log("SAVE", response.data)
      dispatch({type: "SAVE_USER_FULFILLED"});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}

export function createDemoUser() {
  return function(dispatch) {
    dispatch({type: "CREATE_DEMOUSER_PENDING"});
    const params = {
      hashKey: 'demouser',
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo.user@fleetmetrics.io',
      dashboard: []
    }

    console.log("ASSETS", userUrl)

    axios({
      method: 'POST',
      url: userUrl,
      data: params
    })
    .then((response) => {
      console.log("CREATE", response.data)
      dispatch({type: "FETCH_DEMOUSER_FULLFILLED", payload: response.data.data[0]});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}

export function fetchDemoUser() {
  return function(dispatch) {
    dispatch({type: "FETCH_DEMOUSER_PENDING"});
    const params = {hashKey: 'demouser'}
    axios({
      method: 'GET',
      url: userUrl,
      params

    })
    .then((response) => {
      if (!response.data.data || response.data.data.length === 0) {
        console.log("create a user")
        dispatch(createDemoUser());
      } else {
        dispatch({type: "FETCH_DEMOUSER_FULLFILLED", payload: response.data.data[0]});
      }
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}
