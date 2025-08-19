// LIBRERÍAS A USAR
import { useState } from "react";
export default function useDependencias() {
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [infDependenciaSeleccionada, establecerInfDependenciaSeleccionada] =
    useState(null);
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Lista_Completa.png",
      AltImagen: "Lista completa",
      Texto: "Lista completa",
    },
    {
      Imagen: "Imagenes/Registrar.png",
      AltImagen: "Registrar dependencia",
      Texto: "Registrar",
    },
  ];
  const TitulosSubvista = ["Lista completa", "Registrar", "Editar"];
  const PropsCompartidos = {
    infDependenciaSeleccionada,
    establecerInfDependenciaSeleccionada,
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
