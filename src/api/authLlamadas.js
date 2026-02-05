import axios from "./axios";

export const SolicitudBuscarPorFiltro = (data) =>
  axios.post("/web/llamadas/buscar-por-filtro", data);
export const SolicitudBuscarPorFecha = (data) =>
  axios.post("/web/llamadas/buscar-por-fecha", data);
export const SolicitudObtenerDetalles = ({ idLlamada }) =>
  axios.get(`/web/llamadas/obtener-detalles/${idLlamada}`);
export const SolicitudActualizarEstado = (data) =>
  axios.put("/web/llamadas/actualizar-estado", data);
export const SolicitudObtenerComentarios = ({ idLlamada }) =>
  axios.get(
    `/web/llamadas/obtener-comentarios/${idLlamada}`,
  );
export const SolicitudAgregarComentario = (data) =>
  axios.post("/web/llamadas/agregar-comentario", data);
export const SolicitudObtenerUbicaciones = ({ idLlamada }) =>
  axios.get(
    `/web/llamadas/obtener-ubicaciones/${idLlamada}`,
  );
export const SolicitudObtenerReportes = () =>
  axios.get(`/web/llamadas/obtener-reportes`);
export const SolicitudGenerarReporte = (data) =>
  axios.post("/web/llamadas/generar-reporte", data);
