// HOOKS A USAR
import useRegistrarUsuario from "../../hooks/usuarios/useRegistrarUsuario";
// COMPONENTES A USAR
import FooterBotones from "../global/FooterBotones";
// AYUDAS A USAR
import { LISTA_SVGS } from "../../helpers/SVGs";
import { MENSAJES_DE_VALIDACION } from "../../helpers/MensajesValidaciones";
import { REGEX_SOLO_NUMEROS, REGEX_CORREO } from "../../helpers/Regex";
// ESTILOS A USAR
import "../../styles/components/usuarios/RegistrarUsuario.css";
import OpcionesDeSwitches from "../global/OpcionesDeSwitches";

export default function RegistrarUsuario() {
  const {
    register,
    VerContrasena,
    establecerVerContrasena,
    InputContrasena,
    CampoRequerido,
    PeticionRegistrarUsuario,
    ReiniciarRegistro,
  } = useRegistrarUsuario();

  return (
    <form onSubmit={PeticionRegistrarUsuario} className="RegistrarUsuario">
      <OpcionesDeSwitches
        Opciones={[
          {
            Titulo: "Ver contraseña",
            Activo: VerContrasena,
            IconoDesactivado: "eye-off-outline",
            IconoActivado: "eye",
            FuncionDeEstablecimiento: establecerVerContrasena,
            ValorDeEstablecimiento: VerContrasena,
          },
        ]}
      />
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
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
        <div className="ContenedorInput__MaterialDesign">
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
            Apellido paterno
          </label>
        </div>
        {CampoRequerido("ApellidoPaterno")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
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
            Apellido materno
          </label>
        </div>
        {CampoRequerido("ApellidoMaterno")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="CONTRASENA" Box="0 0 16 16" />
          </span>
          <input
            id="Contrasena"
            name="Contrasena"
            type={InputContrasena}
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("Contrasena", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="Contrasena"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Contraseña
          </label>
        </div>
        {CampoRequerido("Contrasena")}
      </span>
      <span className="ContenedorInput Completo">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="CORREO" />
          </span>
          <input
            id="Correo"
            name="Correo"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("Correo", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              pattern: REGEX_CORREO,
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="Correo"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Correo
          </label>
        </div>
        {CampoRequerido("Correo")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="PERMISOS" />
          </span>
          <select
            id="SistemaApp"
            name="SistemaApp"
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("SistemaApp", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
            })}
          >
            <option value="Web">Web</option>
            <option value="Android">Android</option>
          </select>
          <label
            htmlFor="SistemaApp"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Sistema
          </label>
        </div>
        {CampoRequerido("SistemaApp")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="PASTEL" />
          </span>
          <input
            id="Edad"
            name="Edad"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("Edad", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              pattern: REGEX_SOLO_NUMEROS,
              maxLength: {
                value: 2,
                message: MENSAJES_DE_VALIDACION.MAX2,
              },
            })}
          />
          <label
            htmlFor="Edad"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Edad
          </label>
        </div>
        {CampoRequerido("Edad")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="TELEFONO" />
          </span>
          <input
            id="Telefono"
            name="Telefono"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("Telefono", {
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
            htmlFor="Telefono"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Teléfono
          </label>
        </div>
        {CampoRequerido("Telefono")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="UBICACION" />
          </span>
          <input
            id="CodigoPostal"
            name="CodigoPostal"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("CodigoPostal", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              pattern: REGEX_SOLO_NUMEROS,
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
            htmlFor="CodigoPostal"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Codigo Postal
          </label>
        </div>
        {CampoRequerido("CodigoPostal")}
      </span>
      <span className="ContenedorInput Completo">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="MAPA" />
          </span>
          <input
            id="Colonia"
            name="Colonia"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("Colonia", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
              maxLength: {
                value: 150,
                message: MENSAJES_DE_VALIDACION.MAX150,
              },
            })}
          />
          <label
            htmlFor="Colonia"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Colonia
          </label>
        </div>
        {CampoRequerido("Colonia")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="NOMBRE" Box="0 0 26 26" Tamaño="20" />
          </span>
          <input
            id="ContactoEmergencia"
            name="ContactoEmergencia"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("ContactoEmergencia", {
              maxLength: {
                value: 255,
                message: MENSAJES_DE_VALIDACION.MAX255,
              },
            })}
          />
          <label
            htmlFor="ContactoEmergencia"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Contacto
          </label>
        </div>
        {CampoRequerido("ContactoEmergencia")}
      </span>
      <span className="ContenedorInput">
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="TELEFONO" />
          </span>
          <input
            id="TelefonoContacto"
            name="TelefonoContacto"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText SinBorde"
            {...register("TelefonoContacto", {
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
            htmlFor="TelefonoContacto"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Teléfono contacto
          </label>
        </div>
        {CampoRequerido("TelefonoContacto")}
      </span>
      <FooterBotones FuncionNegativa={ReiniciarRegistro} />
    </form>
  );
}
