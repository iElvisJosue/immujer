/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
// IMPORTAMOS LAS SOLICITUDES
import * as PvSistema from "../api/authSistema.js";
// IMPORTAMOS EL CONTEXTO
import { SistemaContext } from "../context/SistemaContext";
// IMPORTAMOS LAS AYUDA
import {
  MostrarNotificacion,
  SolicitarPermisosDeNotificacion,
} from "../helpers/Notificaciones";
import { HOST } from "../helpers/Urls";
import { ReproducirAudio } from "../helpers/Audios";
import { AlertaEstadoNotificacion } from "../helpers/TiposDeAlertas";
import { ManejarRespuestasDelServidor } from "../helpers/ManejarRespuestasDelServidor";

export const ProveedorSistema = ({ children }) => {
  // ESTADO PARA ALMACENAR TODA LA INFORMACION DEL USUARIO LOGUEADO
  const [infUsuario, establecerInfUsuario] = useState(null);
  // ESTADO PARA CONTROLAR SI EL USUARIO ESTA LOGUEADO
  // SIN LA COOKIE (LA CUAL CONTIENE EL TOKEN DE ACCESO DE 1 DIA),
  // BASICAMENTE NO PUEDE ESTAR EN EL SISTEMA
  const [tieneCookie, establecerTieneCookie] = useState(false);
  // ESTADO PARA MOSTRAR UN LOADER EN LO QUE OBTENEMOS
  // LA INFORMACION DEL USUARIO
  const [cargandoInformacion, establecerCargandoInformacion] = useState(true);
  // ESTADO PARA CONTROLAR SI SE DEBE O NO OBTENER LA
  // INFORMACIONDEL USUARIO NUEVAMENTE. UTIL PARA
  // CUANDO ACTUALIZA SU INFORMACIÓN PERSONAL
  const [obtenerInformacionNuevamente, establecerObtenerInformacionNuevamente] =
    useState(false);
  // ESTADO PARA CONTROLAR LOS PERMISOS DE NOTIFICACIONES, EN BASE
  // AL PEMISO, MOSTRAREMOS UNA U OTRA ALERTA
  const [permisosNotificaciones, establecerPermisosNotificaciones] = useState(
    Notification.permission,
  );
  // ESTADO PARA CONTROLAR EL REINTENTO DE SOLICTUD DE NOTIFICACIONES
  // EN EL SISTEMA POR SI LOS RECHAZA. (TIENE 3 INTENTOS POR DEFECTO)
  const [solicitarNotificaciones, establecerSolicitarNotificaciones] =
    useState(0);
  // ESTADOS PARA CONTROLAR INFORMACIÓN EN TIEMPO REAL DEL USUARIO
  // POR AHORA SOLO NOTIFICACIONES, LLAMADAS Y COORDENADAS DE UNA LLAMADA
  const [recargarLlamadas, establecerRecargarLlamadas] = useState(0);
  const [recargarNotificaciones, establecerRecargarNotificaciones] =
    useState(0);
  // REFERENCIA QUE SERVIRA PARA SABER SI DEBEMOS ACTUALIZAR LAS
  // COORDENADAS DE LA LLAMADA QUE ESTAMOS VIENDO ACTUALMENTE
  // EJEMPLO -> SI ESTAMOS VIENDO LA LLAMADA 1 PERO ESTAMOS
  // RECIBIENDO ACTUALIZACIONES DE LA LLAMADA 2, NO DEBEMOS
  // ACTUALIZAR LAS COORDENADAS DE LA LLAMADA 1, ASI EVITAMOS
  // QUE SE REALICEN PETICIONES COMPLETAMENTE INNECESARIAS
  const idLlamadaActualRef = useRef(null);
  const [recargarCoordenadas, establecerRecargarCoordenadas] = useState(0);

  const QuitarInformacionAlmacenada = () => {
    establecerInfUsuario(null);
    establecerTieneCookie(false);
    establecerCargandoInformacion(false);
  };
  const EstablecerInformacionObtenida = (info) => {
    establecerInfUsuario(info);
    establecerTieneCookie(true);
    establecerCargandoInformacion(false);
  };
  const EstablecerIdLlamadaActual = (idLlamada) => {
    idLlamadaActualRef.current = idLlamada;
  };
  // EFECTO PARA VALIDAR EL TOKEN (ESTA EN LA COOKIE)
  // SE VUELVE A ACTIVAR CUANDO SE RECARGA LA PÁGINA
  // CUANDO EL USUARIO SE LOGUEA O CUANDO EL USUARIO
  // ACTUALIZA SU INFORMACION PERSONAL
  useEffect(() => {
    const ESTA_LOGUEADO = Cookies.get("ESTA_LOGUEADO") === "true";
    /** Si el usuario no esta logueado, no hacemos nada **/
    if (!ESTA_LOGUEADO) {
      QuitarInformacionAlmacenada();
      return;
    }
    ValidarCookie();
  }, [obtenerInformacionNuevamente]);
  // EFECTO PARA SABER SI ES LA PRIMERA VEZ QUE INGRESA AL SISTEMA
  useEffect(() => {
    // SI NO HAY USUARIO LOGUEADO, NO HACEMOS NADA
    if (!infUsuario) return;
    // SI ESTAMOS EN LA RAIZ (LOGIN), NO HACEMOS NADA
    if (window.location.pathname === "/") return;
    // SI POR ALGUNA RAZÓN EL USUARIO TIENE LOS PERMISOS ANTES
    // DE QUE INGRESE AL SISTEMA, NO HACEMOS NADA
    if (permisosNotificaciones === "granted") return;
    // SI ESTA LOGUEADO, VERIFICAMOS SI ES LA PRIMERA VEZ
    // QUE INGRESA AL SISTEMA
    const PrimeraVez = localStorage.getItem("PrimeraVez");
    // SI ES LA PRIMERA VEZ QUE INGRESA AL SISTEMA Y ADEMAS NO ESTAMOS EN
    // LA RAIZ (LOGIN), MOSTRAMOS UNA ALERTA PERO NO SOLICITAMOS PERMISOS
    // DE NOTIFICACIONES HASTA QUE EL USUARIO TERMINE DE LEER EL MENSAJE Y PRESIONE EL BOTON
    if (PrimeraVez === "true") {
      AlertaEstadoNotificacion({
        Imagen: "Imagenes/Alerta_Bienvenida.png",
        Titulo: "¡Bienvenido a la plataforma!",
        Mensaje:
          "Para garantizar que no te pierdas información clave, las notificaciones son obligatorias. Por favor, concede los permisos de notificaciones.",
        TextoBoton: "Entendido, solicitar permisos",
        FuncionParaRealizar: async () => {
          localStorage.setItem("PrimeraVez", false);
          const res = await SolicitarPermisosDeNotificacion();
          establecerPermisosNotificaciones(res);
        },
      });
    }
    // SI NO ES LA PRIMERA VEZ QUE INGRESA AL SISTEMA,
    // SOLICITAMOS PERMISOS DIRECTAMENTE
    if (PrimeraVez === "false") {
      establecerSolicitarNotificaciones((prev) => prev + 1);
    }
  }, [infUsuario]);
  // EFECTO PARA CONTROLADOR LOS PERMISOS DE NOTIFICACIONES
  useEffect(() => {
    async function ManejarPermisosNotificacion() {
      // CERRAMOS LA ALERTA ACTUAL
      Swal.close();
      // SI CERRO EN LUGAR DE ACEPTAR O NEGAR, LE PEDIMOS
      // LOS PERMISOS DE NUEVO
      if (permisosNotificaciones === "default") {
        AlertaEstadoNotificacion({
          Imagen: "Imagenes/Alerta_Exito_Notificacion.png",
          Titulo: "¡Activa las notificaciones!",
          Mensaje:
            "Para recibir avisos en tiempo real y mejorar tu experiencia en el sistema, por favor, concede los permisos de notificaciones.",
          TextoBoton: "Solicitar permisos",
          FuncionParaRealizar: async () => {
            const res = await SolicitarPermisosDeNotificacion();
            establecerPermisosNotificaciones(res);
          },
        });
        return;
      }
      // SI SU NAVEGADOR ES INCOMPATIBLE, LE MOSTRAMOS UN MENSAJE
      // SUGIENDOLE QUE CAMBIE EL NAVEGADOR
      if (permisosNotificaciones === "incompatible") {
        AlertaEstadoNotificacion({
          Imagen: "Imagenes/Alerta_Navegador_Incompatible.png",
          Titulo: "¡Navegador incompatible!",
          Mensaje:
            "Tu navegador no es compatible con las notificaciones. Te recomendamos actualizarlo o usar otro para disfrutar de una mejor experiencia.",
        });
        return;
      }
      // SI NO TIENE PERMISOS DE NOTIFICACIONES, LE MOSTRAMOS UN MENSAJE
      if (permisosNotificaciones === "denied") {
        AlertaEstadoNotificacion({
          Imagen: "Imagenes/Alerta_Notificaciones_Denegadas.png",
          Titulo: "¡Notificaciones denegadas!",
          Mensaje:
            "Has rechazado las notificaciones. Activarlas te permitirá recibir avisos importantes y mejorar tu experiencia en el sistema.",
        });
        return;
      }
    }
    if (infUsuario) ManejarPermisosNotificacion();
  }, [solicitarNotificaciones, permisosNotificaciones]);
  // EFECTO PARA ESTABLECER LA CONEXION SSE (PARA NOTIFICACIONES EN TIEMPO REAL)
  useEffect(() => {
    if (!(infUsuario && permisosNotificaciones === "granted")) return;

    let SourceSSE = null;
    let TimeoutLider = null;
    let SoyPestanaLider = false;
    const CanalSSE = new BroadcastChannel("sse_canal_unico");

    // 1 -> ESTABLECEMOS LA CONEXION SSE
    const establecerConexion = () => {
      const TOKEN_ACCESO_SSE = Cookies.get("TOKEN_ACCESO_SSE");
      if (SourceSSE) return; // EVITAMOS QUE SE CREEN VARIAS CONEXIONES
      SourceSSE = new EventSource(
        `${HOST}api/web/sistema/establecer-conexion-sse/${TOKEN_ACCESO_SSE}`,
      );
      SourceSSE.onmessage = (event) => {
        console.log("Conectado...");
        const data = JSON.parse(event.data);
        CanalSSE.postMessage({ tipo: "sse-data", data });
        ProcesarTipoNotificacion(data);
      };
      SourceSSE.onerror = () => {
        SourceSSE.close();
        SourceSSE = null;
        setTimeout(() => {
          console.log("Reintentando reconectar...");
          if (SoyPestanaLider) {
            establecerConexion();
          }
        }, 5000);
      };
    };
    // 2 -> CONFIGURAMOS EL CANAL DE COMUNICACIÓN
    CanalSSE.onmessage = (event) => {
      const mensaje = event.data;
      if (mensaje.tipo === "sse-data") {
        ProcesarTipoNotificacion(mensaje.data);
      }
      // PREGUNTAR SI HAY LIDER
      else if (mensaje.tipo === "hay-lider?") {
        if (SoyPestanaLider) {
          console.log("📢 Soy líder");
          CanalSSE.postMessage({ tipo: "soy-lider" });
        }
      }
      //SI YA HAY LIDER, CANCELAR CONEXION SSE
      else if (mensaje.tipo === "soy-lider") {
        console.log("👀 Ya hay un líder, cancelando conexión SSE...");
        if (TimeoutLider) {
          clearTimeout(TimeoutLider);
          TimeoutLider = null;
        }
        SoyPestanaLider = false;
        if (SourceSSE) {
          SourceSSE.close();
          SourceSSE = null;
        }
      }
    };
    // 3 -> PREGUNTAMOS SI HAY LIDER
    console.log("❓ Preguntando si hay líder...");
    CanalSSE.postMessage({ tipo: "hay-lider?" });
    // 4 -> ESPERAMOS UNA RESPUESTA Y SI NO HAY,
    // ESTABLECEMOS ESTA PESTAÑA COMO LIDER
    TimeoutLider = setTimeout(() => {
      console.log("⏰ No hay líder, me convierto en líder");
      SoyPestanaLider = true;
      CanalSSE.postMessage({ tipo: "soy-lider" });
      establecerConexion();
    }, 300);

    return () => {
      if (TimeoutLider) {
        clearTimeout(TimeoutLider);
      }
      if (SourceSSE) {
        console.log("🔌 Cerrando conexión SSE");
        SourceSSE.close();
      }
      CanalSSE.close();
    };
  }, [infUsuario, permisosNotificaciones]);

  const ValidarCookie = async () => {
    try {
      const res = await PvSistema.SolicitudVerificarToken();
      EstablecerInformacionObtenida(res.data);
    } catch (err) {
      // ELIMINAMOS LA COOKIE
      const { status, data } = err.response || {};
      ManejarRespuestasDelServidor({ status, data });
      QuitarInformacionAlmacenada();
    }
  };
  const ProcesarTipoNotificacion = (data) => {
    const { tipoNotificacion, idLlamada } = data;
    // SI EL TIPO DE NOTIFICACION ES DE CONEXIÓN, NO HACEMOS NADA
    if (tipoNotificacion === "conectado") return;
    // SI EL TIPO DE NOTIFICACION ES DE LLAMADA NUEVA, MOSTRAMOS UNA NOTIFICACION
    if (tipoNotificacion === "llamada-nueva") {
      // OBTENEMOS NUEVAMENTE LAS NOTIFICACIONES DEL USUARIO
      establecerRecargarNotificaciones((prev) => prev + 1);
      // OBTENEMOS NUEVAMENTE LAS LLAMADAS DEL USUARIO
      establecerRecargarLlamadas((prev) => prev + 1);
      // REPRODUCIMOS EL SONIDO DE NOTIFICACION
      ReproducirAudio({});
      // MOSTRAMOS LA NOTIFICACION DEL NAVEGADOR
      MostrarNotificacion({
        Titulo: "¡Nueva llamada realizada!",
        Detalles: `Haz clic para ver la información completa de la llamada #${idLlamada}.`,
        ID: `llamada-nueva-${idLlamada}`,
        Silenciosa: true,
        onClick: () => {
          window.open(`/Llamadas?Vista=3&Id=${idLlamada}`, "_blank");
        },
      });
    }
    if (tipoNotificacion === "ubicacion-tiempo-real") {
      // SI LA LLAMADA QUE TENEMOS ABIERTA ACTUALMENTE ES LA QUE ESTA
      // ENVIANDO SU UBICACIÓN EN TIEMPO REAL, ACTUALIZAMOS SUS COORDENADAS
      // EN LA VISTA DE "DETALLES LLAMADA"
      if (idLlamada === idLlamadaActualRef.current) {
        establecerRecargarCoordenadas((prev) => prev + 1);
      }
    }
  };

  return (
    <SistemaContext.Provider
      value={{
        // ESTOS SOLO SON ESTADOS
        infUsuario,
        tieneCookie,
        recargarLlamadas,
        cargandoInformacion,
        recargarCoordenadas,
        recargarNotificaciones,
        obtenerInformacionNuevamente,
        establecerRecargarNotificaciones,
        establecerObtenerInformacionNuevamente,
        // ESTOS SON FUNCIONES
        EstablecerIdLlamadaActual,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
};
