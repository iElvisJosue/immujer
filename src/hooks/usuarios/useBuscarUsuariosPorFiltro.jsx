// LIBRERÍAS A USAR
import { useEffect, useState } from "react";
// CONTEXTOS A USAR
import { useUsuarios } from "../../context/UsuariosContext";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";

export default function useBuscarUsuariosPorFiltro({
  idUsuario,
  filtroBusqueda,
}) {
  const { BuscarUsuariosPorFiltro } = useUsuarios();
  const [listaDeUsuarios, establecerListaDeUsuarios] = useState([]);
  const [cargandoUsuarios, establecerCargandoUsuarios] = useState(true);

  useEffect(() => {
    async function BuscarUsuarios() {
      try {
        const res = await BuscarUsuariosPorFiltro({
          filtro: filtroBusqueda,
          idUsuario,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarRespuestasDelServidor({ status, data });
        } else {
          establecerListaDeUsuarios(res.data);
        }
      } catch (error) {
        const { status, data } = error.response;
        ManejarRespuestasDelServidor({ status, data });
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
