// LIBRERÍAS A USAR
import { useState } from "react";
// CONTEXTOS A USAR
import { useSistemaContext } from "../../context/SistemaContext";
// COMPONENTES A USAR
import EditarUsuario from "../../components/usuarios/Lista/EditarUsuario";
import RegistrarUsuario from "../../components/usuarios/Registrar/RegistrarUsuario";
import ListaCompletaUsuarios from "../../components/usuarios/Lista/ListaCompletaUsuarios";

export default function useUsuarios() {
  const { infUsuario } = useSistemaContext();
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const [filtroBusqueda, establecerFiltroBusqueda] = useState("");
  const [detallesUsuario, establecerDetallesUsuario] = useState(null);

  const TitulosSubvista = ["Lista completa", "Registrar", "Editar"];
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Lista_Completa.png",
      AltImagen: "Lista completa de usuarios",
      Texto: "Lista completa",
    },
    {
      Imagen: "Imagenes/Registrar.png",
      AltImagen: "Registrar",
      Texto: "Registrar",
    },
  ];
  const ListaComponentes = {
    0: ListaCompletaUsuarios,
    1: RegistrarUsuario,
    2: EditarUsuario,
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
    },
    PropsUsuario: {
      idUsuario: infUsuario.id_usuario,
      detallesUsuario,
      establecerDetallesUsuario,
    },
  };
}
