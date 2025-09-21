import axios from 'axios';

const baseApi = import.meta.env.DEV
  ? 'http://localhost:3500/api/v2'
  : ' https://to-do-app-api-flnm.onrender.com/api/v2';

const apiInstance = axios.create({
  baseURL: baseApi,
  withCredentials: true,
});

export default apiInstance;
