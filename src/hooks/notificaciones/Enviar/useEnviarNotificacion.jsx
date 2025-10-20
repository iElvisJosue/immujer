// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useNotificacionesContext } from "../../../context/NotificacionesContext";
// AYUDAS A USAR
import {
  AlertaRealizandoPeticion,
  AlertaInformativa,
} from "../../../helpers/TiposDeAlertas";
import { COOKIE_CON_TOKEN } from "../../../helpers/AgregarCookiePeticion";

export default function useEnviarNotificacion({
  idUsuario,
  imagenSeleccionada,
  establecerImagenSeleccionada,
}) {
  const { EnviarPush } = useNotificacionesContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
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
  const PeticionEnviarNotificacion = handleSubmit(async (data) => {
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
    const formData = new FormData();
    formData.append("tokenDeAcceso", COOKIE_CON_TOKEN);
    formData.append("idCreador", idUsuario);
    formData.append("TituloNotificacion", data.TituloNotificacion);
    formData.append("DetallesNotificacion", data.DetallesNotificacion);
    formData.append("Imagen", imagenSeleccionada);
    const res = await EnviarPush(formData);
    if (res.exito) {
      AlertaInformativa({
        Titulo: "¡Notificación enviada!",
        Mensaje: `La notificación ha sido enviada con exito a todas las usuarias`,
        Imagen: "Imagenes/Alerta_Exito_Notificacion.png",
        ColorAlerta: "Verde",
      });
      reset();
      establecerImagenSeleccionada(null);
    } else {
      AlertaInformativa({
        Titulo: "¡Error al enviar la notificación!",
        Mensaje: res.data,
        Imagen: "Imagenes/Alerta_Error_Notificacion.png",
        ColorAlerta: "Rojo",
      });
    }
  });

  return {
    register,
    CampoRequerido,
    PeticionEnviarNotificacion,
  };
}
