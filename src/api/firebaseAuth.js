import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
});

export function updateToken(token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function getDocuments() {
  const { data } = await axiosInstance.get("/documents");
  return data;
}

export function updateDocument(id, body) {
  return axiosInstance.put(`/documents/${id}`, { body });
}

export function deleteDocument(id) {
  return axiosInstance.delete(`/documents/${id}`);
}
