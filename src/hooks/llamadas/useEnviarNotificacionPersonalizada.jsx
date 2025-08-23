/* eslint-disable react/prop-types */
// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useSistema } from "../../context/SistemaContext";
// IMPORTAMOS LAS AYUDAS
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { AlertaInformativa } from "../../helpers/TiposDeAlertas";
export default function useEnviarNotificacionPersonalizada({
  idCreador,
  idUsuarioDestino,
  idOneSignal,
  NombreCompleto,
  onCerrarModal,
}) {
  const { EnviarNotificacionPersonalizada } = useSistema();
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
      const res = await EnviarNotificacionPersonalizada(data);
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
          Mensaje: `La notificación ha sido enviada con exito a ${NombreCompleto}.`,
          Imagen: "Imagenes/Alerta_Exito_Notificacion.png",
          ColorAlerta: "Verde",
        });
        onCerrarModal();
      }
    } catch (error) {
      console.error(error);
      ManejarRespuestasDelServidor();
    } finally {
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
