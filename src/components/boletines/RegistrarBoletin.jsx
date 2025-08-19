/* eslint-disable react/prop-types */
// HOOKS A USAR
import useRegistrarBoletin from "../../hooks/boletines/useRegistrarBoletin";
import useArrastrarImagen from "../../hooks/globales/useArrastrarImagen";
// COMPONENTES A USAR
import FooterBotones from "../global/FooterBotones";
// AYUDAS A USAR
import { LISTA_SVGS } from "../../helpers/SVGs";
import { MENSAJES_DE_VALIDACION } from "../../helpers/MensajesValidaciones";
// ESTILOS A USAR
import "../../styles/components/boletines/RegistrarBoletin.css";

export default function RegistrarBoletin({ idUsuario }) {
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
    PeticionRegistrarBoletin,
    ReiniciarRegistro,
    CampoRequerido,
  } = useRegistrarBoletin({
    idUsuario,
    imagenSeleccionada,
    establecerImagenSeleccionada,
  });

  return (
    <form onSubmit={PeticionRegistrarBoletin} className="RegistrarBoletin">
      <div className="RegistrarBoletin__SeleccionarImagen">
        <picture
          {...getRootProps()}
          className="RegistrarBoletin__SeleccionarImagen__Label"
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
      <FooterBotones FuncionNegativa={ReiniciarRegistro} />
    </form>
  );
}
