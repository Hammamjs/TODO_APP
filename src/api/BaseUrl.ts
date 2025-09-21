import axios from 'axios';

const baseApi = 'http://localhost:3500/api/v2';
const apiInstance = axios.create({
  baseURL: baseApi,
  withCredentials: true,
});

export default apiInstance;
