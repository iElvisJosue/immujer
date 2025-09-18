/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useBuscarLlamadasPorFiltro from "../../hooks/llamadas/useBuscarLlamadasPorFiltro";
// COMPONENTES A USAR
import Buscador from "../global/Buscardor";
import InformacionRegistro from "../global/InformacionRegistro";
import SinResultados from "../global/SinResultados";
import Cargando from "../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../helpers/Urls";
import { FormatearFechaALetra } from "../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../styles/components/llamadas/ListaCompletaLlamadas.css";

export default function ListaCompletaLlamadas({
  establecerInfLlamadaSeleccionada,
  filtroBusqueda,
  establecerFiltroBusqueda,
  establecerSubvistaActual,
  establecerVieneDeVistaCompleta,
}) {
  const { listaDeLlamadas, cargandoLlamadas } = useBuscarLlamadasPorFiltro({
    filtroBusqueda,
  });

  const EstablecerLlamadaSeleccionada = (infLlamada) => {
    establecerInfLlamadaSeleccionada(infLlamada);
    establecerVieneDeVistaCompleta(true);
    establecerSubvistaActual(3);
  };

  return (
    <section className="ListaCompletaLlamadas">
      <Buscador
        TextoLabel="Buscar llamada"
        ValorInput={filtroBusqueda}
        FiltroBusqueda={establecerFiltroBusqueda}
      />
      {cargandoLlamadas ? (
        <Cargando Texto="Cargando historial de llamadas..." />
      ) : listaDeLlamadas.length > 0 ? (
        listaDeLlamadas.map((infLlamada) => (
          <InformacionRegistro
            key={infLlamada.id_historial_llamada}
            Imagen={`${HOST_IMAGENES}/Perfil/${infLlamada.foto}`}
            Titulo={`${infLlamada.nombre} ${infLlamada.apellido_paterno} ${infLlamada.apellido_materno}`}
            ID={infLlamada.id_historial_llamada}
            Descripcion={`Realicé esta llamada el ${FormatearFechaALetra(
              infLlamada.fecha_creacion.slice(0, 10)
            )} a las ${infLlamada.hora_creacion}`}
            Detalles={`${infLlamada.telefono} - ${infLlamada.correo}`}
            FuncionParaRealizar={() =>
              EstablecerLlamadaSeleccionada(infLlamada)
            }
          />
        ))
      ) : (
        <SinResultados>¡No se encontraron llamadas!</SinResultados>
      )}
    </section>
  );
}
