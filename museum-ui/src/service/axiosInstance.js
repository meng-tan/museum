import { Alert } from "@mui/material";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://museum-api.azurewebsites.net",
  // headers: {'X-Custom-Header': 'foobar'},
  responseType: "json", // default
  timeout: 3000 // default is `0` (no timeout)
});

// Add a request interceptor
const reqInterceptor = axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    <Alert severity="error">{error.message}</Alert>;

    return Promise.reject(error);
  }
);

// Add a response interceptor
const resInterceptor = axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // return response;
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
