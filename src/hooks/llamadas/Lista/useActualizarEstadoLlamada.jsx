// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useState } from "react";
// IMPORTAMOS LOS CONTEXTOS A USAR
import { useLlamadasContext } from "../../../context/LlamadasContext";
// IMPORTAMOS LAS AYUDAS
import { AlertaInformativa } from "../../../helpers/TiposDeAlertas";

export default function useActualizarEstadoLlamada({
  idLlamada,
  idModificador,
  onCerrarModal,
  detallesLlamada,
  estadoSeleccionado,
}) {
  const { ActualizarEstado } = useLlamadasContext();
  const [actualizandoEstado, establecerActualizandoEstado] = useState(false);

  async function PeticionActualizarEstadoLlamada() {
    // MOSTRAMOS UN MENSAJE DE ACTUALIZANDO EL ESTADO DE LA LLAMADA
    establecerActualizandoEstado(true);
    try {
      const res = await ActualizarEstado({
        idLlamada,
        idModificador, //PERSONA QUE ATIENDE O INVALIDA
        Fase: estadoSeleccionado,
      });
      if (res.exito) {
        detallesLlamada.fase = estadoSeleccionado;
        AlertaInformativa({
          Titulo: "¡Estado actualizado!",
          Mensaje: `El estado de la llamada ha cambiado con exito a ${estadoSeleccionado}.`,
          Imagen: "Imagenes/Alerta_Exito.png",
          ColorAlerta: "Verde",
        });
      }
    } finally {
      onCerrarModal();
      establecerActualizandoEstado(false);
    }
  }

  return {
    actualizandoEstado,
    PeticionActualizarEstadoLlamada,
  };
}
