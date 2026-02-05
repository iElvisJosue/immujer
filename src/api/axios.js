import axios from "axios";

const instance = axios.create({
  // UTILIZAR CUANDO ESTE EN PRODUCCIÓN
  baseURL: "https://immujer.ideasdistintas.com/api",
  // baseURL: "http://localhost:3050/api",
  withCredentials: true,
});

export default instance;
