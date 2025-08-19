// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";
// AYUDAS A USAR
import { AlertaRealizandoPeticion } from "../../helpers/TiposDeAlertas";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";

export default function useActualizarMiInformacion({
  infUsuario,
  establecerSubvistaActual,
  obtenerInformacionNuevamente,
  establecerObtenerInformacionNuevamente,
}) {
  // FUNCION PARA ACTUALIZAR LA INFORMACION
  const { ActualizarMiInformacion } = useUsuarios();
  // MANEJAR EL FORMULARIO Y LOS ERRORES
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: infUsuario.nombre,
      ApellidoPaterno: infUsuario.apellido_paterno,
      ApellidoMaterno: infUsuario.apellido_materno,
      TelefonoUsuario: infUsuario.telefono,
      CorreoUsuario: infUsuario.correo,
    },
    criteriaMode: "all",
  });
  const RegresarVistaAnterior = () => {
    establecerSubvistaActual(0);
  };
  // CAMPO DEL MENSAJE DE ERROR
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
  // PETICION A REALIZAR
  const PeticionActualizarMiInformacion = handleSubmit(async (data) => {
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      data.idUsuario = infUsuario.id_usuario;
      const res = await ActualizarMiInformacion(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        ManejarRespuestasDelServidor({
          status: 204,
          data: "Tu información se ha actualizado con exito.",
        });
        establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
        RegresarVistaAnterior();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarRespuestasDelServidor({ status, data });
    }
  });

  return {
    register,
    CampoRequerido,
    PeticionActualizarMiInformacion,
    RegresarVistaAnterior,
  };
}
