/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import {
  SolicitudIniciarSesionUsuario,
  SolicitudActualizarMiInformacion,
  SolicitudRegistrarNuevoUsuario,
  SolicitudBuscarUsuariosPorFiltro,
  SolicitudEditarUnUsuario,
} from "../api/authUsuarios";
import { UsuariosContext } from "../context/UsuariosContext";
// IMPORTAMOS LAS AYUDAS
import { TOKEN_DE_ACCESO_SISTEMA } from "../helpers/Constantes";

export const ProveedorUsuarios = ({ children }) => {
  const IniciarSesionUsuario = async (data) => {
    try {
      const res = await SolicitudIniciarSesionUsuario(data);
      if (res.data) {
        const TOKEN_RECIBIDO = res.data.token;
        Cookies.set(TOKEN_DE_ACCESO_SISTEMA, TOKEN_RECIBIDO, {
          expires: 1,
          secure: true,
        });
        return res.data;
      }
    } catch (error) {
      return error;
    }
  };
  const RegistrarNuevoUsuario = async (data) => {
    try {
      const res = await SolicitudRegistrarNuevoUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarUsuariosPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarUsuariosPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const EditarUnUsuario = async (data) => {
    try {
      const res = await SolicitudEditarUnUsuario(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const ActualizarMiInformacion = async (data) => {
    try {
      const res = await SolicitudActualizarMiInformacion(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        IniciarSesionUsuario,
        ActualizarMiInformacion,
        RegistrarNuevoUsuario,
        BuscarUsuariosPorFiltro,
        EditarUnUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
