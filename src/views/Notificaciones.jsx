// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";
// HOOKS A USAR
import useNotificaciones from "../hooks/notificaciones/useNotificaciones";
// COMPONENTES A USAR
import ListaCompletaNotificaciones from "../components/notificaciones/ListaCompletaNotificaciones.jsx";
import EnviarNotificacion from "../components/notificaciones/EnviarNotificacion";

export default function Notificaciones() {
  const { infUsuario } = useSistema();
  // OBTENEMOS LOS VALORES DE LOS HOOKS QUE VAMOS A UTILIZAR
  const { OpcionesDeNavegacion, TitulosSubvista, PropsCompartidos } =
    useNotificaciones();
  // CREAMOS UNAS LISTAS PARA LAS VISTAS DE LOS COMPONENTES
  const listaDeComponentes = {
    0: ListaCompletaNotificaciones,
    1: EnviarNotificacion,
  };
  // AGREGAMOS AL OBJETO DE PROPS COMPARTIDOS EL ID DEL USUARIO
  PropsCompartidos.idUsuario = infUsuario.id_usuario;
  // OBTENEMOS EL COMPONENTE QUE VAMOS A RENDERIZAR
  const ComponenteParaRenderizar =
    listaDeComponentes[PropsCompartidos.subvistaActual];

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Notificaciones"
      VistaActual={4}
      subvistaActual={PropsCompartidos.subvistaActual}
      establecerSubvistaActual={PropsCompartidos.establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TitulosSubvista[PropsCompartidos.subvistaActual]}
    >
      <ComponenteParaRenderizar {...PropsCompartidos} />
    </PlatillaMain>
  );
}
