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

export function fetchAssets() {
  return function(dispatch) {
    dispatch({type: "FETCH_ASSETS_PENDING"});
    dispatch({type: "FETCH_GAUGES_PENDING"});

    console.log("ASSETS", assetUrl)
    axios({
      method: 'GET',
      url: assetUrl,
    })
    .then((response) => {
      // const payload = {data: response.data, id: cluster.id}
      dispatch({type: "FETCH_ASSETS_FULLFILLED", payload: response.data.data});
      dispatch({type: "FETCH_GAUGES_FULLFILLED", payload: response.data.data});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}

export function fetchAsset(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_ASSET_PENDING"});

    axios({
      method: 'GET',
      url: `${assetUrl}/${id}`
    })
    .then((response) => {
      dispatch({type: "FETCH_ASSET_FULFILLED", payload: response.data.data});
    })
    .catch((err) => {
      // const responseMessage = `${err.response.data.error}`;
      // dispatch({type: "FETCH_ASSET_REJECTED", payload: responseMessage})
    })
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

