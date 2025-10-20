/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useBuscarLlamadasPorFiltro from "../../../hooks/llamadas/Lista/useBuscarLlamadasPorFiltro";
// COMPONENTES A USAR
import Cargando from "../../global/Cargando";
import Buscador from "../../global/Buscardor";
import SinResultados from "../../global/SinResultados";
import InformacionRegistro from "../../global/InformacionRegistro";
// IMPORTAMOS LAS AYUDAS
import { HOST_IMAGENES } from "../../../helpers/Urls";
import { FormatearFechaALetra } from "../../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../../styles/components/llamadas/Lista/ListaCompletaLlamadas.css";

export default function ListaCompletaLlamadas({
  PropsVista: { establecerSubvistaActual, establecerVieneDeVistaCompleta },
  PropsContenido: {
    filtroBusqueda,
    establecerFiltroBusqueda,
    establecerIdLlamadaSeleccionada,
  },
}) {
  const { listaDeLlamadas, cargandoLlamadas } = useBuscarLlamadasPorFiltro({
    filtroBusqueda,
  });

  const EstablecerLlamadaSeleccionada = (idLlamada) => {
    establecerIdLlamadaSeleccionada(idLlamada);
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
            key={infLlamada.id_llamada}
            Imagen={`${HOST_IMAGENES}/Perfil/${infLlamada.foto}`}
            Titulo={`${infLlamada.nombre_creador} ${infLlamada.apellido_paterno_creador} ${infLlamada.apellido_materno_creador}`}
            InfDestacada={{
              Bg: infLlamada.fase,
              Texto: `Estado: ${infLlamada.fase}`,
            }}
            ID={infLlamada.id_llamada}
            Descripcion={`Realicé esta llamada el ${FormatearFechaALetra(
              infLlamada.fecha_creacion.slice(0, 10)
            )} a las ${infLlamada.hora_creacion}`}
            Detalles={`${infLlamada.telefono} - ${infLlamada.correo}`}
            FuncionParaRealizar={() =>
              EstablecerLlamadaSeleccionada(infLlamada.id_llamada)
            }
          />
        ))
      ) : (
        <SinResultados>¡No se encontraron llamadas!</SinResultados>
      )}
    </section>
  );
}
