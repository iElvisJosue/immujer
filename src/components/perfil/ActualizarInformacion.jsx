/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import FooterBotones from "../global/FooterBotones";
// HOOKS A USAR
import useActualizarMiInformacion from "../../hooks/perfil/useActualizarMiInformacion";
// AYUDAS A USAR
import { LISTA_SVGS } from "../../helpers/SVGs";
import { MENSAJES_DE_VALIDACION } from "../../helpers/MensajesValidaciones";
import { REGEX_SOLO_NUMEROS, REGEX_CORREO } from "../../helpers/Regex";
// ESTILOS A USAR (SE USAN LOS DE REGISTRAR USUARIO)
import "../../styles/components/perfil/ActualizarMiInformacion.css";

export default function ActualizarMiInformacion({
  infUsuario,
  establecerSubvistaActual,
  obtenerInformacionNuevamente,
  establecerObtenerInformacionNuevamente,
}) {
  const {
    register,
    CampoRequerido,
    PeticionActualizarMiInformacion,
    RegresarVistaAnterior,
  } = useActualizarMiInformacion({
    infUsuario,
    establecerSubvistaActual,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
  });

  return (
    <form
      onSubmit={PeticionActualizarMiInformacion}
      className="ActualizarMiInformacion"
    >
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign Completo">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="NOMBRE" Box="0 0 26 26" Tamaño="20" />
          </span>
          <input
            id="Nombre"
            name="Nombre"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("Nombre", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="Nombre"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Nombre(s)
          </label>
        </div>
        {CampoRequerido("Nombre")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign Completo">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="NOMBRE" Box="0 0 26 26" Tamaño="20" />
          </span>
          <input
            id="ApellidoPaterno"
            name="ApellidoPaterno"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("ApellidoPaterno", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="ApellidoPaterno"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Apellido Paterno
          </label>
        </div>
        {CampoRequerido("ApellidoPaterno")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign Completo">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="NOMBRE" Box="0 0 26 26" Tamaño="20" />
          </span>
          <input
            id="ApellidoMaterno"
            name="ApellidoMaterno"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("ApellidoMaterno", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="ApellidoMaterno"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Apellido Materno
          </label>
        </div>
        {CampoRequerido("ApellidoMaterno")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="TELEFONO" />
          </span>
          <input
            id="TelefonoUsuario"
            name="TelefonoUsuario"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("TelefonoUsuario", {
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
            htmlFor="TelefonoUsuario"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Teléfono
          </label>
        </div>
        {CampoRequerido("TelefonoUsuario")}
      </span>
      <span className="ContenedorInput Correo">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="CORREO" />
          </span>
          <input
            id="CorreoUsuario"
            name="CorreoUsuario"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("CorreoUsuario", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              pattern: REGEX_CORREO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="CorreoUsuario"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Correo
          </label>
        </div>
        {CampoRequerido("CorreoUsuario")}
      </span>
      <FooterBotones
        TextoBotonNegativo="Regresar"
        FuncionNegativa={RegresarVistaAnterior}
        TextoBotonPositivo="Actualizar"
      />
    </form>
  );
}
