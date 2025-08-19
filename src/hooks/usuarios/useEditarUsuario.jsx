// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
export default function useEditarUsuario({
  infUsuario,
  establecerSubvistaActual,
}) {
  // PETICION A REALIZAR
  const { EditarUnUsuario } = useUsuarios();
  //   ESTADOS DEL COMPONENTE
  const [usuarioActivo, establecerUsuarioActivo] = useState(infUsuario.activo);
  const [VerContrasena, establecerVerContrasena] = useState(false);
  // VALIDACIONES PARA EL FORMULARIO
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Nombre: infUsuario.nombre,
      ApellidoPaterno: infUsuario.apellido_paterno,
      ApellidoMaterno: infUsuario.apellido_materno,
      Contrasena: infUsuario.contrasena,
      Correo: infUsuario.correo,
      SistemaApp: infUsuario.app,
      Edad: infUsuario.edad,
      Telefono: infUsuario.telefono,
      CodigoPostal: infUsuario.codigo_postal,
      Colonia: infUsuario.colonia,
      ContactoEmergencia: infUsuario.contacto_emergencia,
      TelefonoContacto: infUsuario.telefono_emergencia,
    },
    criteriaMode: "all",
  });

  const InputContrasena = VerContrasena ? "text" : "password";
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
  const PeticionEditarUsuario = handleSubmit(async (data) => {
    try {
      data.idUsuario = infUsuario.id_usuario;
      data.Activo = usuarioActivo;
      const res = await EditarUnUsuario(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        const { status, data } = res;
        ManejarRespuestasDelServidor({ status, data });
        establecerSubvistaActual(0);
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
    usuarioActivo,
    establecerUsuarioActivo,
    InputContrasena,
    CampoRequerido,
    PeticionEditarUsuario,
  };
}
