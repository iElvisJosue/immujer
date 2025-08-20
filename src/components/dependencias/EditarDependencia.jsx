/* eslint-disable react/prop-types */
// HOOKS A USAR
import useEditarDependencia from "../../hooks/dependencias/useEditarDependencia";
import useArrastrarImagen from "../../hooks/globales/useArrastrarImagen";
// COMPONENTES A USAR
import Titulo from "../global/Titulo";
import Separador from "../global/Separador";
import Mapa from "../global/Mapa";
import FooterBotones from "../global/FooterBotones";
import OpcionesDeSwitches from "../global/OpcionesDeSwitches";
// AYUDAS A USAR
import { LISTA_SVGS } from "../../helpers/SVGs";
import { MENSAJES_DE_VALIDACION } from "../../helpers/MensajesValidaciones";
import { REGEX_SOLO_NUMEROS } from "../../helpers/Regex";
import { HOST_IMAGENES } from "../../helpers/Urls";
// ESTILOS A USAR
import "../../styles/components/dependencias/EditarDependencia.css";

export default function EditarDependencia({
  establecerSubvistaActual,
  infDependenciaSeleccionada,
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    imagenSeleccionada,
    ImagenPreview,
  } = useArrastrarImagen({
    urlImagenActual: `${HOST_IMAGENES}/Dependencias/${infDependenciaSeleccionada.foto}`,
  });
  const {
    register,
    CampoRequerido,
    ubicacion,
    establecerUbicacion,
    dependenciaActiva,
    establecerDependenciaActiva,
    PeticionActualizarDependencia,
  } = useEditarDependencia({
    infDependencia: infDependenciaSeleccionada,
    imagenSeleccionada,
    establecerSubvistaActual,
  });

  return (
    <form
      onSubmit={PeticionActualizarDependencia}
      className="EditarDependencia"
    >
      <div className="EditarDependencia__Regresar">
        <button
          type="button"
          className="EditarDependencia__Regresar--Boton"
          onClick={() => establecerSubvistaActual(0)}
        >
          x
        </button>
      </div>
      <div className="EditarDependencia__SeleccionarImagen">
        <picture
          {...getRootProps()}
          className="EditarDependencia__SeleccionarImagen__Label"
        >
          <input
            {...getInputProps()}
            accept=".jpg, .jpeg, .png"
            multiple={false}
          />
          {isDragActive ? (
            <img src="Imagenes/Arrastrar_Imagen.png" alt="Agregar Imagen" />
          ) : (
            <img src={ImagenPreview} alt="Foto dependencia" />
          )}
        </picture>
      </div>
      <OpcionesDeSwitches
        Opciones={[
          {
            Titulo: "¿Activa?",
            Activo: dependenciaActiva,
            FuncionDeEstablecimiento: establecerDependenciaActiva,
            ValorDeEstablecimiento: dependenciaActiva,
          },
        ]}
      />
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="DEPENDENCIAS" Box="0 0 640 512" />
          </span>
          <input
            id="NombreDependencia"
            name="NombreDependencia"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("NombreDependencia", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAXIMO_255,
              },
            })}
          />
          <label
            htmlFor="NombreDependencia"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Dependencia
          </label>
        </div>
        {CampoRequerido("NombreDependencia")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="TELEFONO" />
          </span>
          <input
            id="TelefonoDependencia"
            name="TelefonoDependencia"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("TelefonoDependencia", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              pattern: REGEX_SOLO_NUMEROS,
              minLength: {
                value: 10,
                message: MENSAJES_DE_VALIDACION.MIN10,
              },
              maxLength: {
                value: 10,
                message: MENSAJES_DE_VALIDACION.MAX10,
              },
            })}
          />
          <label
            htmlFor="TelefonoDependencia"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Teléfono
          </label>
        </div>
        {CampoRequerido("TelefonoDependencia")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="CALLE" />
          </span>
          <input
            id="DireccionDependencia"
            name="DireccionDependencia"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("DireccionDependencia", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAXIMO_255,
              },
            })}
          />
          <label
            htmlFor="DireccionDependencia"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Dirección
          </label>
        </div>
        {CampoRequerido("DireccionDependencia")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="UBICACION" />
          </span>
          <input
            id="CPDependencia"
            name="CPDependencia"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("CPDependencia", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              minLength: {
                value: 5,
                message: MENSAJES_DE_VALIDACION.MIN5,
              },
              maxLength: {
                value: 5,
                message: MENSAJES_DE_VALIDACION.MAX5,
              },
            })}
          />
          <label
            htmlFor="CPDependencia"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Código Postal
          </label>
        </div>
        {CampoRequerido("CPDependencia")}
      </span>
      <span className="ContenedorInput Completo">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="DOCUMENTO" />
          </span>
          <input
            id="DescripcionDependencia"
            name="DescripcionDependencia"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("DescripcionDependencia", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="DescripcionDependencia"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Descripción
          </label>
        </div>
        {CampoRequerido("DescripcionDependencia")}
      </span>
      <Separador />
      <Titulo>Ubicación actual</Titulo>
      <Mapa
        textoPin="Ubicación de la dependencia:"
        ubicacion={ubicacion}
        establecerUbicacion={establecerUbicacion}
        center={[ubicacion.lat, ubicacion.lng]}
      />
      <FooterBotones VerBotonNegativo={false} TextoBotonPositivo="Actualizar" />
    </form>
  );
}
