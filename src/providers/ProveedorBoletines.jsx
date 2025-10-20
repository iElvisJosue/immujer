/* eslint-disable react/prop-types */
// IMPORTAMOS LAS SOLICITUDES
import * as PvBoletines from "../api/authBoletines";
// IMPORTAMOS EL CONTEXTO DEL PROVIDER
import { BoletinesContext } from "../context/BoletinesContext";
// IMPORTAMOS LAS AYUDA
import { ManejarRespuestasDelServidor } from "../helpers/ManejarRespuestasDelServidor";

export const ProveedorBoletines = ({ children }) => {
  const Registrar = async (data) => {
    try {
      const res = await PvBoletines.SolicitudRegistrar(data);
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
      const res = await PvBoletines.SolicitudBuscarPorFiltro(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const Editar = async (data) => {
    try {
      const res = await PvBoletines.SolicitudEditar(data);
      ManejarRespuestasDelServidor({ status: res.status, data: res.data });
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };

  return (
    <BoletinesContext.Provider
      value={{
        Registrar,
        BuscarPorFiltro,
        Editar,
      }}
    >
      {children}
    </BoletinesContext.Provider>
  );
};
