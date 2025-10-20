/* eslint-disable react/prop-types */
// IMPORTAMOS LAS SOLICITUDES
import * as PvDependencias from "../api/authDependencias";
// IMPORTAMOS EL CONTEXTO DEL PROVIDER
import { DependenciasContext } from "../context/DependenciasContext";
// IMPORTAMOS LAS AYUDA
import { ManejarRespuestasDelServidor } from "../helpers/ManejarRespuestasDelServidor";

export const ProveedorDependencias = ({ children }) => {
  const Registrar = async (data) => {
    try {
      const res = await PvDependencias.SolicitudRegistrar(data);
      ManejarRespuestasDelServidor({ status: res.status, data: res.data });
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const BuscarPorFiltro = async (data) => {
    try {
      const res = await PvDependencias.SolicitudBuscarPorFiltro(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const Editar = async (data) => {
    try {
      const res = await PvDependencias.SolicitudEditar(data);
      ManejarRespuestasDelServidor({ status: res.status, data: res.data });
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };

  return (
    <DependenciasContext.Provider
      value={{
        Registrar,
        BuscarPorFiltro,
        Editar,
      }}
    >
      {children}
    </DependenciasContext.Provider>
  );
};
