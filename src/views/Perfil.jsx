// HOOKS A USAR
import usePerfil from "../hooks/perfil/usePerfil";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";

export default function Perfil() {
  const PropsPerfil = usePerfil();
  const {
    PropsVista: {
      subvistaActual,
      establecerSubvistaActual,
      TituloSubvista,
      OpcionesDeNavegacion,
      ComponenteParaRenderizar,
    },
  } = PropsPerfil;

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Mi Perfil"
      // PONEMOS 100 PORQUE NO TENDREMOS 100 VISTAS
      // POR LO TANTO NUNCA SE MARCARA UNA OPCION
      VistaActual={100}
      subvistaActual={subvistaActual}
      establecerSubvistaActual={establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TituloSubvista}
    >
      <ComponenteParaRenderizar {...PropsPerfil} />
    </PlatillaMain>
  );
}
