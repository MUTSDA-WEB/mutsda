import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Ax = axios.create({
   baseURL: BASE,
   withCredentials: true,
});

export default Ax;
