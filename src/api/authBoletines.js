import axios from "./axios";

export const SolicitudRegistrar = (data) =>
  axios.post("/web/boletines/registrar", data);
export const SolicitudBuscarPorFiltro = (data) =>
  axios.post("/web/boletines/buscar-por-filtro", data);
export const SolicitudEditar = (data) =>
  axios.put("/web/boletines/editar", data);
