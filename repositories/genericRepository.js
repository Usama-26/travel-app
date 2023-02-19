import axios from "axios";
import Router from "next/router";
const baseDomain = "https://tripapp-backend.up.railway.app/api";

export const appName = "Getwork";

export const customHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const baseUrl = `${baseDomain}`;

const instance = axios.create({
  baseUrl,
  headers: customHeaders,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_accessToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

export const getError = (error) => {
  console.log(error);
  if (error.response) {
    console.log(error?.response?.data?.code);
    if (error?.response?.data?.code == 401) {
      Router.push("/login");
    }
    if (error?.response?.data?.data?.errorMessage) {
      return `${error.response.data.data.errorMessage}`;
    } else if (error?.response?.data?.message) {
      return `${error.response.data.message}`;
    } else {
      return error.response;
    }
  } else if (error.request) {
    return error.request;
  } else {
    return `${error}`;
  }
};
