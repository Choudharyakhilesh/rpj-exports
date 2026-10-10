console.log(
  "API URL AT RUNTIME",
  process.env.NEXT_PUBLIC_API_URL
);

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Request Interceptor (NO any)
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // future: yahin token inject kar sakta hai
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (NO any)
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);

export default httpClient;
