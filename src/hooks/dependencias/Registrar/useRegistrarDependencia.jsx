// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
// CONTEXTOS A USAR
import { useDependenciasContext } from "../../../context/DependenciasContext";
import {
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../../helpers/TiposDeAlertas";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../../helpers/ManejarRespuestasDelServidor";

export default function useRegistrarDependencia({
  idUsuario,
  imagenSeleccionada,
  establecerImagenSeleccionada,
}) {
  const { Registrar } = useDependenciasContext();
  const [ubicacion, establecerUbicacion] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });
  const PeticionRegistrarDependencia = handleSubmit(async (data) => {
    // SI NO SE HA SELECCIONADO UNA UBICACION, NO PERMITIMOS EL REGISTRO
    if (!ValidarUbicacion()) return;
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("idCreador", idUsuario);
      formData.append("NombreDependencia", data.NombreDependencia);
      formData.append("DescripcionDependencia", data.DescripcionDependencia);
      formData.append("DireccionDependencia", data.DireccionDependencia);
      formData.append("CPDependencia", data.CPDependencia);
      formData.append("TelefonoDependencia", data.TelefonoDependencia);
      formData.append("LatitudDependencia", ubicacion.lat);
      formData.append("LongitudDependencia", ubicacion.lng);
      formData.append("Imagen", imagenSeleccionada);
      const res = await Registrar(formData);
      if (res.exito) ReiniciarRegistro();
    } catch {
      ManejarRespuestasDelServidor({});
    }
  });
  function ValidarUbicacion() {
    if (!ubicacion) {
      AlertaInformativa({
        Titulo: "¡Sin ubicación!",
        Mensaje:
          "Debes seleccionar una ubicación en el mapa, esta nos proporcionara la ubicación exacta (Coordenadas) de la dependencia.",
        Imagen: "Imagenes/Error_Ubicacion.png",
        ColorAlerta: "Rojo",
      });
      return false;
    }
    return true;
  }
  function CampoRequerido(NombreCampo) {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="CampoRequerido">
              {message}
            </small>
          ))
        }
      />
    );
  }
  function ReiniciarRegistro() {
    establecerImagenSeleccionada(null);
    establecerUbicacion(null);
    reset();
  }

  return {
    register,
    CampoRequerido,
    ubicacion,
    establecerUbicacion,
    PeticionRegistrarDependencia,
    ReiniciarRegistro,
  };
}
