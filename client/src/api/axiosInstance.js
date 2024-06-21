import axios from "axios";

const axiosInstanz = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});
export default axiosInstanz;
