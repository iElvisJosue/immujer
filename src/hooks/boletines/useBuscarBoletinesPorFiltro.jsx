import { useEffect, useState } from "react";
import { useBoletines } from "../../context/BoletinesContext";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";

export default function useBuscarBoletinesPorFiltro({ filtroBusqueda }) {
  const { BuscarBoletinesPorFiltro } = useBoletines();
  const [listaDeBoletines, establecerListaDeBoletines] = useState([]);
  const [cargandoBoletines, establecerCargandoBoletines] = useState(true);

  useEffect(() => {
    async function BuscarBoletines() {
      try {
        const res = await BuscarBoletinesPorFiltro({
          filtro: filtroBusqueda,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarRespuestasDelServidor({ status, data });
        } else {
          establecerListaDeBoletines(res.data);
        }
      } catch (error) {
        const { status, data } = error.response;
        ManejarRespuestasDelServidor({ status, data });
      } finally {
        establecerCargandoBoletines(false);
      }
    }
    BuscarBoletines();
  }, [filtroBusqueda]);

  return {
    listaDeBoletines,
    cargandoBoletines,
  };
}
