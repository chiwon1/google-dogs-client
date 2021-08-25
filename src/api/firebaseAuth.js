import axios from "axios";

const provideBaseUrl = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
});

export function updateToken(token) {
  provideBaseUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
