import axios from "axios";

// const axiosInstance = axios.create({})
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_NODE_SERVER_URL,
});

export default axiosInstance;
