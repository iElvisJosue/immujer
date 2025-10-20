// IMPORTAMOS LOS HOOKS A USAR
import useGenerarReporte from "../../../hooks/llamadas/Reporte/useGenerarReporte";
// COMPONENTES A USAR
import Cargando from "../../global/Cargando";
import SinResultados from "../../global/SinResultados";
import InformacionRegistro from "../../global/InformacionRegistro";
// AYUDAS A USAR
import { LISTA_SVGS } from "../../../helpers/SVGs";
import { FormatearFechaALetra } from "../../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../../styles/components/llamadas/Reporte/GenerarReporte.css";

export default function GenerarReporte() {
  const {
    primeraFecha,
    segundaFecha,
    cargandoReportes,
    listaDeReportes,
    ManejarPrimeraFecha,
    ManejarSegundaFecha,
    GenerarNuevoReporte,
    ModalDescargarReporte,
  } = useGenerarReporte();

  return (
    <section className="GenerarReporte">
      <div className="GenerarReporte__Botones">
        <input
          type="date"
          name="primeraFecha"
          id="primeraFecha"
          value={primeraFecha}
          className="GenerarReporte__Botones--Fecha"
          onChange={ManejarPrimeraFecha}
        />
        <input
          type="date"
          name="segundaFecha"
          id="segundaFecha"
          value={segundaFecha}
          className="GenerarReporte__Botones--Fecha"
          onChange={ManejarSegundaFecha}
        />
        <button
          className="GenerarReporte__Botones--Boton"
          onClick={GenerarNuevoReporte}
        >
          <LISTA_SVGS SVG="GENERAR_ARCHIVO" Clase="SVG Blanco" Tamaño="20" />
        </button>
      </div>
      {cargandoReportes ? (
        <Cargando Texto="Cargando historial de reportes..." />
      ) : listaDeReportes.length > 0 ? (
        listaDeReportes.map((infReporte) => (
          <InformacionRegistro
            key={infReporte.id_reporte}
            Imagen="Imagenes/ExcelCircular.png"
            Titulo="Reporte de llamadas"
            ID={infReporte.id_reporte}
            Descripcion={`Este reporte realizado por ${
              infReporte.nombre
            } contiene ${infReporte.cantidad_registros} ${
              infReporte.cantidad_registros === 1 ? "llamada" : "llamadas"
            }.`}
            Detalles={`Creado el ${FormatearFechaALetra(
              infReporte.fecha_creacion.slice(0, 10)
            )} a las ${infReporte.hora_creacion}`}
            FuncionParaRealizar={() =>
              ModalDescargarReporte({
                TituloModal: "¿Descargar reporte?",
                MensajeModal:
                  "El archivo seguirá disponible en esta sección cuando lo necesite.",
                NombreArchivo: infReporte.nombre_reporte,
              })
            }
          />
        ))
      ) : (
        <SinResultados>¡No se encontraron reportes!</SinResultados>
      )}
    </section>
  );
}
