import { useEffect, useState } from "react";
import { useDependencias } from "../../context/DependenciasContext";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";

export default function useBuscarDependenciasPorFiltro({ filtroBusqueda }) {
  const { BuscarDependenciasPorFiltro } = useDependencias();
  const [listaDeDependencias, establecerListaDeDependencias] = useState([]);
  const [cargandoDependencias, establecerCargandoDependencias] = useState(true);

  useEffect(() => {
    async function BuscarDependencias() {
      try {
        const res = await BuscarDependenciasPorFiltro({
          filtro: filtroBusqueda,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarRespuestasDelServidor({ status, data });
        } else {
          establecerListaDeDependencias(res.data);
        }
      } catch (error) {
        const { status, data } = error.response;
        ManejarRespuestasDelServidor({ status, data });
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
