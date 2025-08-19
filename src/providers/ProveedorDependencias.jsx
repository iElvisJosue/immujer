/* eslint-disable react/prop-types */
import {
  SolicitudRegistrarNuevaDependencia,
  SolicitudBuscarDependenciasPorFiltro,
  SolicitudEditarUnaDependencia,
} from "../api/authDependencias";
import { DependenciasContext } from "../context/DependenciasContext";

export const ProveedorDependencias = ({ children }) => {
  const RegistrarNuevaDependencia = async (data) => {
    try {
      const res = await SolicitudRegistrarNuevaDependencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarDependenciasPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarDependenciasPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const EditarUnaDependencia = async (data) => {
    try {
      const res = await SolicitudEditarUnaDependencia(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  return (
    <DependenciasContext.Provider
      value={{
        RegistrarNuevaDependencia,
        BuscarDependenciasPorFiltro,
        EditarUnaDependencia,
      }}
    >
      {children}
    </DependenciasContext.Provider>
  );
};
