/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS A USAR
import useAgregarComentario from "../../../hooks/llamadas/Lista/useAgregarComentario";
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { MENSAJES_DE_VALIDACION } from "../../../helpers/MensajesValidaciones";
// IMPORTAMOS LOS ESTILOS
import "../../../styles/components/llamadas/Lista/ModalAgregarComentario.css";

export default function ModalAgregarComentario({
  idLlamada,
  idUsuario,
  onRecargar,
  onCerrarModal,
}) {
  const {
    register,
    CampoRequerido,
    agregandoComentario,
    PeticionAgregarComentarioLlamada,
  } = useAgregarComentario({
    idLlamada,
    idUsuario,
    onRecargar,
    onCerrarModal,
  });

  return (
    <div className="ModalAgregarComentario">
      <form
        className="ModalAgregarComentario__Contenido"
        onSubmit={PeticionAgregarComentarioLlamada}
      >
        {agregandoComentario ? (
          <Cargando Texto="Agregando comentario..." />
        ) : (
          <>
            <button
              type="button"
              className="ModalAgregarComentario__Contenido--CerrarModal"
              onClick={() => onCerrarModal()}
            >
              <ion-icon name="close"></ion-icon>
            </button>
            <span className="ModalAgregarComentario__Contenido--ImagenTitulo">
              <img
                src="Imagenes/Escribir_Comentario.png"
                alt="Escribir comentario"
              />
              <h1>Agregar comentario</h1>
            </span>
            {/* CONTENIDO COMENTARIO */}
            <span className="ContenedorInput">
              <div className="ContenedorInput__MaterialDesign">
                <textarea
                  id="Comentario"
                  name="Comentario"
                  type="text"
                  placeholder="Escribe aquí..."
                  className="ContenedorInput__MaterialDesign--InputText SinBorde TextArea"
                  {...register("Comentario", {
                    required: MENSAJES_DE_VALIDACION.REQUERIDO,
                    maxLength: {
                      value: 1000,
                      message: MENSAJES_DE_VALIDACION.MAX1000,
                    },
                  })}
                />
              </div>
              {CampoRequerido("Comentario")}
            </span>
            <button className="ModalAgregarComentario__Contenido--Boton">
              Finalizar
            </button>
          </>
        )}
      </form>
    </div>
  );
}
