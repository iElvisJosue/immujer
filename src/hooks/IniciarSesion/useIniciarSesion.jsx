// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";
// AYUDAS A USAR
import {
  AlertaDePregunta,
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../helpers/TiposDeAlertas";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { TOKEN_DE_ACCESO_SISTEMA } from "../../helpers/Constantes";
import { MOSTRAR, OCULTAR } from "../../helpers/MagicStrings";
export default function useIniciarSesion({ handleSubmit }) {
  const [mostrarContraseña, establecerMostrarContraseña] = useState(false);
  const [iconoMostrarOcultar, establecerIconoMostrarOcultar] =
    useState(MOSTRAR);
  const navigate = useNavigate();
  const { IniciarSesionUsuario } = useUsuarios();
  useEffect(() => {
    // SI NO EXISTE LA COOKIE DE INTENTOS DE INICIAR SESIÓN, LA CREAMOS
    VerificarCookieDeintentos();
    if (Cookies.get()[TOKEN_DE_ACCESO_SISTEMA]) {
      AlertaDePregunta({
        Titulo: "¡Tienes una sesión activa!",
        Mensaje: "¿Quieres ir al menú principal?",
        TextoBotonCancelar: "No",
        TextoBotonConfirmar: "Si, ir al menú principal",
        FuncionParaRealizar: () => navigate("/Llamadas"),
      });
    }
  }, []);

  const PeticionIniciarSesion = handleSubmit(async (data) => {
    // SI NO EXISTE LA COOKIE DE INTENTOS DE INICIAR SESIÓN, LA CREAMOS
    VerificarCookieDeintentos();
    // SI LA CANTIDAD DE INTENTOS ES IGUAL O MENOR A 0, MOSTRAMOS UNA ALERTA
    if (ValidarCantidadDeIntentos()) {
      return AlertaInformativa({
        Titulo: "¡Intentos agotados!",
        Mensaje:
          "Has agotado tus 5 intentos de iniciar sesión, por favor vuelve a intentarlo en 15 minutos.",
        Imagen: "Imagenes/Alerta_SinIntentos.png",
        ColorAlerta: "Naranja",
      });
    }
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      const res = await IniciarSesionUsuario(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
        RestarIntentosDeIniciarSesion();
      } else {
        // REINICIAMOS LA CANTIDAD DE INTENTOS DE INICIAR SESIÓN
        EstablecerCookieDeIntentos();
        window.location.href = "/Llamadas";
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarRespuestasDelServidor({ status, data });
    }
  });
  const ManejarMostrarContraseña = () => {
    const InputContraseña = document.getElementById("ContrasenaUsuario");
    establecerMostrarContraseña(!mostrarContraseña);
    if (iconoMostrarOcultar === MOSTRAR) {
      establecerIconoMostrarOcultar(OCULTAR);
      InputContraseña.type = "text";
    } else {
      establecerIconoMostrarOcultar(MOSTRAR);
      InputContraseña.type = "password";
    }
  };
  const VerificarCookieDeintentos = () => {
    if (!Cookies.get("IntentosDeIniciarSesion")) {
      EstablecerCookieDeIntentos();
    }
  };
  const EstablecerCookieDeIntentos = () => {
    Cookies.set("IntentosDeIniciarSesion", "5", { expires: 15 / 1440 });
  };
  const RestarIntentosDeIniciarSesion = () => {
    const IntentosDeIniciarSesion = Cookies.get("IntentosDeIniciarSesion");
    Cookies.set("IntentosDeIniciarSesion", IntentosDeIniciarSesion - 1, {
      expires: 15 / 1440,
    });
  };
  const ValidarCantidadDeIntentos = () => {
    const IntentosDeIniciarSesion = Cookies.get("IntentosDeIniciarSesion");
    return IntentosDeIniciarSesion <= 0;
  };

  return {
    PeticionIniciarSesion,
    ManejarMostrarContraseña,
    iconoMostrarOcultar,
  };
}
