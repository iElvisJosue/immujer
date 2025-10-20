// LIBRERÍAS A USAR
import { useState } from "react";
// CONTEXTOS A USAR
import { useSistemaContext } from "../../context/SistemaContext";
// COMPONENTES A USAR
import ListaCompletaDependencias from "../../components/dependencias/Lista/ListaCompletaDependencias";
import RegistrarDependencia from "../../components/dependencias/Registrar/RegistrarDependencia";
import EditarDependencia from "../../components/dependencias/Lista/EditarDependencia";

export default function useDependencias() {
  const { infUsuario } = useSistemaContext();
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [infDependenciaSeleccionada, establecerInfDependenciaSeleccionada] =
    useState(null);
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Lista_Completa.png",
      AltImagen: "Lista completa",
      Texto: "Lista completa",
    },
    {
      Imagen: "Imagenes/Registrar.png",
      AltImagen: "Registrar dependencia",
      Texto: "Registrar",
    },
  ];
  const TitulosSubvista = ["Lista completa", "Registrar", "Editar"];
  const ListaComponentes = {
    0: ListaCompletaDependencias,
    1: RegistrarDependencia,
    2: EditarDependencia,
  };
  const ComponenteParaRenderizar = ListaComponentes[subvistaActual];

  return {
    PropsVista: {
      subvistaActual,
      TituloSubvista: TitulosSubvista[subvistaActual],
      OpcionesDeNavegacion,
      establecerSubvistaActual,
      ComponenteParaRenderizar,
    },
    PropsContenido: {
      filtroBusqueda,
      establecerFiltroBusqueda,
      infDependenciaSeleccionada,
      establecerInfDependenciaSeleccionada,
    },
    PropsUsuario: {
      idUsuario: infUsuario.id_usuario,
    },
  };
}
