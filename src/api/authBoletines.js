import axios from "./axios";
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

export const SolicitudRegistrar = (data) =>
  axios.post("/web/boletines/registrar", data);
export const SolicitudBuscarPorFiltro = (data) =>
  axios.post("/web/boletines/buscar-por-filtro", AgregarCookiePeticion(data));
export const SolicitudEditar = (data) =>
  axios.put("/web/boletines/editar", data);
