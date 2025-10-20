// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useLlamadasContext } from "../../../context/LlamadasContext";

export default function useAgregarComentario({
  idLlamada,
  idUsuario,
  onRecargar,
  onCerrarModal,
}) {
  const { AgregarComentario } = useLlamadasContext();
  const [agregandoComentario, establecerAgregandoComentario] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const PeticionAgregarComentarioLlamada = handleSubmit(async (data) => {
    // MOSTRAMOS UN MENSAJE DE ACTUALIZANDO EL ESTADO DE LA LLAMADA
    establecerAgregandoComentario(true);
    try {
      const res = await AgregarComentario({
        idCreador: idUsuario,
        idLlamada,
        Comentario: data.Comentario,
      });
      if (res.exito) {
        onRecargar();
        onCerrarModal();
      }
    } finally {
      establecerAgregandoComentario(false);
    }
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

  return {
    register,
    CampoRequerido,
    agregandoComentario,
    PeticionAgregarComentarioLlamada,
  };
}
