/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useBuscarBoletinesPorFiltro from "../../../hooks/boletines/Lista/useBuscarBoletinesPorFiltro";
// COMPONENTES A USAR
import Buscador from "../../global/Buscardor";
import InformacionRegistro from "../../global/InformacionRegistro";
import SinResultados from "../../global/SinResultados";
import Cargando from "../../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../../helpers/Urls";
import { FormatearFechaALetra } from "../../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../../styles/components/boletines/Lista/ListaCompletaBoletines.css";

export default function ListaCompletaBoletines({
  PropsVista: { establecerSubvistaActual },
  PropsContenido: {
    filtroBusqueda,
    establecerFiltroBusqueda,
    establecerInfBoletinSeleccionado,
  },
}) {
  const { listaDeBoletines, cargandoBoletines } = useBuscarBoletinesPorFiltro({
    filtroBusqueda,
  });

  const EstablecerBoletinSeleccionado = (infBoletin) => {
    establecerInfBoletinSeleccionado(infBoletin);
    establecerSubvistaActual(2);
  };

  return (
    <section className="ListaCompletaBoletines">
      <Buscador
        TextoLabel="Buscar boletines"
        ValorInput={filtroBusqueda}
        FiltroBusqueda={establecerFiltroBusqueda}
      />
      {cargandoBoletines ? (
        <Cargando Texto="Cargando boletines..." />
      ) : listaDeBoletines.length > 0 ? (
        listaDeBoletines.map((infBoletin) => (
          <InformacionRegistro
            key={infBoletin.id_boletin}
            Imagen={`${HOST_IMAGENES}/Boletines/${infBoletin.imagen}`}
            Titulo={infBoletin.titulo}
            InfDestacada={
              infBoletin.recomendado
                ? {
                    Bg: "Recomendado",
                    Texto: "Recomendado",
                  }
                : null
            }
            ID={infBoletin.id_boletin}
            Descripcion={infBoletin.descripcion}
            Detalles={`Agregado el ${FormatearFechaALetra(
              infBoletin.fecha_creacion.slice(0, 10)
            )} a las ${infBoletin.hora_creacion}`}
            Color={infBoletin.activo ? "" : "Rojo"}
            FuncionParaRealizar={() =>
              EstablecerBoletinSeleccionado(infBoletin)
            }
          />
        ))
      ) : (
        <SinResultados>¡No se encontraron boletines!</SinResultados>
      )}
    </section>
  );
}
