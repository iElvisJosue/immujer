/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import Cookies from "js-cookie";
// IMPORTAMOS LAS SOLICITUDES
import * as PvUsuarios from "../api/authUsuarios";
// IMPORTAMOS EL CONTEXTO DEL PROVIDER
import { UsuariosContext } from "../context/UsuariosContext";
// IMPORTAMOS LAS AYUDAS
import { TOKEN_DE_ACCESO_SISTEMA } from "../helpers/Constantes";
import { ManejarRespuestasDelServidor } from "../helpers/ManejarRespuestasDelServidor";

export const ProveedorUsuarios = ({ children }) => {
  const IniciarSesion = async (data) => {
    try {
      const res = await PvUsuarios.SolicitudIniciarSesion(data);
      const TOKEN_RECIBIDO = res.data?.token;
      Cookies.set(TOKEN_DE_ACCESO_SISTEMA, TOKEN_RECIBIDO, {
        expires: 1,
        secure: true,
      });
      return { exito: true, data: res.data };
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

  return (
    <UsuariosContext.Provider
      value={{
        // ESTAS SON LAS FUNCIONES QUE USAMOS
        // PARA LAS SOLICITUDES
        IniciarSesion,
        ActualizarMiInformacion,
        Registrar,
        BuscarPorFiltro,
        Editar,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
