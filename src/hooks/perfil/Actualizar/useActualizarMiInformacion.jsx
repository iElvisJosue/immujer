// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useUsuariosContext } from "../../../context/UsuariosContext";
// AYUDAS A USAR
import { AlertaRealizandoPeticion } from "../../../helpers/TiposDeAlertas";

export default function useActualizarMiInformacion({
  PropsUsuario,
  establecerSubvistaActual,
}) {
  const {
    idUsuario,
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Telefono,
    Correo,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
  } = PropsUsuario;
  const { ActualizarMiInformacion } = useUsuariosContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre,
      ApellidoPaterno,
      ApellidoMaterno,
      TelefonoUsuario: Telefono,
      CorreoUsuario: Correo,
    },
    criteriaMode: "all",
  });
  function CampoRequerido(NombreCampo) {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
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
  }
  const PeticionActualizarMiInformacion = handleSubmit(async (data) => {
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    const res = await ActualizarMiInformacion({
      idUsuario,
      ...data,
    });
    if (res.exito) {
      establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
      establecerSubvistaActual(0);
    }
  });

  return {
    register,
    CampoRequerido,
    PeticionActualizarMiInformacion,
  };
}
