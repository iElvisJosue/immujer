// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";
// HOOKS A USAR
import useUsuarios from "../hooks/usuarios/useUsuarios";
// COMPONENTES A USAR
import ListaCompletaUsuarios from "../components/usuarios/ListaCompletaUsuarios";
import RegistrarUsuario from "../components/usuarios/RegistrarUsuario";
import EditarUsuario from "../components/usuarios/EditarUsuario";

export default function Usuarios() {
  const { infUsuario } = useSistema();
  // OBTENEMOS LOS VALORES DE LOS HOOKS QUE VAMOS A UTILIZAR
  const { OpcionesDeNavegacion, TitulosSubvista, PropsCompartidos } =
    useUsuarios();
  // CREAMOS UNAS LISTAS PARA LAS VISTAS DE LOS COMPONENTES
  const listaDeComponentes = {
    0: ListaCompletaUsuarios,
    1: RegistrarUsuario,
    2: EditarUsuario,
  };
  // AGREGAMOS AL OBJETO DE PROPS COMPARTIDOS EL ID DEL USUARIO
  PropsCompartidos.idUsuario = infUsuario.id_usuario;
  // OBTENEMOS EL COMPONENTE QUE VAMOS A RENDERIZAR
  const ComponenteParaRenderizar =
    listaDeComponentes[PropsCompartidos.subvistaActual];

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Usuarios"
      VistaActual={3}
      subvistaActual={PropsCompartidos.subvistaActual}
      establecerSubvistaActual={PropsCompartidos.establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TitulosSubvista[PropsCompartidos.subvistaActual]}
    >
      <ComponenteParaRenderizar {...PropsCompartidos} />
    </PlatillaMain>
  );
}
