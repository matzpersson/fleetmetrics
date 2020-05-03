import React from 'react';
import ReactDOM from 'react-dom';
import App from './jsx/containers/App.jsx';
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';

library.add(fal, far);

const app = document.getElementById('root');

// // Add a request interceptor
// // console.log("NEW", document.cookies)
// axios.interceptors.request.use(function (config) {
//   // console.log("MORE ")
//   const cookies = document.cookie.replace(' ','').split(';');
//   let apiToken;
//   cookies.forEach(cookie => {

//     console.log("COOKIES", cookie)
//     // const token = response.headers['x-auth-token'];
//     // document.cookie = `x-access-token=${token}`;
//     // axios.defaults.headers.common = {'x-access-token': token}

//     // if (element.indexOf('apiToken') > 0) {
//     //   apiToken = element.split('=')[1];
//     //   axios.defaults.headers.common = {'Authorization': `Bearer ${apiToken}`}
//     //   console.log("setting token", apiToken)
//     // }
//   });
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, app);
