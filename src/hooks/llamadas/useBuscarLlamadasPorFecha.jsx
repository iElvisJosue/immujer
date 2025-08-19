// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
// IMPORTAMOS LOS CONTEXTOS
import { useLlamadas } from "../../context/LlamadasContext";
// IMPORTAMOS LAS AYUDAS
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";

export default function useBuscarLlamadasPorFecha({
  primeraFecha,
  segundaFecha,
}) {
  const { BuscarLlamadadasPorFecha } = useLlamadas();
  const [listaDeLlamadas, establecerListaDeLlamadas] = useState([]);
  const [cargandoLlamadas, establecerCargandoLlamadas] = useState(true);

  useEffect(() => {
    async function BuscarPorFecha() {
      try {
        const res = await BuscarLlamadadasPorFecha({
          primeraFecha,
          segundaFecha,
        });
        if (res.response) {
          const { status, data } = res.response;
          ManejarRespuestasDelServidor({ status, data });
        } else {
          establecerListaDeLlamadas(res.data);
        }
        establecerCargandoLlamadas(false);
      } catch (error) {
        const { status, data } = error.response;
        ManejarRespuestasDelServidor({ status, data });
      }
    }
    BuscarPorFecha();
  }, [primeraFecha, segundaFecha]);

  return {
    listaDeLlamadas,
    cargandoLlamadas,
  };
}
