// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
// CONTEXTOS A USAR
import { useDependenciasContext } from "../../../context/DependenciasContext";

export default function useBuscarDependenciasPorFiltro({ filtroBusqueda }) {
  const { BuscarPorFiltro } = useDependenciasContext();
  const [listaDeDependencias, establecerListaDeDependencias] = useState([]);
  const [cargandoDependencias, establecerCargandoDependencias] = useState(true);

  useEffect(() => {
    async function BuscarDependencias() {
      try {
        const res = await BuscarPorFiltro({
          filtro: filtroBusqueda,
        });
        if (res.exito) establecerListaDeDependencias(res.data);
      } finally {
        establecerCargandoDependencias(false);
      }
    }
    BuscarDependencias();
  }, [filtroBusqueda]);

  return {
    listaDeDependencias,
    cargandoDependencias,
  };
}
