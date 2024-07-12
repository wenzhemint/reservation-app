import axios from "axios";
import {
  BASE_URL
} from '../config/server';
import { NETWORK_ERROR } from "../utils/helpers/constants";

const httpInterceptor = axios.create();

// http interceptor START
httpInterceptor.interceptors.request.use(function (config) {
  // Do something before request is sent

  config.baseURL =  BASE_URL;
  config.headers["Content-type"] = "application/json";

  return config;
}, function (error) {
  // Do something with request error


  return Promise.reject(error);
});

httpInterceptor.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  // console.log('interceptor works.');

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  console.log(error);

  if(error.message == NETWORK_ERROR) {
    return Promise.reject(error.message);
  } else if(error.response&&error.response.status) {
    switch (error.response.status) {
      case 401:
        return Promise.reject('Authentication Error');
        break;
    
      default:
        break;
    }
  }

  return Promise.reject(error.message);
});
// http intercepter END

export default httpInterceptor;