import { useEffect, useState } from "react";
import { useSistema } from "../../context/SistemaContext";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";

export default function useBuscarDetallesNotificacion() {
  const { BuscarDetallesNotificacion } = useSistema();
  const [verModalDetalles, establecerVerModalDetalles] = useState(false);
  const [uuidNotificacion, establecerUuidNotificacion] = useState(null);
  const [infNotificacion, establecerInfoNotificacion] = useState([]);
  const [cargandoInfNotificacion, establecerCargandoInfNotificacion] =
    useState(true);

  useEffect(() => {
    async function BuscarDetallesNoti() {
      try {
        establecerCargandoInfNotificacion(true);
        const res = await BuscarDetallesNotificacion({
          uuid: uuidNotificacion,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarRespuestasDelServidor({ status, data });
        } else {
          establecerInfoNotificacion(res.data);
        }
      } catch (error) {
        console.log(error);
        ManejarRespuestasDelServidor();
      } finally {
        establecerCargandoInfNotificacion(false);
      }
    }
    // SOLO SE BUSCA DETALLES DE NOTIFICACIONES QUE TIENEN UUID
    if (uuidNotificacion) BuscarDetallesNoti();
  }, [uuidNotificacion]);

  const EstablecerUUIDYVerModal = (uuid) => {
    establecerUuidNotificacion(uuid);
    establecerVerModalDetalles(true);
  };

  return {
    EstablecerUUIDYVerModal,
    verModalDetalles,
    establecerVerModalDetalles,
    infNotificacion,
    cargandoInfNotificacion,
  };
}
