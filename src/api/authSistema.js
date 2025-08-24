import axios from "./axios";
import {
  AgregarCookiePeticion,
  COOKIE_CON_TOKEN,
} from "../helpers/AgregarCookiePeticion";

export const SolicitudVerificarToken = (data) =>
  axios.post("web/sistema/verificar-token", data);
export const SolicitudBuscarNotificacionesPorFiltro = (data) =>
  axios.post(
    "/web/sistema/buscar-notificaciones-por-filtro",
    AgregarCookiePeticion(data)
  );
export const SolicitudEnviarNotificacionGlobal = (data) =>
  axios.post("/web/sistema/enviar-notificacion-global", data);
export const SolicitudEnviarNotificacionPersonalizada = (data) =>
  axios.post(
    "/web/sistema/enviar-notificacion-personalizada",
    AgregarCookiePeticion(data)
  );
export const SolicitudBuscarDetallesNotificacion = ({ uuid }) =>
  axios.get(
    `/web/sistema/buscar-detalles-notificacion/${COOKIE_CON_TOKEN}/${uuid}`
  );
