import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {'x-token': localStorage.getItem("x-token")}
});

export default Instance;