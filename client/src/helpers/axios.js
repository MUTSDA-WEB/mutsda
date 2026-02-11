import axios from "axios";

const path = "https://mutsdaserver.onrender.com";
// const path = "http://localhost:5173"

const Ax = axios.create({
   baseURL: path,
   withCredentials: true,
});

export default Ax;
