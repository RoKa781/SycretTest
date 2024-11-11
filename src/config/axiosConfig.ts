import axios from 'axios';

const apiUrl = '';
const apiKey = '011ba11bdcad4fa396660c2ec447ef14';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method === 'post' && config.data) {
      config.data = {
        ...config.data,
        ApiKey: apiKey,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
