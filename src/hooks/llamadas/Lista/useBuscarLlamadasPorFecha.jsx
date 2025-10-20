// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
// IMPORTAMOS LOS CONTEXTOS
import { useSistemaContext } from "../../../context/SistemaContext";
import { useLlamadasContext } from "../../../context/LlamadasContext";

export default function useBuscarLlamadasPorFecha({
  primeraFecha,
  segundaFecha,
}) {
  const { BuscarPorFecha } = useLlamadasContext();
  // ESTE ESTADO CONTROLA LAS LLAMADAS EN TIEMPO REAL
  const { recargarLlamadas } = useSistemaContext();
  const [listaDeLlamadas, establecerListaDeLlamadas] = useState([]);
  const [cargandoLlamadas, establecerCargandoLlamadas] = useState(true);

  useEffect(() => {
    async function BuscarLlamadas() {
      try {
        const res = await BuscarPorFecha({
          primeraFecha,
          segundaFecha,
        });
        if (res.exito) establecerListaDeLlamadas(res.data);
      } finally {
        establecerCargandoLlamadas(false);
      }
    }
    BuscarLlamadas();
  }, [primeraFecha, segundaFecha, recargarLlamadas]);

  return {
    listaDeLlamadas,
    cargandoLlamadas,
  };
}
