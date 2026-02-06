/* eslint-disable react/prop-types */
// IMPORTAMOS LAS SOLICITUDES
import * as PvUsuarios from "../api/authUsuarios";
// IMPORTAMOS EL CONTEXTO DEL PROVIDER
import { UsuariosContext } from "../context/UsuariosContext";
// IMPORTAMOS LAS AYUDAS
import { ManejarRespuestasDelServidor } from "../helpers/ManejarRespuestasDelServidor";

export const ProveedorUsuarios = ({ children }) => {
  const IniciarSesion = async (data) => {
    try {
      await PvUsuarios.SolicitudIniciarSesion(data);
      return { exito: true };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const ActualizarMiInformacion = async (data) => {
    try {
      const res = await PvUsuarios.SolicitudActualizarMiInformacion(data);
      ManejarRespuestasDelServidor({ status: res.status, data: res.data });
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const Registrar = async (data) => {
    try {
      const res = await PvUsuarios.SolicitudRegistrar(data);
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
      const res = await PvUsuarios.SolicitudBuscarPorFiltro(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const Editar = async (data) => {
    try {
      const res = await PvUsuarios.SolicitudEditar(data);
      ManejarRespuestasDelServidor({ status: res.status, data: res.data });
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const CerrarSesion = async (data) => {
    try {
      const res = await PvUsuarios.SolicitudCerrarSesion(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        IniciarSesion,
        ActualizarMiInformacion,
        Registrar,
        BuscarPorFiltro,
        Editar,
        CerrarSesion,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
