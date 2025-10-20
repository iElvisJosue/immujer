/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// IMPORTAMOS LAS PETICIONES A USAR
import * as PvNotis from "../api/authNotificaciones";
// IMPORTAMOS EL CONTEXTO DEL PROVIDER
import { useSistemaContext } from "../context/SistemaContext";
import { NotificacionesContext } from "../context/NotificacionesContext";
// IMPORTAMOS LAS AYUDA
import { ManejarRespuestasDelServidor } from "../helpers/ManejarRespuestasDelServidor";

export const ProveedorNotificaciones = ({ children }) => {
  const { infUsuario, recargarNotificaciones } = useSistemaContext();
  const [notificacionesNoVistas, establecerNotificacionesNoVistas] = useState(
    []
  );

  // ESTADO PARA OBTENER LAS NOTIFICACIONES NO VISTAS DEL USUARIO
  useEffect(() => {
    async function ObtenerNoVistas() {
      try {
        const res = await PvNotis.SolicitudObtenerNoVistas({
          idUsuario: infUsuario.id_usuario,
        });
        if (res.status === 200) establecerNotificacionesNoVistas(res.data);
      } catch (error) {
        const { data, status } = error.response || {};
        ManejarRespuestasDelServidor({ status, data });
        return { exito: false, data };
      }
    }
    // SOLO SE OBTIENEN NOTIFICACIONES SI HAY USUARIO LOGUEADO
    if (infUsuario) ObtenerNoVistas();
  }, [recargarNotificaciones, infUsuario]);

  const BuscarPorFiltro = async (data) => {
    try {
      const res = await PvNotis.SolicitudBuscarPorFiltro(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const EnviarPush = async (data) => {
    try {
      const res = await PvNotis.SolicitudEnviarPush(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { data } = error.response || {};
      return { exito: false, data };
    }
  };
  const EnviarPushPersonalizada = async (data) => {
    try {
      const res = await PvNotis.SolicitudEnviarPushPersonalizada(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { data } = error.response || {};
      return { exito: false, data };
    }
  };
  const ObtenerEstadisticas = async (data) => {
    try {
      const res = await PvNotis.SolicitudObtenerEstadisticas(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const MarcarVista = async (data) => {
    try {
      const res = await PvNotis.SolicitudMarcarVista(data);
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };
  const MarcarTodasVistas = async (data) => {
    try {
      const res = await PvNotis.SolicitudMarcarTodasVistas(data);
      ManejarRespuestasDelServidor({ status: res.status, data: res.data });
      return { exito: true, data: res.data };
    } catch (error) {
      const { status, data } = error.response || {};
      ManejarRespuestasDelServidor({ status, data });
      return { exito: false, data };
    }
  };

  return (
    <NotificacionesContext.Provider
      value={{
        // ESTOS SOLO SON ESTADOS
        notificacionesNoVistas,
        // ESTAS SON LAS FUNCIONES QUE USAMOS
        // PARA LAS SOLICITUDES
        BuscarPorFiltro,
        EnviarPush,
        EnviarPushPersonalizada,
        ObtenerEstadisticas,
        MarcarVista,
        MarcarTodasVistas,
      }}
    >
      {children}
    </NotificacionesContext.Provider>
  );
};
