import axios from "axios";

const provideBaseUrl = axios.create({
  baseURL: "http://localhost:8000",
});

export function updateToken(token) {
  provideBaseUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
