// LIBRERÍAS A USAR
import { useState } from "react";
// CONTEXTOS A USAR
import { useSistemaContext } from "../../context/SistemaContext";
// COMPONENTES A USAR
import EnviarNotificacion from "../../components/notificaciones/Enviar/EnviarNotificacion";
import ListaCompletaNotificaciones from "../../components/notificaciones/Lista/ListaCompletaNotificaciones";

export default function useNotificaciones() {
  const { infUsuario } = useSistemaContext();
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");

  const ListaComponentes = {
    0: ListaCompletaNotificaciones,
    1: EnviarNotificacion,
  };
  const TitulosSubvista = ["Enviadas", "Nueva notificación"];
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Notificaciones_Enviadas.png",
      AltImagen: "Lista de notificaciones enviadas",
      Texto: "Enviadas",
    },
    {
      Imagen: "Imagenes/Enviar_Notificacion.png",
      AltImagen: "Enviar nueva notificacion",
      Texto: "Enviar",
    },
  ];
  const ComponenteParaRenderizar = ListaComponentes[subvistaActual];

  return {
    PropsVista: {
      subvistaActual,
      TituloSubvista: TitulosSubvista[subvistaActual],
      OpcionesDeNavegacion,
      establecerSubvistaActual,
      ComponenteParaRenderizar,
    },
    PropsContenido: {
      filtroBusqueda,
      establecerFiltroBusqueda,
    },
    PropsUsuario: {
      idUsuario: infUsuario.id_usuario,
    },
  };
}
