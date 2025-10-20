/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useBuscarLlamadasPorFecha from "../../../hooks/llamadas/Lista/useBuscarLlamadasPorFecha";
// COMPONENTES A USAR
import Cargando from "../../global/Cargando";
import SinResultados from "../../global/SinResultados";
import InformacionRegistro from "../../global/InformacionRegistro";
// AYUDAS A USAR
import { HOST_IMAGENES } from "../../../helpers/Urls";
import { FormatearFechaALetra } from "../../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../../styles/components/llamadas/Lista/ListaPorFechaLlamadas.css";

export default function ListaPorFechaLlamadas({
  PropsVista: { establecerSubvistaActual, establecerVieneDeVistaCompleta },
  PropsContenido: {
    primeraFecha,
    segundaFecha,
    establecerPrimeraFecha,
    establecerSegundaFecha,
    establecerIdLlamadaSeleccionada,
  },
}) {
  const { listaDeLlamadas, cargandoLlamadas } = useBuscarLlamadasPorFecha({
    primeraFecha,
    segundaFecha,
  });
  const EstablecerLlamadaSeleccionada = (idLlamada) => {
    establecerIdLlamadaSeleccionada(idLlamada);
    establecerSubvistaActual(3);
    establecerVieneDeVistaCompleta(false);
  };
  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };

  return (
    <section className="ListaPorFechaLlamadas">
      <div className="ListaPorFechaLlamadas__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="ListaPorFechaLlamadas__Botones--Boton"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="ListaPorFechaLlamadas__Botones--Boton"
          onChange={ManejarSegundaFecha}
        />
      </div>
      {cargandoLlamadas ? (
        <Cargando Texto="Cargando historial de llamadas..." />
      ) : listaDeLlamadas.length > 0 ? (
        // <>
        //   <GenerarPDF
        //     Componente={GenerarPDFInfracciones}
        //     ListaParaPDF={listaDeLlamadas}
        //     NombrePDF="Lista_De_Infracciones_Por_Fecha"
        //   />
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
        // </>
        <SinResultados>¡No se encontraron llamadas!</SinResultados>
      )}
    </section>
  );
}
