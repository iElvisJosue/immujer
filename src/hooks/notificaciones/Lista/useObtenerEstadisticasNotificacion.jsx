// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
// IMPORTAMOS EL CONTEXTO A USAR
import { useNotificacionesContext } from "../../../context/NotificacionesContext";

export default function useObtenerEstadisticasNotificacion() {
  const { ObtenerEstadisticas } = useNotificacionesContext();
  const [uuid, establecerUUID] = useState(null);
  const [cargando, establecerCargando] = useState(true);
  const [estadisticas, establecerEstadisticas] = useState([]);
  const [verModalDetalles, establecerVerModalDetalles] = useState(false);

  useEffect(() => {
    async function ObtenerEstadisticasNoti() {
      try {
        establecerCargando(true);
        const res = await ObtenerEstadisticas({
          uuid: uuid,
        });
        if (res.exito) establecerEstadisticas(res.data);
      } finally {
        establecerCargando(false);
      }
    }
    // SOLO SE BUSCA DETALLES DE NOTIFICACIONES QUE TIENEN UUID
    if (uuid) ObtenerEstadisticasNoti();
  }, [uuid]);

  const EstablecerUUIDYVerModal = (uuid) => {
    establecerUUID(uuid);
    establecerVerModalDetalles(true);
  };

  return {
    cargando,
    estadisticas,
    verModalDetalles,
    establecerVerModalDetalles,
    EstablecerUUIDYVerModal,
  };
}
