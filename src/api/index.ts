// import axios from 'axios';

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default API;


import axios from 'axios';

const API = axios.create({
  baseURL: 'https://admin-crm.onrender.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
