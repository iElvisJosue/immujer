// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useSistema } from "../../context/SistemaContext";
// AYUDAS A USAR
import {
  AlertaRealizandoPeticion,
  AlertaInformativa,
} from "../../helpers/TiposDeAlertas";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/AgregarCookiePeticion";
export default function useEnviarNotificacion({
  idUsuario,
  imagenSeleccionada,
  establecerImagenSeleccionada,
}) {
  const { EnviarNotificacion } = useSistema();
  const [paraTodos, establecerParaTodos] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });
  const ReiniciarRegistro = () => {
    establecerImagenSeleccionada(null);
    establecerParaTodos(true);
    reset();
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
  // PETICION DE REGISTRO
  const PeticionEnviarNotificacion = handleSubmit(async (data) => {
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("tokenDeAcceso", COOKIE_CON_TOKEN);
      formData.append("idCreador", idUsuario);
      formData.append("TituloNotificacion", data.TituloNotificacion);
      formData.append("DetallesNotificacion", data.DetallesNotificacion);
      formData.append("ParaTodos", paraTodos ? "Si" : "No");
      formData.append("Imagen", imagenSeleccionada);
      const res = await EnviarNotificacion(formData);
      if (res.response) {
        const { data } = res.response;
        AlertaInformativa({
          Titulo: "¡Error al enviar la notificación!",
          Mensaje: data,
          Imagen: "Imagenes/Alerta_Error_Notificacion.png",
          ColorAlerta: "Rojo",
        });
      } else {
        AlertaInformativa({
          Titulo: "¡Notificación enviada!",
          Mensaje: `La notificación ha sido enviada con exito a ${
            paraTodos ? "todos los usuarios." : "los usuarios seleccionados."
          }`,
          Imagen: "Imagenes/Alerta_Exito_Notificacion.png",
          ColorAlerta: "Verde",
        });
        ReiniciarRegistro();
      }
    } catch (error) {
      console.error(error);
      ManejarRespuestasDelServidor();
    }
  });
  return {
    paraTodos,
    establecerParaTodos,
    register,
    PeticionEnviarNotificacion,
    ReiniciarRegistro,
    CampoRequerido,
  };
}
