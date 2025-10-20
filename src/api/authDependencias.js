import axios from "./axios";
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

export const SolicitudRegistrar = (data) =>
  axios.post("/web/dependencias/registrar", data);
export const SolicitudBuscarPorFiltro = (data) =>
  axios.post(
    "/web/dependencias/buscar-por-filtro",
    AgregarCookiePeticion(data)
  );
export const SolicitudEditar = (data) =>
  axios.put("/web/dependencias/editar", data);
