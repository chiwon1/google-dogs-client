import { axiosInstance } from "./firebaseAuth";

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
