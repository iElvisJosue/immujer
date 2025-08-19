// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// HOOKS A USAR
import useIniciarSesion from "../hooks/IniciarSesion/useIniciarSesion";
// AYUDAS A USAR
import { MENSAJES_DE_VALIDACION } from "../helpers/MensajesValidaciones";
import { LISTA_SVGS } from "../helpers/SVGs";

// ESTILOS A USAR
import "../styles/views/IniciarSesion.css";

export default function IniciarSesion() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const {
    PeticionIniciarSesion,
    ManejarMostrarContraseña,
    iconoMostrarOcultar,
  } = useIniciarSesion({ handleSubmit });

  const CampoRequerido = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="CampoRequerido">
              {message}
            </small>
          ))
        }
      />
    );
  };

  return (
    <main className="IniciarSesion">
      <form
        className="IniciarSesion__Formulario"
        onSubmit={PeticionIniciarSesion}
      >
        <img
          src="ImmujerLogo.png"
          alt="Logo Sistema"
          className="IniciarSesion__Formulario--Imagen"
        />
        <h2 className="IniciarSesion__Formulario--Titulo">
          ¡Bienvenido al sistema IMMUJER 💜!
        </h2>
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="CORREO" />
          </span>
          <input
            id="CorreoUsuario"
            name="CorreoUsuario"
            type="text"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText"
            {...register("CorreoUsuario", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
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
        <div className="ContenedorInput__MaterialDesign">
          <span className="ContenedorInput__MaterialDesign--Icono">
            <LISTA_SVGS SVG="CONTRASENA" Box="0 0 16 16" />
          </span>
          <span
            className="ContenedorInput__MaterialDesign--Icono Ojo"
            onClick={ManejarMostrarContraseña}
          >
            <LISTA_SVGS SVG={iconoMostrarOcultar} />
          </span>
          <input
            id="ContrasenaUsuario"
            name="ContrasenaUsuario"
            type="password"
            placeholder=" "
            className="ContenedorInput__MaterialDesign--InputText"
            {...register("ContrasenaUsuario", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
            })}
          />
          <label
            htmlFor="ContrasenaUsuario"
            className="ContenedorInput__MaterialDesign--Label"
          >
            Contraseña
          </label>
        </div>
        {CampoRequerido("ContrasenaUsuario")}
        <button type="submit" className="Boton Completo">
          Iniciar Sesion
        </button>
      </form>
    </main>
  );
}
