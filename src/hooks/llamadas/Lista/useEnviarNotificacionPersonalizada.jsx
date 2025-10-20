// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useNotificacionesContext } from "../../../context/NotificacionesContext";
// IMPORTAMOS LAS AYUDAS
import { AlertaInformativa } from "../../../helpers/TiposDeAlertas";

export default function useEnviarNotificacionPersonalizada({
  idCreador,
  idUsuarioDestino,
  idOneSignal,
  NombreCompleto,
  onCerrarModal,
}) {
  const { EnviarPushPersonalizada } = useNotificacionesContext();
  const [enviandoNotificacion, establecerEnviandoNotificacion] =
    useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const PeticionEnviarNotificacion = handleSubmit(async (data) => {
    // MOSTRAMOS UN MENSAJE DE ENVIANDO LA NOTIFICACIÓN
    establecerEnviandoNotificacion(true);
    try {
      data.idCreador = idCreador;
      data.idUsuarioDestino = idUsuarioDestino;
      data.idOneSignal = idOneSignal;
      const res = await EnviarPushPersonalizada(data);
      if (res.exito) {
        AlertaInformativa({
          Titulo: "¡Notificación enviada!",
          Mensaje: `La notificación ha sido enviada con exito a ${NombreCompleto}.`,
          Imagen: "Imagenes/Alerta_Exito_Notificacion.png",
          ColorAlerta: "Verde",
        });
      } else {
        AlertaInformativa({
          Titulo: "¡Error al enviar la notificación!",
          Mensaje: res.data,
          Imagen: "Imagenes/Alerta_Error_Notificacion.png",
          ColorAlerta: "Rojo",
        });
      }
    } finally {
      onCerrarModal();
      establecerEnviandoNotificacion(false);
    }
  });

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

  return {
    register,
    CampoRequerido,
    enviandoNotificacion,
    PeticionEnviarNotificacion,
  };
}
