// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
// CONTEXTOS A USAR
import { useUsuariosContext } from "../../../context/UsuariosContext";

export default function useBuscarUsuariosPorFiltro({
  idUsuario,
  filtroBusqueda,
}) {
  const { BuscarPorFiltro } = useUsuariosContext();
  const [listaDeUsuarios, establecerListaDeUsuarios] = useState([]);
  const [cargandoUsuarios, establecerCargandoUsuarios] = useState(true);

  useEffect(() => {
    async function BuscarUsuarios() {
      try {
        const res = await BuscarPorFiltro({
          filtro: filtroBusqueda,
          idUsuario,
        });
        if (res.exito) establecerListaDeUsuarios(res.data);
      } finally {
        establecerCargandoUsuarios(false);
      }
    }
    BuscarUsuarios();
  }, [filtroBusqueda]);

  return {
    listaDeUsuarios,
    cargandoUsuarios,
  };
}
