import axios from "axios";
import 'dotenv/config';
import {
  metricModelsRangeUrl
} from '../constants/api.js';

export function fetchMetricsModelRange(topic, model, fromDate, toDate) {
  return function(dispatch) {
    dispatch({type: "FETCH_MODELSRANGE_PENDING"});

    const url =`${metricModelsRangeUrl}?topic=${topic}&model=${model}&from=${fromDate}&to=${toDate}`
    
    axios({
      method: 'GET',
      url: url,
    })
    .then((response) => {
      // const payload = {data: response.data, id: cluster.id}
      const payload = {topic: topic, model: model, fromDate: fromDate, toDate: toDate, data: response.data.data}
      dispatch({type: "FETCH_MODELSRANGE_FULLFILLED", payload: payload});
    })
    .catch((err) => {
      console.log('Error - ', err)
      //dispatch({type: "FETCH_EVENTS_REJECTED", payload: err})
    })
  }
}