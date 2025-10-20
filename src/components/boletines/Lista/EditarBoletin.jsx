/* eslint-disable react/prop-types */
// HOOKS A USAR
import useEditarBoletin from "../../../hooks/boletines/Lista/useEditarBoletin";
import useArrastrarImagen from "../../../hooks/globales/useArrastrarImagen";
// COMPONENTES A USAR
import OpcionesDeSwitches from "../../global/OpcionesDeSwitches";
import FooterBotones from "../../global/FooterBotones";
// AYUDAS A USAR
import { LISTA_SVGS } from "../../../helpers/SVGs";
import { HOST_IMAGENES } from "../../../helpers/Urls";
import { MENSAJES_DE_VALIDACION } from "../../../helpers/MensajesValidaciones";
// ESTILOS A USAR
import "../../../styles/components/boletines/Lista/EditarBoletin.css";

export default function EditarBoletin({
  PropsVista: { establecerSubvistaActual },
  PropsContenido: { infBoletinSeleccionado },
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    imagenSeleccionada,
    ImagenPreview,
  } = useArrastrarImagen({
    urlImagenActual: `${HOST_IMAGENES}/Boletines/${infBoletinSeleccionado.imagen}`,
  });
  const {
    register,
    CampoRequerido,
    boletinActivo,
    establecerBoletinActivo,
    PeticionEditarBoletin,
  } = useEditarBoletin({
    infBoletin: infBoletinSeleccionado,
    imagenSeleccionada,
    establecerSubvistaActual,
  });

  return (
    <form onSubmit={PeticionEditarBoletin} className="EditarBoletin">
      <div className="EditarBoletin__Regresar">
        <button
          type="button"
          className="EditarBoletin__Regresar--Boton"
          onClick={() => establecerSubvistaActual(0)}
        >
          x
        </button>
      </div>
      <div className="EditarBoletin__SeleccionarImagen">
        <picture
          {...getRootProps()}
          className="EditarBoletin__SeleccionarImagen__Label"
        >
          <input
            {...getInputProps()}
            accept=".jpg, .jpeg, .png"
            multiple={false}
          />
          {isDragActive ? (
            <img src="Imagenes/Arrastrar_Imagen.png" alt="Agregar Imagen" />
          ) : (
            <img src={ImagenPreview} alt="Foto boletin" />
          )}
        </picture>
      </div>
      <OpcionesDeSwitches
        Opciones={[
          {
            Titulo: "¿Activo?",
            Activo: boletinActivo,
            FuncionDeEstablecimiento: establecerBoletinActivo,
            ValorDeEstablecimiento: boletinActivo,
          },
        ]}
      />
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="BOLETINES" />
          </span>
          <input
            id="TituloBoletin"
            name="TituloBoletin"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("TituloBoletin", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAXIMO_255,
              },
            })}
          />
          <label
            htmlFor="TituloBoletin"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Boletin
          </label>
        </div>
        {CampoRequerido("TituloBoletin")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="ESTRELLA" />
          </span>
          <select
            id="RecomendadoBoletin"
            name="RecomendadoBoletin"
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("RecomendadoBoletin", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
            })}
          >
            <option value="No">No</option>
            <option value="Si">Si</option>
          </select>
          <label
            htmlFor="RecomendadoBoletin"
            className="ContenedorInput__MaterialDesign--Label"
          >
            ¿Recomendado?
          </label>
        </div>
        {CampoRequerido("RecomendadoBoletin")}
      </span>
      <span className="ContenedorInput Completo">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="DOCUMENTO" />
          </span>
          <input
            id="DescripcionBoletin"
            name="DescripcionBoletin"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("DescripcionBoletin", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="DescripcionBoletin"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Descripción
          </label>
        </div>
        {CampoRequerido("DescripcionBoletin")}
      </span>
      <FooterBotones VerBotonNegativo={false} TextoBotonPositivo="Actualizar" />
    </form>
  );
}
