/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
useEffect(() => {
  if (!(infUsuario && permisosNotificaciones === "granted")) return;

  // Canal para comunicación entre pestañas del mismo navegador
  const channel = new BroadcastChannel("sse_canal_unico");
  let source = null;
  let esPestanaLider = false;

  // Función para procesar notificaciones (se ejecuta en TODAS las pestañas)
  const procesarNotificacion = (data) => {
    const { tipoNotificacion, idLlamada } = data;

    if (tipoNotificacion === "conectado") return;

    if (tipoNotificacion === "llamada-nueva") {
      establecerRecargarNotificaciones((prev) => prev + 1);
      establecerRecargarLlamadas((prev) => prev + 1);
      ReproducirAudio({});
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
  };

  // Función para establecer conexión SSE (solo la pestaña líder)
  const establecerConexion = () => {
    source = new EventSource(
      `${HOST}api/web/sistema/establecer-conexion-sse/${COOKIE_CON_TOKEN}`
    );

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Enviar el evento a TODAS las pestañas (incluyendo esta)
      channel.postMessage(data);

      // Procesar también en esta pestaña
      procesarNotificacion(data);
    };

    source.onerror = () => {
      source.close();
      setTimeout(() => {
        console.log("Reintentando reconectar...");
        if (esPestanaLider) {
          establecerConexion();
        }
      }, 5000);
    };
  };

  // Escuchar mensajes del canal (todas las pestañas)
  channel.onmessage = (event) => {
    // Si es un dato SSE, procesarlo
    if (event.data.tipoNotificacion) {
      procesarNotificacion(event.data);
    }
    // Si otra pestaña se declara líder, esta no debe serlo
    else if (event.data === "soy-lider") {
      esPestanaLider = false;
    }
  };

  // Preguntar si ya hay una pestaña líder
  channel.postMessage("hay-lider?");

  // Si nadie responde en 100ms, esta pestaña se vuelve líder
  const timeoutLider = setTimeout(() => {
    esPestanaLider = true;
    console.log("🎯 Esta pestaña establecerá la única conexión SSE");
    channel.postMessage("soy-lider");
    establecerConexion();
  }, 100);

  // Si alguien pregunta si hay líder y esta pestaña lo es, responder
  const manejarPregunta = (event) => {
    if (event.data === "hay-lider?" && esPestanaLider) {
      channel.postMessage("soy-lider");
    }
  };

  channel.addEventListener("message", manejarPregunta);

  return () => {
    clearTimeout(timeoutLider);
    channel.removeEventListener("message", manejarPregunta);

    if (source) {
      console.log("Cerrando conexión SSE");
      source.close();
    }

    channel.close();
  };
}, [infUsuario, permisosNotificaciones, reintentarConexionSSE]);
