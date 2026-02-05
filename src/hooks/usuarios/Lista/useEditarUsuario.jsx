// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useUsuariosContext } from "../../../context/UsuariosContext";
// AYUDAS A USAR
import { AlertaRealizandoPeticion } from "../../../helpers/TiposDeAlertas";
import { ManejarRespuestasDelServidor } from "../../../helpers/ManejarRespuestasDelServidor";

export default function useEditarUsuario({
  detallesUsuario,
  imagenSeleccionada,
  establecerSubvistaActual,
}) {
  const { Editar } = useUsuariosContext();
  const [usuarioActivo, establecerUsuarioActivo] = useState(
    detallesUsuario.activo
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Rol: detallesUsuario.rol,
      SistemaApp: detallesUsuario.app,
      Nombre: detallesUsuario.nombre,
      ApellidoPaterno: detallesUsuario.apellido_paterno,
      ApellidoMaterno: detallesUsuario.apellido_materno,
      Edad: detallesUsuario.edad,
      Telefono: detallesUsuario.telefono,
      Correo: detallesUsuario.correo,
      CodigoPostal: detallesUsuario.codigo_postal,
      Colonia: detallesUsuario.colonia,
      NombreConyuge: detallesUsuario.nombre_conyuge,
      ContactoEmergencia: detallesUsuario.contacto_emergencia,
      TelefonoContacto: detallesUsuario.telefono_emergencia,
    },
    criteriaMode: "all",
  });

  const PeticionEditarUsuario = handleSubmit(async (data) => {
    const SistemaApp = AsignarTipoSistema(data.Rol);
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("idUsuario", detallesUsuario.id_usuario);
      formData.append("Rol", data.Rol);
      formData.append("SistemaApp", SistemaApp);
      formData.append("Nombre", data.Nombre);
      formData.append("ApellidoPaterno", data.ApellidoPaterno);
      formData.append("ApellidoMaterno", data.ApellidoMaterno);
      formData.append("Edad", data.Edad);
      formData.append("Telefono", data.Telefono);
      formData.append("Correo", data.Correo);
      formData.append("CodigoPostal", data.CodigoPostal);
      formData.append("Colonia", data.Colonia);
      formData.append("NombreConyuge", data.NombreConyuge);
      formData.append("ContactoEmergencia", data.ContactoEmergencia);
      formData.append("TelefonoContacto", data.TelefonoContacto);
      // ESTO SOLO SE USA EN CASO DE QUE NO SE HAYA MODIFICADO LA FOTO
      formData.append("Foto", detallesUsuario.foto);
      formData.append("ActivoUsuario", usuarioActivo ? "Si" : "No");
      formData.append("Imagen", imagenSeleccionada);
      const res = await Editar(formData);
      if (res.exito) establecerSubvistaActual(0);
    } catch {
      ManejarRespuestasDelServidor({});
    }
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
    usuarioActivo,
    CampoRequerido,
    PeticionEditarUsuario,
    establecerUsuarioActivo,
  };
}
