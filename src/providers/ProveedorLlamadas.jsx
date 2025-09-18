/* eslint-disable react/prop-types */
import {
  SolicitudBuscarLlamadasPorFiltro,
  SolicitudBuscarLlamadasPorFecha,
  SolicitudObtenerReportes,
  SolicitudGenerarReporte,
} from "../api/authLlamadas";
import { LlamadasContext } from "../context/LlamadasContext";

export const ProveedorLlamadas = ({ children }) => {
  const BuscarLlamadasPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarLlamadasPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarLlamadadasPorFecha = async (data) => {
    try {
      const res = await SolicitudBuscarLlamadasPorFecha(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ObtenerReportes = async (data) => {
    try {
      const res = await SolicitudObtenerReportes(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const GenerarReporte = async (data) => {
    try {
      const res = await SolicitudGenerarReporte(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <LlamadasContext.Provider
      value={{
        BuscarLlamadasPorFiltro,
        BuscarLlamadadasPorFecha,
        ObtenerReportes,
        GenerarReporte,
      }}
    >
      {children}
    </LlamadasContext.Provider>
  );
};
