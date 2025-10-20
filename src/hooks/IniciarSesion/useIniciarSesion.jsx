// LIBRERÍAS A USAR
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
// CONTEXTOS A USAR
import { useUsuariosContext } from "../../context/UsuariosContext";
// AYUDAS A USAR
import {
  AlertaDePregunta,
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../helpers/TiposDeAlertas";
import { ReproducirAudio } from "../../helpers/Audios";
import { MOSTRAR, OCULTAR } from "../../helpers/MagicStrings";
import { TOKEN_DE_ACCESO_SISTEMA } from "../../helpers/Constantes";

export default function useIniciarSesion({ handleSubmit }) {
  const { IniciarSesion } = useUsuariosContext();
  const [mostrarContraseña, establecerMostrarContraseña] = useState(false);
  const [iconoMostrarOcultar, establecerIconoMostrarOcultar] =
    useState(MOSTRAR);

  useEffect(() => {
    // SI NO EXISTE LA COOKIE DE INTENTOS DE INICIAR SESIÓN, LA CREAMOS
    VerificarCookieDeintentos();
    // MOSTRAMOS UNA ALERTA DE SESION ACTIVA SOLO SI EL USUARIO TIENE
    // UNA COOKIE DE ACCESO
    if (Cookies.get()[TOKEN_DE_ACCESO_SISTEMA]) {
      AlertaDePregunta({
        Titulo: "¡Tienes una sesión activa!",
        Mensaje: "¿Quieres ir al menú principal?",
        TextoBotonCancelar: "No",
        TextoBotonConfirmar: "Si, ir al menú principal",
        FuncionParaRealizar: () => {
          window.location.href = "/Llamadas";
        },
      });
    }
  }, []);

  const PeticionIniciarSesion = handleSubmit(async (data) => {
    // AUDIO FANTASMA PARA HABILITAR EL SONIDO EN EL SISTEMA
    ReproducirAudio({ Volumen: 0 });
    // SI NO EXISTE LA COOKIE DE INTENTOS DE INICIAR SESIÓN, LA CREAMOS
    VerificarCookieDeintentos();
    // SI LA CANTIDAD DE INTENTOS ES IGUAL O MENOR A 0, NO HACEMOS NADA
    if (!TieneIntentosDeIniciarSesion()) return;
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    const res = await IniciarSesion(data);
    if (res.exito) {
      // CREAMOS UNA CLAVE EN LS PARA SABER SI ES LA PRIMERA
      // VEZ QUE INGRESA AL SISTEMA, PERO SOLO SI NO EXISTE
      CrearItemPrimeraVez();
      // REINICIAMOS LA CANTIDAD DE INTENTOS DE INICIAR SESIÓN
      EstablecerCookieDeIntentos();
      window.location.href = "/Llamadas";
    } else {
      RestarIntentosDeIniciarSesion();
    }
  });
  const CrearItemPrimeraVez = () => {
    const ExistePrimeraVez = localStorage.getItem("PrimeraVez");
    if (!ExistePrimeraVez) {
      localStorage.setItem("PrimeraVez", true);
    }
  };
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
  const TieneIntentosDeIniciarSesion = () => {
    const IntentosDeIniciarSesion = Cookies.get("IntentosDeIniciarSesion");
    if (IntentosDeIniciarSesion <= 0) {
      AlertaInformativa({
        Titulo: "¡Intentos agotados!",
        Mensaje:
          "Has agotado tus 5 intentos de iniciar sesión, por favor vuelve a intentarlo en 15 minutos.",
        Imagen: "Imagenes/Alerta_SinIntentos.png",
        ColorAlerta: "Naranja",
      });
    }
    return IntentosDeIniciarSesion > 0;
  };

  return {
    PeticionIniciarSesion,
    ManejarMostrarContraseña,
    iconoMostrarOcultar,
  };
}
