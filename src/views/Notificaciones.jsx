// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";
// HOOKS A USAR
import useNotificaciones from "../hooks/notificaciones/useNotificaciones";

export default function Notificaciones() {
  const PropsNotificaciones = useNotificaciones();
  const {
    PropsVista: {
      subvistaActual,
      TituloSubvista,
      OpcionesDeNavegacion,
      establecerSubvistaActual,
      ComponenteParaRenderizar,
    },
  } = PropsNotificaciones;

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Notificaciones"
      VistaActual={4}
      subvistaActual={subvistaActual}
      establecerSubvistaActual={establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TituloSubvista}
    >
      <ComponenteParaRenderizar {...PropsNotificaciones} />
    </PlatillaMain>
  );
}
