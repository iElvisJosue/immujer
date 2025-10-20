/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useBuscarDependenciasPorFiltro from "../../../hooks/dependencias/Lista/useBuscarDependenciasPorFiltro";
// COMPONENTES A USAR
import Cargando from "../../global/Cargando";
import Buscador from "../../global/Buscardor";
import SinResultados from "../../global/SinResultados";
import InformacionRegistro from "../../global/InformacionRegistro";
// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../../helpers/Urls";
import { FormatearFechaALetra } from "../../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../../styles/components/dependencias/Lista/ListaCompletaDependencias.css";

export default function ListaCompletaDependencias({
  PropsVista: { establecerSubvistaActual },
  PropsContenido: {
    filtroBusqueda,
    establecerFiltroBusqueda,
    establecerInfDependenciaSeleccionada,
  },
}) {
  const { listaDeDependencias, cargandoDependencias } =
    useBuscarDependenciasPorFiltro({ filtroBusqueda });

  const EstablecerDependenciaSeleccionada = (infDependencia) => {
    establecerInfDependenciaSeleccionada(infDependencia);
    establecerSubvistaActual(2);
  };

  return (
    <section className="ListaCompletaDependencias">
      <Buscador
        TextoLabel="Buscar dependencias"
        ValorInput={filtroBusqueda}
        FiltroBusqueda={establecerFiltroBusqueda}
      />
      {cargandoDependencias ? (
        <Cargando Texto="Cargando dependencias..." />
      ) : listaDeDependencias.length > 0 ? (
        listaDeDependencias.map((infDependencia) => (
          <InformacionRegistro
            key={infDependencia.id_dependencia}
            Imagen={`${HOST_IMAGENES}/Dependencias/${infDependencia.foto}`}
            Titulo={infDependencia.nombre}
            ID={infDependencia.id_dependencia}
            Descripcion={infDependencia.descripcion}
            Detalles={`Agregada el ${FormatearFechaALetra(
              infDependencia.fecha_creacion.slice(0, 10)
            )} a las ${infDependencia.hora_creacion}`}
            Color={infDependencia.activo ? "" : "Rojo"}
            FuncionParaRealizar={() =>
              EstablecerDependenciaSeleccionada(infDependencia)
            }
          />
        ))
      ) : (
        <SinResultados>¡No se encontraron dependencias!</SinResultados>
      )}
    </section>
  );
}
