// LIBRERÍAS A USAR
import { useState } from "react";
// CONTEXTOS A USAR
import { useSistemaContext } from "../../context/SistemaContext";
// COMPONENTES A USAR
import ListaCompletaBoletines from "../../components/boletines/Lista/ListaCompletaBoletines";
import RegistrarBoletin from "../../components/boletines/Registrar/RegistrarBoletin";
import EditarBoletin from "../../components/boletines/Lista/EditarBoletin";

export default function useBoletines() {
  const { infUsuario } = useSistemaContext();
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [infBoletinSeleccionado, establecerInfBoletinSeleccionado] =
    useState(null);
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Lista_Completa.png",
      AltImagen: "Lista completa",
      Texto: "Lista completa",
    },
    {
      Imagen: "Imagenes/Registrar.png",
      AltImagen: "Registrar boletin",
      Texto: "Registrar",
    },
  ];
  const TitulosSubvista = ["Lista completa", "Registrar", "Editar"];
  const ListaComponentes = {
    0: ListaCompletaBoletines,
    1: RegistrarBoletin,
    2: EditarBoletin,
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
      infBoletinSeleccionado,
      establecerFiltroBusqueda,
      establecerInfBoletinSeleccionado,
    },
    PropsUsuario: {
      idUsuario: infUsuario.id_usuario,
    },
  };
}
