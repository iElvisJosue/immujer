import axios from "axios";

const instance = axios.create({
  /** Para producción **/
  // baseURL: "https://backendserver.acapulco.gob.mx/backendimmujer/api",
  /** Para pruebas en producción **/
  // baseURL: "/api",
  /** Para pruebas en local **/
  baseURL: "http://localhost:3050/api",
  withCredentials: true,
});

export default instance;
