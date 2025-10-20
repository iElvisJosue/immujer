import axios from "./axios";
import {
  AgregarCookiePeticion,
  COOKIE_CON_TOKEN,
} from "../helpers/AgregarCookiePeticion";

export const SolicitudBuscarPorFiltro = (data) =>
  axios.post("/web/llamadas/buscar-por-filtro", AgregarCookiePeticion(data));
export const SolicitudBuscarPorFecha = (data) =>
  axios.post("/web/llamadas/buscar-por-fecha", AgregarCookiePeticion(data));
export const SolicitudObtenerDetalles = ({ idLlamada }) =>
  axios.get(`/web/llamadas/obtener-detalles/${COOKIE_CON_TOKEN}/${idLlamada}`);
export const SolicitudActualizarEstado = (data) =>
  axios.put("/web/llamadas/actualizar-estado", AgregarCookiePeticion(data));
export const SolicitudObtenerComentarios = ({ idLlamada }) =>
  axios.get(
    `/web/llamadas/obtener-comentarios/${COOKIE_CON_TOKEN}/${idLlamada}`
  );
export const SolicitudAgregarComentario = (data) =>
  axios.post("/web/llamadas/agregar-comentario", AgregarCookiePeticion(data));
export const SolicitudObtenerReportes = () =>
  axios.get(`/web/llamadas/obtener-reportes/${COOKIE_CON_TOKEN}`);
export const SolicitudGenerarReporte = (data) =>
  axios.post("/web/llamadas/generar-reporte", AgregarCookiePeticion(data));
