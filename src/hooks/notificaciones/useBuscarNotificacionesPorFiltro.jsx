import { useEffect, useState } from "react";
import { useSistema } from "../../context/SistemaContext";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";

export default function useBuscarNotificacionesPorFiltro({ filtroBusqueda }) {
  const { BuscarNotificacionesPorFiltro } = useSistema();
  const [listaDeNotificaciones, establecerListaDeNotificaciones] = useState([]);
  const [cargandoNotificaciones, establecerCargandoNotificaciones] =
    useState(true);

  useEffect(() => {
    async function BuscarNotificaciones() {
      try {
        const res = await BuscarNotificacionesPorFiltro({
          filtro: filtroBusqueda,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarRespuestasDelServidor({ status, data });
        } else {
          establecerListaDeNotificaciones(res.data);
        }
      } catch (error) {
        console.log(error);
        const { status, data } = error.response;
        ManejarRespuestasDelServidor({ status, data });
      } finally {
        establecerCargandoNotificaciones(false);
      }
    }
    BuscarNotificaciones();
  }, [filtroBusqueda]);

  return {
    listaDeNotificaciones,
    cargandoNotificaciones,
  };
}
