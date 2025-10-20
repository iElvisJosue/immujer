/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { LISTA_SVGS } from "../../../helpers/SVGs";
// IMPORTAMOS LOS ESTILOS
import "../../../styles/components/notificaciones/Lista/ModalEstadisticasNotificacion.css";

export default function ModalEstadisticasNotificacion({
  cargando,
  estadisticas,
  onCerrarModal,
}) {
  const {
    Clicks,
    EnviosExitosos,
    EnviosFallidos,
    Pendientes,
    TasaApertura,
    uuidNotificacion,
  } = estadisticas;

  return (
    <div className="ModalEstadisticasNotificacion">
      <div className="ModalEstadisticasNotificacion__Contenido">
        {cargando ? (
          <Cargando Texto="Cargando estadísticas..." />
        ) : (
          <>
            <button
              type="button"
              className="ModalEstadisticasNotificacion__Contenido--CerrarModal"
              onClick={() => onCerrarModal()}
            >
              <ion-icon name="close"></ion-icon>
            </button>
            <span className="ModalEstadisticasNotificacion__Contenido--ImagenTitulo">
              <img
                src="Imagenes/Detalles_Notificacion.png"
                alt="Imagen enviar notificación"
              />
              <h1>Estadísticas de la notificación</h1>
            </span>
            <div className="ModalEstadisticasNotificacion__Contenido--Informacion Clicks">
              <LISTA_SVGS SVG="CLICKS" Box="0 0 512 512" Clase="SVG Blanco" />
              <p>Clics en la notificación</p>
              <b>{Clicks || 0}</b>
            </div>
            <div className="ModalEstadisticasNotificacion__Contenido--Informacion Enviados">
              <LISTA_SVGS SVG="NOTIFICACIONES" Clase="SVG Blanco" />
              <p>Notificaciones enviadas</p>
              <b>{EnviosExitosos || 0}</b>
            </div>
            <div className="ModalEstadisticasNotificacion__Contenido--Informacion EnviosFallidos">
              <LISTA_SVGS
                SVG="NOTIFICACION_ERROR"
                Clase="SVG Blanco"
                Tamaño="20"
              />
              <p>Envíos fallidos</p>
              <b>{EnviosFallidos || 0}</b>
            </div>
            <div className="ModalEstadisticasNotificacion__Contenido--Informacion Pendientes">
              <LISTA_SVGS SVG="RELOJ" Clase="SVG Blanco" />
              <p>Envíos pendientes</p>
              <b>{Pendientes || 0}</b>
            </div>
            <div className="ModalEstadisticasNotificacion__Contenido--Informacion Apertura">
              <LISTA_SVGS SVG="ENTRAR" Clase="SVG Blanco" />
              <p>Tasa de apertura (%)</p>
              <b>{TasaApertura || 0}%</b>
            </div>
            <small className="ModalEstadisticasNotificacion__Contenido--TextoInformativo">
              {uuidNotificacion || ""}
            </small>
          </>
        )}
      </div>
    </div>
  );
}
