/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useBuscarLlamadasPorFecha from "../../hooks/llamadas/useBuscarLlamadasPorFecha";
// COMPONENTES A USAR
import InformacionRegistro from "../global/InformacionRegistro";
import SinResultados from "../global/SinResultados";
import Cargando from "../global/Cargando";
// AYUDAS A USAR
import { FormatearFechaALetra } from "../../helpers/FuncionesGenerales";
import { HOST_IMAGENES } from "../../helpers/Urls";
// ESTILOS A USAR
import "../../styles/components/llamadas/ListaPorFechaLlamadas.css";
export default function ListaPorFechaLlamadas({
  primeraFecha,
  establecerPrimeraFecha,
  segundaFecha,
  establecerSegundaFecha,
  establecerInfLlamadaSeleccionada,
  establecerSubvistaActual,
  establecerVieneDeVistaCompleta,
}) {
  const { listaDeLlamadas, cargandoLlamadas } = useBuscarLlamadasPorFecha({
    primeraFecha,
    segundaFecha,
  });
  const EstablecerLlamadaSeleccionada = (infLlamada) => {
    establecerInfLlamadaSeleccionada(infLlamada);
    establecerSubvistaActual(2);
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
        // </>
        <SinResultados>¡No se encontraron llamadas!</SinResultados>
      )}
    </section>
  );
}
