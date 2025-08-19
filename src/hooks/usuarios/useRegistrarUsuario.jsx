// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
export default function useRegistrarUsuario() {
  // PETICION A REALIZAR
  const { RegistrarNuevoUsuario } = useUsuarios();
  //   ESTADOS DEL COMPONENTE
  const [VerContrasena, establecerVerContrasena] = useState(false);
  // VALIDACIONES PARA EL FORMULARIO
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });
  const InputContrasena = VerContrasena ? "text" : "password";
  const ReiniciarRegistro = () => {
    reset();
  };
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
  const PeticionRegistrarUsuario = handleSubmit(async (data) => {
    try {
      const res = await RegistrarNuevoUsuario(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        const { status, data } = res;
        ManejarRespuestasDelServidor({ status, data });
        ReiniciarRegistro();
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarRespuestasDelServidor({ status, data });
    }
  });

  return {
    register,
    VerContrasena,
    establecerVerContrasena,
    InputContrasena,
    CampoRequerido,
    PeticionRegistrarUsuario,
    ReiniciarRegistro,
  };
}
