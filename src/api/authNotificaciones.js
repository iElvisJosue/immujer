import axios from "./axios";
import {
  AgregarCookiePeticion,
  COOKIE_CON_TOKEN,
} from "../helpers/AgregarCookiePeticion";

export const SolicitudBuscarPorFiltro = (data) =>
  axios.post(
    "/web/notificaciones/buscar-por-filtro",
    AgregarCookiePeticion(data)
  );
export const SolicitudEnviarPush = (data) =>
  axios.post("/web/notificaciones/enviar-push", data);
export const SolicitudEnviarPushPersonalizada = (data) =>
  axios.post(
    "/web/notificaciones/enviar-push-personalizada",
    AgregarCookiePeticion(data)
  );
export const SolicitudObtenerEstadisticas = ({ uuid }) =>
  axios.get(
    `/web/notificaciones/obtener-estadisticas/${COOKIE_CON_TOKEN}/${uuid}`
  );
export const SolicitudObtenerNoVistas = ({ idUsuario }) =>
  axios.get(
    `/web/notificaciones/obtener-no-vistas/${COOKIE_CON_TOKEN}/${idUsuario}`
  );
export const SolicitudMarcarVista = ({ idNotificacion }) =>
  axios.patch(
    `/web/notificaciones/marcar-vista/${COOKIE_CON_TOKEN}/${idNotificacion}`
  );
export const SolicitudMarcarTodasVistas = (data) =>
  axios.post(
    "/web/notificaciones/marcar-todas-vistas",
    AgregarCookiePeticion(data)
  );
