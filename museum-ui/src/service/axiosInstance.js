import axios from "axios";

import { openAlert } from "@features/alertSlice";

import store from "../store";

const isDev = process.env.NODE_ENV === "development";

const axiosInstance = axios.create({
  baseURL: isDev
    ? "http://localhost:3000"
    : "https://museum-api.azurewebsites.net",
  headers: {
    "Content-Type": "application/json"
  },
  responseType: "json", // default
  timeout: 3000 // default is `0` (no timeout)
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (sessionStorage.getItem("token")) {
      config.headers.Authorization = "Bearer " + sessionStorage.token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request err:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // update token
    if (response.headers.token) {
      sessionStorage.setItem("token", response.headers.token);
    }
    // return response;
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch(
      openAlert({
        err: error.response?.data?.err || error.message,
        severity: "error"
      })
    );
    console.log(error, store, store.getState());
    return Promise.reject(error.response?.data?.err || error.message);
  }
);

export default axiosInstance;
