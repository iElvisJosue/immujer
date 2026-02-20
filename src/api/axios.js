import axios from "axios";

const instance = axios.create({
  /** Para producción **/
  baseURL: "https://qa.acapulco.gob.mx:3050/api",
  /** Para pruebas en producción **/
  // baseURL: "https://immujer.ideasdistintas.com/api",
  /** Para pruebas en local **/
  // baseURL: "http://localhost:3050/api",
  withCredentials: true,
});

export default instance;
