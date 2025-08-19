import { useEffect, useState } from "react";
import { useLlamadas } from "../../context/LlamadasContext";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";

export default function useBuscarLlamadasPorFiltro({ filtroBusqueda }) {
  const { BuscarLlamadasPorFiltro } = useLlamadas();
  const [listaDeLlamadas, establecerListaDeLlamadas] = useState([]);
  const [cargandoLlamadas, establecerCargandoLlamadas] = useState(true);

  useEffect(() => {
    async function BuscarLlamadas() {
      try {
        const res = await BuscarLlamadasPorFiltro({
          filtro: filtroBusqueda,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarRespuestasDelServidor({ status, data });
        } else {
          establecerListaDeLlamadas(res.data);
        }
      } catch (error) {
        const { status, data } = error.response;
        ManejarRespuestasDelServidor({ status, data });
      } finally {
        establecerCargandoLlamadas(false);
      }
    }
    BuscarLlamadas();
  }, [filtroBusqueda]);

  return {
    listaDeLlamadas,
    cargandoLlamadas,
  };
}
