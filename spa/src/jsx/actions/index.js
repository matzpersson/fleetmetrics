import axios from "axios";

export function putMetrics(payload) {
  return function(dispatch) {
    dispatch({type: "PUT_METRICS_FULLFILLED", payload: payload});
  }
}

export function fetchAssets() {
  return function(dispatch) {
    dispatch({type: "FETCH_ASSETS_PENDING"});

    const url = `localhost:8080`
    axios({
      method: 'GET',
      url: url,
    })
    .then((response) => {
      // const payload = {data: response.data, id: cluster.id}
      dispatch({type: "FETCH_ASSETS_FULLFILLED", payload: response});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}
