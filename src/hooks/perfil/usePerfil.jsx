// LIBRERÍAS A USAR
import { useState } from "react";
// CONTEXTOS A USAR
import { useSistemaContext } from "../../context/SistemaContext";
// COMPONENTES A USAR
import MiInformacion from "../../components/perfil/MiInformacion";
import ActualizarInformacion from "../../components/perfil/ActualizarInformacion";

export default function usePerfil() {
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const {
    infUsuario,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
  } = useSistemaContext();

  const TitulosSubvista = ["Mi información", "Actualizar mi información"];
  const OpcionesDeNavegacion = [
    {
      Imagen: "Imagenes/Mi_informacion.png",
      AltImagen: "Mi información",
      Texto: "Mi información",
    },
    {
      Imagen: "Imagenes/Alerta_Actualizacion.png",
      AltImagen: "Actualizar información",
      Texto: "Actualizar información",
    },
  ];
  const ListaComponentes = {
    0: MiInformacion,
    1: ActualizarInformacion,
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
    PropsUsuario: {
      idUsuario: infUsuario.id_usuario,
      Foto: infUsuario.foto,
      Nombre: infUsuario.nombre,
      ApellidoPaterno: infUsuario.apellido_paterno,
      ApellidoMaterno: infUsuario.apellido_materno,
      Telefono: infUsuario.telefono,
      Rol: infUsuario.rol,
      Correo: infUsuario.correo,
      obtenerInformacionNuevamente,
      establecerObtenerInformacionNuevamente,
    },
  };
}
