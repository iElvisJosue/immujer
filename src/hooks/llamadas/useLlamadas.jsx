// LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LAS AYUDAS
import { ObtenerFechaActual } from "../../helpers/FuncionesGenerales";
export default function useLlamdas() {
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [vieneDeVistaCompleta, establecerVieneDeVistaCompleta] = useState(true);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [infLlamadaSeleccionada, establecerInfLlamadaSeleccionada] =
    useState(null);
  // OBTENEMOS LA FECHA ACTUAL (PARA LA VISTA DE LLAMADAS POR FECHAS)
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Lista_Completa.png",
      AltImagen: "Lista completa de llamadas",
      Texto: "Lista completa",
    },
    {
      Imagen: "Imagenes/Lista_Fechas.png",
      AltImagen: "Lista por fechas de llamadas",
      Texto: "Lista por fechas",
    },
  ];
  const TitulosSubvista = [
    "Lista completa",
    "Lista por fechas",
    "Detalles de la llamada",
  ];
  const PropsCompartidos = {
    infLlamadaSeleccionada,
    establecerInfLlamadaSeleccionada,
    filtroBusqueda,
    establecerFiltroBusqueda,
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
    subvistaActual,
    establecerSubvistaActual,
    vieneDeVistaCompleta,
    establecerVieneDeVistaCompleta,
  };
  return {
    TitulosSubvista,
    OpcionesDeNavegacion,
    PropsCompartidos,
  };
}
