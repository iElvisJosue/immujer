// LIBRERÍAS A USAR
import { useState } from "react";
// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
// PLANTILLA A USAR
import PlatillaMain from "./PlantillaMain";
// COMPONENTES A USAR
import MiInformacion from "../components/perfil/MiInformacion";
import ActualizarInformacion from "../components/perfil/ActualizarInformacion";

export default function Perfil() {
  const [subvistaActual, establecerSubvistaActual] = useState(0);
  const {
    infUsuario,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
  } = useSistema();
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
  const TitulosSubvista = ["Mi información", "Actualizar mi información"];
  const PropsCompartidos = {
    infUsuario,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
    subvistaActual,
    establecerSubvistaActual,
  };
  const listaDeComponentes = {
    0: MiInformacion,
    1: ActualizarInformacion,
  };
  const ComponenteParaRenderizar = listaDeComponentes[subvistaActual];

  return (
    <PlatillaMain
      TituloParteUno="Vista"
      TituloParteDos="Mi Perfil"
      // PONEMOS 100 PORQUE NO TENDREMOS 100 VISTAS
      // POR LO TANTO NUNCA SE MARCARA UNA OPCION
      VistaActual={100}
      subvistaActual={subvistaActual}
      establecerSubvistaActual={establecerSubvistaActual}
      OpcionesDeNavegacion={OpcionesDeNavegacion}
      TituloSubvista={TitulosSubvista[subvistaActual]}
    >
      <ComponenteParaRenderizar {...PropsCompartidos} />
    </PlatillaMain>
  );
}
