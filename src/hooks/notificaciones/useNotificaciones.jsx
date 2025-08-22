// LIBRERÍAS A USAR
import { useState } from "react";
export default function useNotificaciones() {
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [infUsuarioSeleccionado, establecerInfUsuarioSeleccionado] =
    useState(null);
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
  const TitulosSubvista = [
    "Notificaciones enviadas",
    "Enviar nueva notificación",
  ];
  const PropsCompartidos = {
    infUsuarioSeleccionado,
    establecerInfUsuarioSeleccionado,
    filtroBusqueda,
    establecerFiltroBusqueda,
    subvistaActual,
    establecerSubvistaActual,
  };
  return {
    OpcionesDeNavegacion,
    TitulosSubvista,
    PropsCompartidos,
  };
}
