import axios from "axios";
import 'dotenv/config';

export function putMetrics(payload) {
  return function(dispatch) {
    dispatch({type: "PUT_METRICS_FULLFILLED", payload: payload});
  }
}

export function fetchAssets() {
  return function(dispatch) {
    dispatch({type: "FETCH_ASSETS_PENDING"});

    const port = process.env.API_PORT || 8081
    const hostname = process.env.API_HOSTNAME || 'localhost'
    const url = `http://${hostname}:${port}/api/assets`
    axios({
      method: 'GET',
      url: url,
    })
    .then((response) => {
      // const payload = {data: response.data, id: cluster.id}
      dispatch({type: "FETCH_ASSETS_FULLFILLED", payload: response.data.data});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}
