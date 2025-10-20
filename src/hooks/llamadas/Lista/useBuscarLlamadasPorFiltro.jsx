// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
// IMPORTAMOS LOS CONTEXTOS
import { useSistemaContext } from "../../../context/SistemaContext";
import { useLlamadasContext } from "../../../context/LlamadasContext";

export default function useBuscarLlamadasPorFiltro({ filtroBusqueda }) {
  // ESTE ESTADO CONTROLA LAS LLAMADAS EN TIEMPO REAL
  const { recargarLlamadas } = useSistemaContext();
  const { BuscarPorFiltro } = useLlamadasContext();
  const [listaDeLlamadas, establecerListaDeLlamadas] = useState([]);
  const [cargandoLlamadas, establecerCargandoLlamadas] = useState(true);

  useEffect(() => {
    async function BuscarLlamadas() {
      try {
        const res = await BuscarPorFiltro({
          filtro: filtroBusqueda,
        });
        if (res.exito) establecerListaDeLlamadas(res.data);
      } finally {
        establecerCargandoLlamadas(false);
      }
    }
    BuscarLlamadas();
  }, [filtroBusqueda, recargarLlamadas]);

  return {
    listaDeLlamadas,
    cargandoLlamadas,
  };
}
