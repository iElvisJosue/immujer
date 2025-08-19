// LIBRERÍAS A USAR
import { useState } from "react";
export default function useBoletines() {
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [infBoletinSeleccionado, establecerInfBoletinSeleccionado] =
    useState(null);
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Lista_Completa.png",
      AltImagen: "Lista completa",
      Texto: "Lista completa",
    },
    {
      Imagen: "Imagenes/Registrar.png",
      AltImagen: "Registrar boletin",
      Texto: "Registrar",
    },
  ];
  const TitulosSubvista = ["Lista completa", "Registrar", "Editar"];
  const PropsCompartidos = {
    infBoletinSeleccionado,
    establecerInfBoletinSeleccionado,
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
