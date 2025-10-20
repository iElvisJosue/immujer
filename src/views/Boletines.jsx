import useBoletines from "../hooks/boletines/useBoletines";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";

export default function Boletines() {
  const PropsBoletines = useBoletines();
  const {
    PropsVista: {
      subvistaActual,
      establecerSubvistaActual,
      TituloSubvista,
      OpcionesDeNavegacion,
      ComponenteParaRenderizar,
    },
  } = PropsBoletines;

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Boletines"
      VistaActual={2}
      subvistaActual={subvistaActual}
      establecerSubvistaActual={establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TituloSubvista}
    >
      <ComponenteParaRenderizar {...PropsBoletines} />
    </PlatillaMain>
  );
}
