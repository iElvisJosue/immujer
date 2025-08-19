/* eslint-disable react/prop-types */
import {
  SolicitudRegistrarNuevoBoletin,
  SolicitudBuscarBoletinesPorFiltro,
  SolicitudEditarUnBoletin,
} from "../api/authBoletines";
import { BoletinesContext } from "../context/BoletinesContext";

export const ProveedorBoletines = ({ children }) => {
  const RegistrarNuevoBoletin = async (data) => {
    try {
      const res = await SolicitudRegistrarNuevoBoletin(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarBoletinesPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarBoletinesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const EditarUnBoletin = async (data) => {
    try {
      const res = await SolicitudEditarUnBoletin(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  return (
    <BoletinesContext.Provider
      value={{
        RegistrarNuevoBoletin,
        BuscarBoletinesPorFiltro,
        EditarUnBoletin,
      }}
    >
      {children}
    </BoletinesContext.Provider>
  );
};
