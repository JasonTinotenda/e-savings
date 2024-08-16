import axios from 'axios';
import qs from 'qs';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }), // Handle URL-encoded params
});

export default axiosInstance;
