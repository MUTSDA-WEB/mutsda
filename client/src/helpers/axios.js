import axios from "axios";

const Ax = axios.create({
   baseURL: "http://localhost:4554" || "https://mutsdaserver.onrender.com",
   withCredentials: true,
});

export default Ax;
