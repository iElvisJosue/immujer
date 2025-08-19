// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";
// IMPORTAMOS LOS HOOKS A USAR
import useDependencias from "../hooks/dependencias/useDependencias";
// COMPONENTES A USAR
import ListaCompletaDependencias from "../components/dependencias/ListaCompletaDependencias";
import RegistrarDependencia from "../components/dependencias/RegistrarDependencia";
import EditarDependencia from "../components/dependencias/EditarDependencia";

export default function Dependencias() {
  const { infUsuario } = useSistema();
  // OBTENEMOS LOS VALORES DE LOS HOOKS QUE VAMOS A UTILIZAR
  const { OpcionesDeNavegacion, TitulosSubvista, PropsCompartidos } =
    useDependencias();
  // CREAMOS UNAS LISTAS PARA LAS VISTAS DE LOS COMPONENTES
  const listaDeComponentes = {
    0: ListaCompletaDependencias,
    1: RegistrarDependencia,
    2: EditarDependencia,
  };
  // AGREGAMOS AL OBJETO DE PROPS COMPARTIDOS EL ID DEL USUARIO
  PropsCompartidos.idUsuario = infUsuario.id_usuario;
  // OBTENEMOS EL COMPONENTE QUE VAMOS A RENDERIZAR
  const ComponenteParaRenderizar =
    listaDeComponentes[PropsCompartidos.subvistaActual];

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Dependencias"
      VistaActual={1}
      subvistaActual={PropsCompartidos.subvistaActual}
      establecerSubvistaActual={PropsCompartidos.establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TitulosSubvista[PropsCompartidos.subvistaActual]}
    >
      <ComponenteParaRenderizar {...PropsCompartidos} />
    </PlatillaMain>
  );
}
