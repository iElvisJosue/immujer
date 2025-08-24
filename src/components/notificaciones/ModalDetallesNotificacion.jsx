/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { LISTA_SVGS } from "../../helpers/SVGs";
// IMPORTAMOS LOS ESTILOS
import "../../styles/components/notificaciones/ModalDetallesNotificacion.css";

export default function ModalDetallesNotificacion({
  cargandoInfNotificacion,
  infNotificacion,
  onCerrarModal,
}) {
  return (
    <div className="ModalDetallesNotificacion">
      <div className="ModalDetallesNotificacion__Contenido">
        {cargandoInfNotificacion ? (
          <Cargando Texto="Cargando detalles..." />
        ) : (
          <>
            <button
              type="button"
              className="ModalDetallesNotificacion__Contenido--CerrarModal"
              onClick={() => onCerrarModal()}
            >
              <ion-icon name="close"></ion-icon>
            </button>
            <span className="ModalDetallesNotificacion__Contenido--ImagenTitulo">
              <img
                src="Imagenes/Detalles_Notificacion.png"
                alt="Imagen enviar notificación"
              />
              <h1>Detalles de la notificación</h1>
            </span>
            <div className="ModalDetallesNotificacion__Contenido--Informacion Clicks">
              <LISTA_SVGS SVG="CLICKS" Box="0 0 512 512" Clase="SVG Blanco" />
              <p>Clics en la notificación</p>
              <b>{infNotificacion.Clicks}</b>
            </div>
            <div className="ModalDetallesNotificacion__Contenido--Informacion Enviados">
              <LISTA_SVGS SVG="NOTIFICACIONES" Clase="SVG Blanco" />
              <p>Notificaciones enviadas</p>
              <b>{infNotificacion.EnviosExitosos}</b>
            </div>
            <div className="ModalDetallesNotificacion__Contenido--Informacion EnviosFallidos">
              <LISTA_SVGS
                SVG="NOTIFICACION_ERROR"
                Clase="SVG Blanco"
                Tamaño="20"
              />
              <p>Envíos fallidos</p>
              <b>{infNotificacion.EnviosFallidos}</b>
            </div>
            <div className="ModalDetallesNotificacion__Contenido--Informacion Pendientes">
              <LISTA_SVGS SVG="RELOJ" Clase="SVG Blanco" />
              <p>Envíos pendientes</p>
              <b>{infNotificacion.Pendientes}</b>
            </div>
            <div className="ModalDetallesNotificacion__Contenido--Informacion Apertura">
              <LISTA_SVGS SVG="ENTRAR" Clase="SVG Blanco" />
              <p>Tasa de apertura (%)</p>
              <b>{infNotificacion.TasaApertura}%</b>
            </div>
            <small className="ModalDetallesNotificacion__Contenido--TextoInformativo">
              {infNotificacion.uuidNotificacion}
            </small>
          </>
        )}
      </div>
    </div>
  );
}
