/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { SolicitudVerificarToken } from "../api/authSistema";
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

  return (
    <SistemaContext.Provider
      value={{
        infUsuario,
        tieneCookie,
        cargandoInformacion,
        obtenerInformacionNuevamente,
        establecerObtenerInformacionNuevamente,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
};
