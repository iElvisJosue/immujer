// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// CONTEXTO A USAR
import { useLlamadasContext } from "../../../context/LlamadasContext";
import { useSistemaContext } from "../../../context/SistemaContext";
// AYUDAS A USAR
import { AlertaInformativa } from "../../../helpers/TiposDeAlertas";
import { ESTADOS_LLAMADA } from "../../../helpers/Constantes";

export default function useDetallesLlamada({
  vieneDeVistaCompleta,
  idLlamadaSeleccionada,
  establecerSubvistaActual,
}) {
  const { recargarCoordenadas, EstablecerIdLlamadaActual } =
    useSistemaContext();
  const { ObtenerDetalles, ObtenerComentarios, ObtenerUbicaciones } =
    useLlamadasContext();
  // OBTENEMOS EL ID DE LA LLAMADA, SI VIENE DE LA NOTIFICACION
  // ENTONCES LO OBTENEMOS DE LOS PARAMETROS DE LA URL, DE LO CONTRARIO
  // LO OBTENEMOS DEL LISTADO
  const [searchParams, setSearchParams] = useSearchParams();
  const idLlamada = Number(searchParams.get("Id")) || idLlamadaSeleccionada;
  // ESTADOS PARA CONTROLAR LA INFORMACION DE LA LLAMADA
  // (DETALLES GENERALES, COORDENADAS, LOS COMENTARIOS QUE TIENE)
  const [detallesLlamada, establecerDetallesLlamada] = useState(null);
  const [cargandoDetalles, establecerCargandoDetalles] = useState(true);
  const [comentariosLlamada, establecerComentariosLlamada] = useState([]);
  const [cargandoComentarios, establecerCargandoComentarios] = useState(true);
  const [recargarComentarios, establecerRecargarComentarios] = useState(0);
  const [ubicacionesLlamada, establecerUbicacionesLlamada] = useState([]);
  const [cargandoUbicaciones, establecerCargandoUbicaciones] = useState(true);
  const [verUbicacionFinal, establecerVerUbicacionFinal] = useState(true);
  // ESTADOS PARA CONTROLAR LA VISIBILIDAD DE LOS MODALES
  const [verModalNotificacion, establecerVerModalNotificacion] =
    useState(false);
  const [verModalAgregarComentario, establecerVerModalAgregarComentario] =
    useState(false);
  const [verModalEstadoLlamada, establecerVerModalEstadoLlamada] =
    useState(false);

  // EFECTO PARA GUARDAR EL ID DE LA LLAMADA ACTUAL Y ASI
  // VALIDAR SI DEBEMOS ACTUALIZAR SUS COORDENADAS EN TIEMPO REAL
  // DATO -> AL DESMONTAR EL COMPONENTE QUITAMOS EL ID DE LA LLAMADA
  useEffect(() => {
    EstablecerIdLlamadaActual(idLlamada);
    return () => {
      EstablecerIdLlamadaActual(null);
    };
  }, [idLlamada]);

  // EFECTO PARA OBTENER LOS DETALLES DE LA LLAMADA
  useEffect(() => {
    async function ObtenerDetallesLlamada() {
      try {
        // MOSTRAMOS EL LOADER TRAS UNA NUEVA BUSQUEDA
        // (POR SI EDITAN EL ID EN LA URL)
        establecerCargandoDetalles(true);
        const res = await ObtenerDetalles({ idLlamada });
        if (res.exito) {
          establecerDetallesLlamada({ ...res.data[0], id_llamada: idLlamada });
          // SI LA LLAMADA YA ESTA EN FASE DE CIERRE
          // (ATENDIDA, INVALIDA) ENTONCES MOSTRAMOS UNA ALERTA
          if (res.data[0].fase !== ESTADOS_LLAMADA.Pendiente) {
            MostrarAlertaFaseCierre(res.data[0]);
          }
        }
      } finally {
        establecerCargandoDetalles(false);
      }
    }
    ObtenerDetallesLlamada();
  }, [idLlamada]);
  // EFECTO PARA OBTENER LOS COMENTARIOS DE LA LLAMADA
  useEffect(() => {
    async function ObtenerComentariosLlamada() {
      try {
        const res = await ObtenerComentarios({ idLlamada });
        if (res.exito) establecerComentariosLlamada(res.data);
      } finally {
        establecerCargandoComentarios(false);
      }
    }
    ObtenerComentariosLlamada();
  }, [idLlamada, recargarComentarios]);
  // EFECTO PARA VOLVER A OBTENER LAS CC DE LA LLAMADA
  useEffect(() => {
    async function ObtenerCoordenadas() {
      try {
        const res = await ObtenerUbicaciones({ idLlamada });
        if (res.exito) establecerUbicacionesLlamada(res.data[0]);
      } finally {
        establecerCargandoUbicaciones(false);
      }
    }
    ObtenerCoordenadas();
  }, [recargarCoordenadas]);

  function MostrarAlertaFaseCierre(infLlamada) {
    const { fase } = infLlamada;
    const NombreQuienModifico = `${infLlamada.nombre_modificador} ${infLlamada.apellido_paterno_modificador} ${infLlamada.apellido_materno_modificador}`;
    const ColoresAlerta = {
      [ESTADOS_LLAMADA.Invalida]: {
        Imagen: "Imagenes/Ban.png",
        ColorAlerta: "Rojo",
      },
      [ESTADOS_LLAMADA.Atendida]: {
        Imagen: "Imagenes/Alerta_Exito.png",
        ColorAlerta: "Verde",
      },
    };
    AlertaInformativa({
      Titulo: fase.toUpperCase(),
      Imagen: ColoresAlerta[fase].Imagen,
      Mensaje: `Esta llamada ha sido marcada como ${fase} por ${NombreQuienModifico.toUpperCase()}.`,
      ColorAlerta: ColoresAlerta[fase].ColorAlerta,
    });
  }
  const ManejarVistaDeRegreso = () => {
    setSearchParams({});
    establecerSubvistaActual(vieneDeVistaCompleta ? 0 : 1);
  };

  return {
    detallesLlamada,
    cargandoDetalles,
    comentariosLlamada,
    ubicacionesLlamada,
    cargandoUbicaciones,
    cargandoComentarios,
    verUbicacionFinal,
    verModalNotificacion,
    verModalEstadoLlamada,
    ManejarVistaDeRegreso,
    verModalAgregarComentario,
    establecerRecargarComentarios,
    establecerVerUbicacionFinal,
    establecerVerModalNotificacion,
    establecerVerModalEstadoLlamada,
    establecerVerModalAgregarComentario,
  };
}
