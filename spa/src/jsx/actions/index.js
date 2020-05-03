import axios from "axios";
import 'dotenv/config';
import {
  assetUrl
} from '../constants/api.js';

export function putMetrics(payload) {
  return function(dispatch) {
    dispatch({type: "PUT_METRICS_FULLFILLED", payload: payload});
  }
}

export function updateOrg(data) {
  return function(dispatch) {
    dispatch({type: "UPDATE_ASSET_PENDING"});

    axios({
      method: 'POST',
      url: assetUrl,
      data: data,
    })
    .then((response) => {
      dispatch({type: "UPDATE_ASSET_FULFILLED", payload: response.data.data})
    })
    .catch((err) => {
      const responseMessage = `${err.response.statusText} - ${err.response.data.error}`;
      dispatch({type: "UPDATE_ASSET_REJECTED", payload: responseMessage})
    })
  }
}

