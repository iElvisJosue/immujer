import { useEffect, useState } from "react";
import { useBoletinesContext } from "../../../context/BoletinesContext";

export default function useBuscarBoletinesPorFiltro({ filtroBusqueda }) {
  const { BuscarPorFiltro } = useBoletinesContext();
  const [listaDeBoletines, establecerListaDeBoletines] = useState([]);
  const [cargandoBoletines, establecerCargandoBoletines] = useState(true);

  useEffect(() => {
    async function BuscarBoletines() {
      try {
        const res = await BuscarPorFiltro({
          filtro: filtroBusqueda,
        });
        if (res.exito) establecerListaDeBoletines(res.data);
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
