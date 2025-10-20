// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useUsuariosContext } from "../../../context/UsuariosContext";
// AYUDAS A USAR
import { AlertaRealizandoPeticion } from "../../../helpers/TiposDeAlertas";

export default function useRegistrarUsuario() {
  const { Registrar } = useUsuariosContext();
  const [verContrasena, establecerVerContrasena] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  const InputContrasena = verContrasena ? "text" : "password";
  const PeticionRegistrarUsuario = handleSubmit(async (data) => {
    const SistemaApp = AsignarTipoSistema(data.Rol);
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    const res = await Registrar({
      ...data,
      SistemaApp,
    });
    if (res.exito) reset();
  });
  function AsignarTipoSistema(Rol) {
    if (Rol === "Usuario") {
      return "Android";
    }
    return "Web";
  }
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

  return {
    register,
    verContrasena,
    CampoRequerido,
    InputContrasena,
    establecerVerContrasena,
    PeticionRegistrarUsuario,
  };
}
