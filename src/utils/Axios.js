import instance from 'axios';

const thirtySeconds = 30000;

const axios = instance.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: thirtySeconds
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axios;
