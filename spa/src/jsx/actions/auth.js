import axios from "axios";
import 'dotenv/config';
import {
  loginUrl
} from '../constants/api.js';

export function login(user) {
  return function(dispatch) {
    dispatch({type: "FETCH_TOKEN_PENDING"});

    axios({
      method: 'POST',
      url: loginUrl,
      data: user,
    })
    .then((response) => {
      axios.defaults.headers.common = {'x-access-token': response.headers['x-auth-token']}
      dispatch({type: "FETCH_TOKEN_FULFILLED", payload: {'authenticated': true}})
    })
    .catch((err) => {
      console.log("response", err.response)
      const responseMessage = (err.response && err.response.data ? err.response.data : 'Undefined error');
      dispatch({type: "FETCH_TOKEN_REJECTED", payload: responseMessage})
    })
  }
}
