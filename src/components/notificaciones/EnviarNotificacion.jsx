/* eslint-disable react/prop-types */
// HOOKS A USAR
import useEnviarNotificacion from "../../hooks/notificaciones/useEnviarNotificacion";
import useArrastrarImagen from "../../hooks/globales/useArrastrarImagen";
// COMPONENTES A USAR
import FooterBotones from "../global/FooterBotones";
// AYUDAS A USAR
import { LISTA_SVGS } from "../../helpers/SVGs";
import { MENSAJES_DE_VALIDACION } from "../../helpers/MensajesValidaciones";
// ESTILOS A USAR
import "../../styles/components/notificaciones/EnviarNotificacion.css";

export default function EnviarNotificacion({ idUsuario }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    imagenSeleccionada,
    establecerImagenSeleccionada,
    ImagenPreview,
  } = useArrastrarImagen({});
  const {
    register,
    PeticionEnviarNotificacion,
    ReiniciarRegistro,
    CampoRequerido,
  } = useEnviarNotificacion({
    idUsuario,
    imagenSeleccionada,
    establecerImagenSeleccionada,
  });

  return (
    <form onSubmit={PeticionEnviarNotificacion} className="EnviarNotificacion">
      <div className="EnviarNotificacion__SeleccionarImagen">
        <picture
          {...getRootProps()}
          className="EnviarNotificacion__SeleccionarImagen__Label"
        >
          <input
            {...getInputProps()}
            accept=".jpg, .jpeg, .png"
            multiple={false}
          />
          {isDragActive ? (
            <img src="Imagenes/Arrastrar_Imagen.png" alt="Agregar Imagen" />
          ) : (
            <img src={ImagenPreview} alt="Imagen notificación" />
          )}
        </picture>
      </div>
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
      <FooterBotones
        FuncionNegativa={ReiniciarRegistro}
        TextoBotonPositivo="Enviar"
      />
    </form>
  );
}
