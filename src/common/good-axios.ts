import axios from "axios";
import { API_URL } from "../constants";

const goodAxios = axios.create({
  baseURL: process.env.NODE_ENV === "prod" ? "" : API_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});

export default goodAxios;
