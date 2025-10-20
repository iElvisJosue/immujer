// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";
// HOOKS A USAR
import useUsuarios from "../hooks/usuarios/useUsuarios";

export default function Usuarios() {
  const PropsUsuarios = useUsuarios();
  const {
    PropsVista: {
      subvistaActual,
      TituloSubvista,
      OpcionesDeNavegacion,
      establecerSubvistaActual,
      ComponenteParaRenderizar,
    },
  } = PropsUsuarios;

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Usuarios"
      VistaActual={3}
      subvistaActual={subvistaActual}
      establecerSubvistaActual={establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TituloSubvista}
    >
      <ComponenteParaRenderizar {...PropsUsuarios} />
    </PlatillaMain>
  );
}
