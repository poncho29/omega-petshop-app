import axios from 'axios';

const Instance = axios.create({
  // baseURL: 'http://localhost:8080/api',
  baseURL: 'https://omega-petshop-api.herokuapp.com/api',
  timeout: 10000,
  headers: {'x-token': localStorage.getItem("x-token")}
});

export default Instance;