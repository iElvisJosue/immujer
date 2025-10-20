// LIBRERÍAS A USAR
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// CONTEXTOS A USAR
import { useSistemaContext } from "../../context/SistemaContext";
// COMPONENTES A USAR
import GenerarReporte from "../../components/llamadas/Reporte/GenerarReporte";
import DetallesLlamada from "../../components/llamadas/Lista/DetallesLlamada";
import ListaCompletaLlamadas from "../../components/llamadas/Lista/ListaCompletaLlamadas";
import ListaPorFechaLlamadas from "../../components/llamadas/Lista/ListaPorFechaLlamadas";
// AYUDAS A USAR
import { ObtenerFechaActual } from "../../helpers/FuncionesGenerales";

export default function useLlamadas() {
  const { infUsuario } = useSistemaContext();
  // ESTABLECEMOS EL VALOR INICIAL DE LA VISTA
  // ESTO ES POR SI VIENEN DE LA NOTIFICACION
  const [searchParams] = useSearchParams();
  const vistaInicial = Number(searchParams.get("Vista")) || 0;
  const [subvistaActual, establecerSubvistaActual] = useState(vistaInicial);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [vieneDeVistaCompleta, establecerVieneDeVistaCompleta] = useState(true);
  const [idLlamadaSeleccionada, establecerIdLlamadaSeleccionada] =
    useState(null);
  // OBTENEMOS LA FECHA ACTUAL (PARA LA VISTA DE LLAMADAS POR FECHAS)
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());

  // EFECTO PARA PODER RECARGAR LA VISTA ACTUAL SI VIENE
  // DESDE LOS PARAMETROS DE LA URL, YA QUE SI ESTA EN LA
  // RUTA DE /Llamadas SIN ESTE ESTADO, NO SE CAMBIARIA DE VISTA
  useEffect(() => {
    const vista = searchParams.get("Vista");
    establecerSubvistaActual(Number(vista) || 0);
  }, [searchParams]);

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
    {
      Imagen: "Imagenes/Excel.png",
      AltImagen: "Reportes",
      Texto: "Reportes",
    },
  ];
  const TitulosSubvista = [
    "Lista completa",
    "Lista por fechas",
    "Generar reporte",
    "Detalles de la llamada",
  ];
  const ListaComponentes = {
    0: ListaCompletaLlamadas,
    1: ListaPorFechaLlamadas,
    2: GenerarReporte,
    3: DetallesLlamada,
  };
  const ComponenteParaRenderizar = ListaComponentes[subvistaActual];

  return {
    PropsVista: {
      subvistaActual,
      TituloSubvista: TitulosSubvista[subvistaActual],
      vieneDeVistaCompleta,
      OpcionesDeNavegacion,
      establecerSubvistaActual,
      ComponenteParaRenderizar,
      establecerVieneDeVistaCompleta,
    },
    PropsContenido: {
      primeraFecha,
      segundaFecha,
      filtroBusqueda,
      idLlamadaSeleccionada,
      establecerPrimeraFecha,
      establecerSegundaFecha,
      establecerFiltroBusqueda,
      establecerIdLlamadaSeleccionada,
    },
    PropsUsuario: {
      idUsuario: infUsuario.id_usuario,
    },
  };
}
