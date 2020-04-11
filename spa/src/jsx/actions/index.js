import axios from "axios";

export function putMetrics(payload) {
  return function(dispatch) {
    dispatch({type: "PUT_METRICS_FULLFILLED", payload: payload});
  }
}

export function fetchAssets() {
  return function(dispatch) {
    // dispatch({type: "TOGGLE_CLUSTER_COLLAPSE_FULLFILLED", payload: clusterId});
  }
}
