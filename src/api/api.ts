import axios from 'axios';

const API = axios.create({
  baseURL: 'https://admin-crm.onrender.com/api',
});

export default API;
