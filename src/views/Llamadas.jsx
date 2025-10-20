// HOOKS A USAR
import useLlamadas from "../hooks/llamadas/useLlamadas";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";

export default function Llamadas() {
  const PropsLlamadas = useLlamadas();
  const {
    PropsVista: {
      subvistaActual,
      establecerSubvistaActual,
      TituloSubvista,
      OpcionesDeNavegacion,
      ComponenteParaRenderizar,
    },
  } = PropsLlamadas;

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Llamadas"
      VistaActual={0}
      subvistaActual={subvistaActual}
      establecerSubvistaActual={establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TituloSubvista}
    >
      <ComponenteParaRenderizar {...PropsLlamadas} />
    </PlatillaMain>
  );
}
