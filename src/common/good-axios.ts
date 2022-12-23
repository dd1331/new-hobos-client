import axios from "axios";

const goodAxios = axios.create({
  baseURL: process.env.NODE_ENV === "prod" ? "" : "http://localhost:3000/",
  headers: {
    // "Content-Type": "application/json",
  },
});

export default goodAxios;
