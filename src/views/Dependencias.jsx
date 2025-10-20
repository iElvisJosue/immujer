// IMPORTAMOS LOS HOOKS A USAR
import useDependencias from "../hooks/dependencias/useDependencias";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";

export default function Dependencias() {
  const PropsDependencias = useDependencias();
  const {
    PropsVista: {
      subvistaActual,
      establecerSubvistaActual,
      TituloSubvista,
      OpcionesDeNavegacion,
      ComponenteParaRenderizar,
    },
  } = PropsDependencias;

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Dependencias"
      VistaActual={1}
      subvistaActual={subvistaActual}
      establecerSubvistaActual={establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TituloSubvista}
    >
      <ComponenteParaRenderizar {...PropsDependencias} />
    </PlatillaMain>
  );
}
