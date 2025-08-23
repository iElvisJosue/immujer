/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS A USAR
import useEnviarNotificacionPersonalizada from "../../hooks/llamadas/useEnviarNotificacionPersonalizada";
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { LISTA_SVGS } from "../../helpers/SVGs";
import { MENSAJES_DE_VALIDACION } from "../../helpers/MensajesValidaciones";
// IMPORTAMOS LOS ESTILOS
import "../../styles/components/llamadas/ModalEnviarNotificacionPersonalizada.css";

export default function ModalEnviarNotificacionPersonalizada({
  idCreador,
  idUsuarioDestino,
  idOneSignal,
  NombreCompleto,
  onCerrarModal,
}) {
  const {
    register,
    CampoRequerido,
    enviandoNotificacion,
    PeticionEnviarNotificacion,
  } = useEnviarNotificacionPersonalizada({
    idCreador,
    idUsuarioDestino,
    idOneSignal,
    NombreCompleto,
    onCerrarModal,
  });

  return (
    <div className="ModalPersonalizado">
      <form
        className="ModalPersonalizado__Contenido"
        onSubmit={PeticionEnviarNotificacion}
      >
        {enviandoNotificacion ? (
          <Cargando Texto="Enviando notificación..." />
        ) : (
          <>
            <button
              type="button"
              className="ModalPersonalizado__Contenido--CerrarModal"
              onClick={() => onCerrarModal()}
            >
              <ion-icon name="close"></ion-icon>
            </button>
            <span className="ModalPersonalizado__Contenido--ImagenTitulo">
              <img
                src="Imagenes/Enviar_Notificacion.png"
                alt="Imagen enviar notificación"
              />
              <h1>Enviar notificación</h1>
            </span>
            <span className="ContenedorInput Completo">
              <div className="ContenedorInput__MaterialDesign">
                <span className="ContenedorInput__MaterialDesign--Icono">
                  <LISTA_SVGS SVG="NOTIFICACIONES" />
                </span>
                <input
                  id="TituloNotificacion"
                  name="TituloNotificacion"
                  type="text"
                  placeholder=" "
                  className="ContenedorInput__MaterialDesign--InputText SinBorde"
                  {...register("TituloNotificacion", {
                    required: MENSAJES_DE_VALIDACION.REQUERIDO,
                    maxLength: {
                      value: 60,
                      message: MENSAJES_DE_VALIDACION.MAX60,
                    },
                  })}
                />
                <label
                  htmlFor="TituloNotificacion"
                  className="ContenedorInput__MaterialDesign--Label"
                >
                  Titulo
                </label>
              </div>
              {CampoRequerido("TituloNotificacion")}
            </span>
            <span className="ContenedorInput Completo">
              <div className="ContenedorInput__MaterialDesign">
                <span className="ContenedorInput__MaterialDesign--Icono">
                  <LISTA_SVGS SVG="DOCUMENTO" />
                </span>
                <input
                  id="DetallesNotificacion"
                  name="DetallesNotificacion"
                  type="text"
                  placeholder=" "
                  className="ContenedorInput__MaterialDesign--InputText SinBorde"
                  {...register("DetallesNotificacion", {
                    required: MENSAJES_DE_VALIDACION.REQUERIDO,
                    maxLength: {
                      value: 255,
                      message: MENSAJES_DE_VALIDACION.MAX255,
                    },
                  })}
                />
                <label
                  htmlFor="DetallesNotificacion"
                  className="ContenedorInput__MaterialDesign--Label"
                >
                  Detalles
                </label>
              </div>
              {CampoRequerido("DetallesNotificacion")}
            </span>
            <button className="ModalPersonalizado__Contenido--Boton">
              Enviar notificación
            </button>
            <small className="ModalPersonalizado__Contenido--TextoInformativo">
              ¡La notificación se enviará únicamente a esta usuaria!
            </small>
          </>
        )}
      </form>
    </div>
  );
}
