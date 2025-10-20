/* eslint-disable react/prop-types */
// IMPORTAMOS LAS SOLICITUDES
import * as PvLlamadas from "../api/authLlamadas";
// IMPORTAMOS EL CONTEXTO DEL PROVIDER
import { LlamadasContext } from "../context/LlamadasContext";
// IMPORTAMOS LAS AYUDAS
import { ManejarRespuestasDelServidor } from "../helpers/ManejarRespuestasDelServidor";

export const ProveedorLlamadas = ({ children }) => {
  const BuscarPorFiltro = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudBuscarPorFiltro(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { data, status } = error.response || {};
      ManejarRespuestasDelServidor({ data, status });
      return { exito: false, data };
    }
  };
  const BuscarPorFecha = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudBuscarPorFecha(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { data, status } = error.response || {};
      ManejarRespuestasDelServidor({ data, status });
      return { exito: false, data };
    }
  };
  const ObtenerDetalles = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudObtenerDetalles(data);
      // SOLO ES EXITOSA SI ENCONTRAMOS UNA LLAMADA
      return { exito: res.data.length > 0, data: res.data };
    } catch (error) {
      const { data, status } = error.response || {};
      ManejarRespuestasDelServidor({ data, status });
      return { exito: false, data };
    }
  };
  const ActualizarEstado = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudActualizarEstado(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { data, status } = error.response || {};
      ManejarRespuestasDelServidor({ data, status });
      return { exito: false, data };
    }
  };
  const ObtenerComentarios = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudObtenerComentarios(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { data, status } = error.response || {};
      ManejarRespuestasDelServidor({ data, status });
      return { exito: false, data };
    }
  };
  const AgregarComentario = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudAgregarComentario(data);
      ManejarRespuestasDelServidor({ status: res.status, data: res.data });
      return { exito: true, data: res.data };
    } catch (error) {
      const { data, status } = error.response || {};
      ManejarRespuestasDelServidor({ data, status });
      return { exito: false, data };
    }
  };
  const ObtenerUbicaciones = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudObtenerUbicaciones(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { data, status } = error.response || {};
      ManejarRespuestasDelServidor({ data, status });
      return { exito: false, data };
    }
  };
  const ObtenerReportes = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudObtenerReportes(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const GenerarReporte = async (data) => {
    try {
      const res = await PvLlamadas.SolicitudGenerarReporte(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <LlamadasContext.Provider
      value={{
        BuscarPorFiltro,
        BuscarPorFecha,
        ObtenerReportes,
        GenerarReporte,
        ObtenerDetalles,
        ActualizarEstado,
        AgregarComentario,
        ObtenerComentarios,
        ObtenerUbicaciones,
      }}
    >
      {children}
    </LlamadasContext.Provider>
  );
};
