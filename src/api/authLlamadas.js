import axios from "./axios";
import {
  AgregarCookiePeticion,
  COOKIE_CON_TOKEN,
} from "../helpers/AgregarCookiePeticion";

export const SolicitudBuscarLlamadasPorFiltro = (data) =>
  axios.post(
    "/web/llamadas/buscar-llamadas-por-filtro",
    AgregarCookiePeticion(data)
  );
export const SolicitudBuscarLlamadasPorFecha = (data) =>
  axios.post(
    "/web/llamadas/buscar-llamadas-por-fecha",
    AgregarCookiePeticion(data)
  );
export const SolicitudObtenerReportes = () =>
  axios.get(`/web/llamadas/obtener-reportes/${COOKIE_CON_TOKEN}`);
export const SolicitudGenerarReporte = (data) =>
  axios.post("/web/llamadas/generar-reporte", AgregarCookiePeticion(data));
