// IMPORTAMOS LAS LIBRERÍAS A USAR
import { useEffect, useState } from "react";
// IMPORTAMOS EL CONTEXTO A USAR
import { useNotificacionesContext } from "../../../context/NotificacionesContext";

export default function useBuscarNotificacionesPorFiltro({ filtroBusqueda }) {
  const { BuscarPorFiltro } = useNotificacionesContext();
  const [listaDeNotificaciones, establecerListaDeNotificaciones] = useState([]);
  const [cargandoNotificaciones, establecerCargandoNotificaciones] =
    useState(true);

  useEffect(() => {
    async function BuscarNotificaciones() {
      try {
        const res = await BuscarPorFiltro({
          filtro: filtroBusqueda,
        });
        if (res.exito) establecerListaDeNotificaciones(res.data);
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
