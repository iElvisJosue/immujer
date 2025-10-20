/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useObtenerEstadisticasNotificacion from "../../../hooks/notificaciones/Lista/useObtenerEstadisticasNotificacion";
import useBuscarNotificacionesPorFiltro from "../../../hooks/notificaciones/Lista/useBuscarNotificacionesPorFiltro";
// COMPONENTES A USAR
import Cargando from "../../global/Cargando";
import Buscador from "../../global/Buscardor";
import SinResultados from "../../global/SinResultados";
import InformacionRegistro from "../../global/InformacionRegistro";
import ModalEstadisticasNotificacion from "./ModalEstadisticasNotificacion";
// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../../helpers/Urls";
import { FormatearFechaALetra } from "../../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../../styles/components/notificaciones/Lista/ListaCompletaNotificaciones.css";

export default function ListaCompletaNotificaciones({
  PropsContenido: { filtroBusqueda, establecerFiltroBusqueda },
}) {
  const { listaDeNotificaciones, cargandoNotificaciones } =
    useBuscarNotificacionesPorFiltro({
      filtroBusqueda,
    });
  const {
    cargando,
    estadisticas,
    verModalDetalles,
    establecerVerModalDetalles,
    EstablecerUUIDYVerModal,
  } = useObtenerEstadisticasNotificacion();

  return (
    <section className="ListaCompletaNotificaciones">
      {verModalDetalles && (
        <ModalEstadisticasNotificacion
          cargando={cargando}
          estadisticas={estadisticas}
          onCerrarModal={() => establecerVerModalDetalles(false)}
        />
      )}
      <Buscador
        TextoLabel="Buscar notificaciones"
        ValorInput={filtroBusqueda}
        FiltroBusqueda={establecerFiltroBusqueda}
      />
      {cargandoNotificaciones ? (
        <Cargando Texto="Cargando notificaciones..." />
      ) : listaDeNotificaciones.length > 0 ? (
        listaDeNotificaciones.map((infNotificacion) => (
          <InformacionRegistro
            key={infNotificacion.id_notificacion_celular}
            Imagen={`${
              infNotificacion.imagen
                ? `${HOST_IMAGENES}/Notificaciones/${infNotificacion.imagen}`
                : "Imagenes/Alerta_Exito_Notificacion.png"
            }`}
            Titulo={infNotificacion.titulo}
            ID={infNotificacion.id_notificacion_celular}
            Descripcion={infNotificacion.detalles}
            Detalles={`Enviada el ${FormatearFechaALetra(
              infNotificacion.fecha_creacion.slice(0, 10)
            )} a las ${infNotificacion.hora_creacion}`}
            // Color={infNotificacion.activo ? "" : "Rojo"}
            FuncionParaRealizar={() =>
              EstablecerUUIDYVerModal(infNotificacion.uuid_notificacion)
            }
          />
        ))
      ) : (
        <SinResultados>¡No se encontraron notificaciones!</SinResultados>
      )}
    </section>
  );
}
