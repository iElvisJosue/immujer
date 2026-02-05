import axios from "./axios";

export const SolicitudBuscarPorFiltro = (data) =>
  axios.post("/web/notificaciones/buscar-por-filtro", data);
export const SolicitudEnviarPush = (data) =>
  axios.post("/web/notificaciones/enviar-push", data);
export const SolicitudEnviarPushPersonalizada = (data) =>
  axios.post("/web/notificaciones/enviar-push-personalizada", data);
export const SolicitudObtenerEstadisticas = ({ uuid }) =>
  axios.get(`/web/notificaciones/obtener-estadisticas/${uuid}`);
export const SolicitudObtenerNoVistas = ({ idUsuario }) =>
  axios.get(`/web/notificaciones/obtener-no-vistas/${idUsuario}`);
export const SolicitudMarcarVista = ({ idNotificacion }) =>
  axios.patch(`/web/notificaciones/marcar-vista/${idNotificacion}`);
export const SolicitudMarcarTodasVistas = (data) =>
  axios.post("/web/notificaciones/marcar-todas-vistas", data);
