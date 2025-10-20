// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
// IMPORTAMOS LOS CONTEXTOS
import { useSistemaContext } from "../../../context/SistemaContext";
import { useLlamadasContext } from "../../../context/LlamadasContext";
// IMPORTAMOS LAS AYUDAS
import {
  AlertaDePregunta,
  AlertaRealizandoPeticion,
} from "../../../helpers/TiposDeAlertas";
import { HOST_ARCHIVOS } from "../../../helpers/Urls";
import { ObtenerFechaActual } from "../../../helpers/FuncionesGenerales";
import { ManejarRespuestasDelServidor } from "../../../helpers/ManejarRespuestasDelServidor";

export default function useGenerarReporte() {
  const {
    infUsuario: { id_usuario },
  } = useSistemaContext();
  const { ObtenerReportes, GenerarReporte } = useLlamadasContext();
  // OBTENEMOS LA FECHA ACTUAL
  const [primeraFecha, establecerPrimeraFecha] = useState(ObtenerFechaActual());
  const [segundaFecha, establecerSegundaFecha] = useState(ObtenerFechaActual());
  const [listaDeReportes, establecerListaDeReportes] = useState([]);
  const [cargandoReportes, establecerCargandoReportes] = useState(true);
  const [obtenerReportesNuevamente, establecerObtenerReportesNuevamente] =
    useState(false);

  useEffect(() => {
    ObtenerTodosLosReportes();
  }, [obtenerReportesNuevamente]);

  const ManejarPrimeraFecha = (event) => {
    establecerPrimeraFecha(event.target.value);
  };
  const ManejarSegundaFecha = (event) => {
    establecerSegundaFecha(event.target.value);
  };
  const ModalDescargarReporte = ({
    TituloModal = "¡Reporte generado con exito!",
    MensajeModal = "¿Desea descargar el reporte en este momento? El archivo seguirá disponible en esta sección cuando lo necesite.",
    NombreArchivo,
  }) => {
    const URL = `${HOST_ARCHIVOS}/${NombreArchivo}`;
    AlertaDePregunta({
      Titulo: TituloModal,
      Mensaje: MensajeModal,
      TextoBotonCancelar: "No",
      TextoBotonConfirmar: "Si, descargar el reporte",
      FuncionParaRealizar: () => {
        const link = document.createElement("a");
        link.href = URL;
        link.setAttribute("download", NombreArchivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    });
  };
  async function ObtenerTodosLosReportes() {
    try {
      const res = await ObtenerReportes();
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        establecerListaDeReportes(res.data);
      }
      establecerCargandoReportes(false);
    } catch {
      ManejarRespuestasDelServidor({});
    }
  }
  async function GenerarNuevoReporte() {
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      const res = await GenerarReporte({
        idUsuario: id_usuario,
        primeraFecha,
        segundaFecha,
      });
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        const NombreArchivo = res.data;
        establecerObtenerReportesNuevamente(!obtenerReportesNuevamente);
        ModalDescargarReporte({
          NombreArchivo,
        });
      }
    } catch {
      ManejarRespuestasDelServidor({});
    }
  }

  return {
    primeraFecha,
    establecerPrimeraFecha,
    segundaFecha,
    establecerSegundaFecha,
    cargandoReportes,
    listaDeReportes,
    ManejarPrimeraFecha,
    ManejarSegundaFecha,
    GenerarNuevoReporte,
    ModalDescargarReporte,
  };
}
