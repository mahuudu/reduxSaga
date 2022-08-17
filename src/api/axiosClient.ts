import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
    baseURL : 'http://127.0.0.1:8080',
    headers : {
        'Content-Type' : 'application/json',
    },
});

axiosClient.interceptors.request.use(function (config:AxiosRequestConfig) {
    // Do something before request is send
      const token = localStorage.getItem('access_token') as string  | undefined;
      const auth = token ? token : '';
      if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
     }
     config.headers.x_authorization =  auth;
      return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('loi ne',error.response)
    const { config, status, data } = error.response;
    const code = parseInt(error.response.status);
    if (code === 401) {
      // console.log(error.response)
      throw new Error(data)
    }
    return Promise.reject(error);
});

export default axiosClient;