// LIBRERÍAS A USAR
import { useState } from "react";
export default function useUsuarios() {
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [infUsuarioSeleccionado, establecerInfUsuarioSeleccionado] =
    useState(null);
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Lista_Completa.png",
      AltImagen: "Lista completa de usuarios",
      Texto: "Lista completa",
    },
    {
      Imagen: "Imagenes/Registrar.png",
      AltImagen: "Registrar",
      Texto: "Registrar",
    },
  ];
  const TitulosSubvista = ["Lista completa", "Registrar", "Editar"];
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
