import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
});

export function updateToken(token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
