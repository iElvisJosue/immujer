/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useBuscarNotificacionesPorFiltro from "../../hooks/notificaciones/useBuscarNotificacionesPorFiltro";
import useBuscarDetallesNotificacion from "../../hooks/notificaciones/useBuscarDetallesNotificacion";
// COMPONENTES A USAR
import Buscador from "../global/Buscardor";
import InformacionRegistro from "../global/InformacionRegistro";
import ModalDetallesNotificacion from "./ModalDetallesNotificacion";
import SinResultados from "../global/SinResultados";
import Cargando from "../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../helpers/Urls";
import { FormatearFechaALetra } from "../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../styles/components/notificaciones/ListaCompletaNotificaciones.css";

export default function ListaCompletaNotificaciones({
  filtroBusqueda,
  establecerFiltroBusqueda,
  // establecerSubvistaActual,
}) {
  const { listaDeNotificaciones, cargandoNotificaciones } =
    useBuscarNotificacionesPorFiltro({
      filtroBusqueda,
    });
  const {
    EstablecerUUIDYVerModal,
    verModalDetalles,
    establecerVerModalDetalles,
    infNotificacion,
    cargandoInfNotificacion,
  } = useBuscarDetallesNotificacion();

  return (
    <section className="ListaCompletaNotificaciones">
      {verModalDetalles && (
        <ModalDetallesNotificacion
          cargandoInfNotificacion={cargandoInfNotificacion}
          infNotificacion={infNotificacion}
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
            key={infNotificacion.id_notificacion_global}
            Imagen={`${
              infNotificacion.imagen
                ? `${HOST_IMAGENES}/Notificaciones/${infNotificacion.imagen}`
                : "Imagenes/Alerta_Exito_Notificacion.png"
            }`}
            Titulo={infNotificacion.titulo}
            ID={infNotificacion.id_notificacion_global}
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
