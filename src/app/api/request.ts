import axios, { AxiosRequestConfig } from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

request.interceptors.request.use((config) => {
  const newConfig: AxiosRequestConfig = {
    ...config,
    params: {
      ...config.params,
      units: "metric",
      appid: process.env.REACT_APP_API_KEY,
    },
  };
  return newConfig;
});

export default request;
