// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";
// AYUDAS A USAR
import { COOKIE_CON_TOKEN } from "../../helpers/AgregarCookiePeticion";
7;
import { AlertaRealizandoPeticion } from "../../helpers/TiposDeAlertas";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
export default function useEditarUsuario({
  infUsuario,
  imagenSeleccionada,
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
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("tokenDeAcceso", COOKIE_CON_TOKEN);
      formData.append("idUsuario", infUsuario.id_usuario);
      formData.append("Nombre", data.Nombre);
      formData.append("ApellidoPaterno", data.ApellidoPaterno);
      formData.append("ApellidoMaterno", data.ApellidoMaterno);
      formData.append("Contrasena", data.Contrasena);
      formData.append("Correo", data.Correo);
      formData.append("SistemaApp", data.SistemaApp);
      formData.append("Edad", data.Edad);
      formData.append("Telefono", data.Telefono);
      formData.append("CodigoPostal", data.CodigoPostal);
      formData.append("Colonia", data.Colonia);
      formData.append("ContactoEmergencia", data.ContactoEmergencia);
      formData.append("TelefonoContacto", data.TelefonoContacto);
      // ESTO SOLO SE USA EN CASO DE QUE NO SE HAYA MODIFICADO LA FOTO
      formData.append("Foto", infUsuario.foto);
      formData.append("ActivoUsuario", usuarioActivo ? "Si" : "No");
      formData.append("Imagen", imagenSeleccionada);
      const res = await EditarUnUsuario(formData);
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
