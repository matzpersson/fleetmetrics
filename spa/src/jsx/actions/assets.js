import axios from "axios";
import 'dotenv/config';
import {
  assetUrl
} from '../constants/api.js';

export function updateAsset(data) {
  return function(dispatch) {
    dispatch({type: "UPDATE_ASSET_PENDING"});
    const url = `${assetUrl}/${data._id}`;
    axios({
      method: 'PUT',
      url,
      data
    })
    .then((response) => {
      console.log("SAVE ASSET", data)
      dispatch({type: "UPDATE_ASSET_FULLFILLED", payload: response.data.data});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}

export function fetchAssets() {
  return function(dispatch) {
    dispatch({type: "FETCH_ASSETS_PENDING"});
    dispatch({type: "FETCH_GAUGES_PENDING"});

    axios({
      method: 'GET',
      url: assetUrl,
    })
    .then((response) => {
      dispatch({type: "FETCH_ASSETS_FULLFILLED", payload: response.data.data});
      dispatch({type: "FETCH_GAUGES_FULLFILLED", payload: response.data.data});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}

export function fetchAssetPoint(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_POINT_PENDING"});

    axios({
      method: 'GET',
      url: `${assetUrl}/points/${id}`
    })
    .then((response) => {
      dispatch({type: "FETCH_POINT_FULFILLED", payload: response.data.data});
    })
    .catch((err) => {
      // const responseMessage = `${err.response.data.error}`;
      // dispatch({type: "FETCH_ASSET_REJECTED", payload: responseMessage})
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

