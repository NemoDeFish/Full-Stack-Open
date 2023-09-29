import axios from "axios";
import storageService from "../services/storage";
const baseUrl = "/api/blogs";

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

export const getAll = () => axios.get(baseUrl).then((res) => res.data);

export const create = (object) =>
  axios.post(baseUrl, object, { headers }).then((res) => res.data);

export const update = (object) =>
  axios
    .put(`${baseUrl}/${object.id}`, object, { headers })
    .then((res) => res.data);

export const removeBlog = (id) =>
  axios.delete(`${baseUrl}/${id}`, { headers }).then((res) => res.data);
