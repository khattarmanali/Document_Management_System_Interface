import axios from "axios";

// export const BASE_URL = "https://api.doubleticklifestyle.com/api/v1";
// export const BASE_URL = "http://localhost:8080/api/v1";
export const BASE_URL = process.env.API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

export const FORMDATA_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export default API;
