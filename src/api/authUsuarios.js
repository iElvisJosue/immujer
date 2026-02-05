import axios from "./axios";

export const SolicitudIniciarSesion = (data) =>
  axios.post("/web/usuarios/iniciar-sesion", data);
export const SolicitudActualizarMiInformacion = (data) =>
  axios.put("/web/usuarios/actualizar-mi-informacion", data);
export const SolicitudRegistrar = (data) =>
  axios.post("/web/usuarios/registrar", data);
export const SolicitudBuscarPorFiltro = (data) =>
  axios.post("/web/usuarios/buscar-por-filtro", data);
export const SolicitudEditar = (data) =>
  axios.put("/web/usuarios/editar", data);
