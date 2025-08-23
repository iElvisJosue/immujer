// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
// HOOKS A USAR
import useLlamadas from "../hooks/llamadas/useLlamadas";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";
// COMPONENTES A USAR
import ListaCompletaLlamadas from "../components/llamadas/ListaCompletaLlamadas";
import ListaPorFechaLlamadas from "../components/llamadas/ListaPorFechaLlamadas";
import DetallesLlamada from "../components/llamadas/DetallesLlamada";

export default function Dependencias() {
  const { infUsuario } = useSistema();
  // OBTENEMOS LOS VALORES DE LOS HOOKS QUE VAMOS A UTILIZAR
  const { TitulosSubvista, OpcionesDeNavegacion, PropsCompartidos } =
    useLlamadas();
  // CREAMOS UNAS LISTAS PARA LAS VISTAS DE LOS COMPONENTES
  const listaDeComponentes = {
    0: ListaCompletaLlamadas,
    1: ListaPorFechaLlamadas,
    2: DetallesLlamada,
  };
  // AGREGAMOS AL OBJETO DE PROPS COMPARTIDOS EL ID DEL USUARIO
  PropsCompartidos.idUsuario = infUsuario.id_usuario;
  // OBTENEMOS EL COMPONENTE QUE VAMOS A RENDERIZAR
  const ComponenteParaRenderizar =
    listaDeComponentes[PropsCompartidos.subvistaActual];
  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Llamadas"
      VistaActual={0}
      subvistaActual={PropsCompartidos.subvistaActual}
      establecerSubvistaActual={PropsCompartidos.establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TitulosSubvista[PropsCompartidos.subvistaActual]}
    >
      <ComponenteParaRenderizar {...PropsCompartidos} />
    </PlatillaMain>
  );
}
