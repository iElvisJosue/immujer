/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  SolicitudVerificarToken,
  SolicitudBuscarNotificacionesPorFiltro,
  SolicitudEnviarNotificacionGlobal,
  SolicitudEnviarNotificacionPersonalizada,
  SolicitudBuscarDetallesNotificacion,
} from "../api/authSistema";
import { SistemaContext } from "../context/SistemaContext";
// IMPORTAMOS LAS AYUDAS
import { TOKEN_DE_ACCESO_SISTEMA } from "../helpers/Constantes";

export const ProveedorSistema = ({ children }) => {
  const [infUsuario, establecerInfUsuario] = useState(null);
  const [tieneCookie, establecerTieneCookie] = useState(false);
  const [cargandoInformacion, establecerCargandoInformacion] = useState(true);
  const [obtenerInformacionNuevamente, establecerObtenerInformacionNuevamente] =
    useState(false);

  const QuitarInformacionAlmacenada = () => {
    establecerInfUsuario(null);
    establecerTieneCookie(false);
    establecerCargandoInformacion(false);
  };

  const EstablecerInformacionObtenida = (res) => {
    const { InformacionUsuario } = res;
    establecerInfUsuario(InformacionUsuario);
    establecerTieneCookie(true);
    establecerCargandoInformacion(false);
    return res;
  };

  useEffect(() => {
    ValidarCookie();
  }, [obtenerInformacionNuevamente]);

  const ValidarCookie = async () => {
    const cookies = Cookies.get();
    if (!cookies[TOKEN_DE_ACCESO_SISTEMA]) {
      return QuitarInformacionAlmacenada();
    }
    try {
      const res = await SolicitudVerificarToken({
        TOKEN_DE_ACCESO_SISTEMA: cookies[TOKEN_DE_ACCESO_SISTEMA],
      });
      if (res.data) {
        EstablecerInformacionObtenida(res.data);
      }
    } catch (err) {
      console.log(err);
      QuitarInformacionAlmacenada();
    }
  };

  const BuscarNotificacionesPorFiltro = async (data) => {
    try {
      const res = await SolicitudBuscarNotificacionesPorFiltro(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const EnviarNotificacionGlobal = async (data) => {
    try {
      const res = await SolicitudEnviarNotificacionGlobal(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const EnviarNotificacionPersonalizada = async (data) => {
    try {
      const res = await SolicitudEnviarNotificacionPersonalizada(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const BuscarDetallesNotificacion = async (data) => {
    try {
      const res = await SolicitudBuscarDetallesNotificacion(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  return (
    <SistemaContext.Provider
      value={{
        infUsuario,
        tieneCookie,
        cargandoInformacion,
        obtenerInformacionNuevamente,
        establecerObtenerInformacionNuevamente,
        BuscarNotificacionesPorFiltro,
        EnviarNotificacionGlobal,
        EnviarNotificacionPersonalizada,
        BuscarDetallesNotificacion,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
};
