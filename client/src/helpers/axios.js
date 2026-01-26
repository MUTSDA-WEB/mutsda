import axios from "axios";

const Ax = axios.create({
   baseURL: "http://localhost:4554",
});

export default Ax;
