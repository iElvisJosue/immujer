// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
// HOOKS A USAR
import useBoletines from "../hooks/boletines/useBoletines";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";
// COMPONENTES A USAR
import ListaCompletaBoletines from "../components/boletines/ListaCompletaBoletines";
import RegistrarBoletin from "../components/boletines/RegistrarBoletin";
import EditarBoletin from "../components/boletines/EditarBoletin";

export default function Boletines() {
  const { infUsuario } = useSistema();
  // OBTENEMOS LOS VALORES DE LOS HOOKS QUE VAMOS A UTILIZAR
  const { OpcionesDeNavegacion, TitulosSubvista, PropsCompartidos } =
    useBoletines();
  // CREAMOS UNAS LISTAS PARA LAS VISTAS DE LOS COMPONENTES
  const listaDeComponentes = {
    0: ListaCompletaBoletines,
    1: RegistrarBoletin,
    2: EditarBoletin,
  };
  // AGREGAMOS AL OBJETO DE PROPS COMPARTIDOS EL ID DEL USUARIO
  PropsCompartidos.idUsuario = infUsuario.id_usuario;
  // OBTENEMOS EL COMPONENTE QUE VAMOS A RENDERIZAR
  const ComponenteParaRenderizar =
    listaDeComponentes[PropsCompartidos.subvistaActual];

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Boletines"
      VistaActual={2}
      subvistaActual={PropsCompartidos.subvistaActual}
      establecerSubvistaActual={PropsCompartidos.establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TitulosSubvista[PropsCompartidos.subvistaActual]}
    >
      <ComponenteParaRenderizar {...PropsCompartidos} />
    </PlatillaMain>
  );
}
