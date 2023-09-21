import axios from "axios";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

import { openAlert } from "@features/alertSlice";
import { thunkedOpenMask } from "@features/maskSlice";
import { thunkedLogout } from "@features/userSlice";

import store from "../store";

const EXPIRED_TOKEN = "Expired Token";

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
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token);
      if (new Date().getTime() < decoded.exp * 1000) {
        config.headers.Authorization = "Bearer " + token;
      } else {
        const controller = new AbortController();
        controller.abort(EXPIRED_TOKEN);
        return {
          ...config,
          signal: controller.signal
        };
      }
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

    if (error.config?.signal?.reason === EXPIRED_TOKEN) {
      store.dispatch(
        thunkedOpenMask({
          msg: "Token expired, please login again."
        })
      );
      store.dispatch(thunkedLogout());
    } else {
      store.dispatch(
        openAlert({
          err: error.response?.data?.err || error.message,
          severity: "error"
        })
      );
    }
    console.log(error, store.getState());
    return Promise.reject(error.response?.data?.err || error.message);
  }
);

export default axiosInstance;
