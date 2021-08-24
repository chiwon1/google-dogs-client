import axios from "axios";

const provideBaseUrl = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`,
});

export function updateToken(token) {
  provideBaseUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
