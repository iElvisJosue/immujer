// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
// CONTEXTOS A USAR
import { useDependencias } from "../../context/DependenciasContext";
import {
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../helpers/TiposDeAlertas";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/AgregarCookiePeticion";
export default function useRegistrarDependencia({
  idUsuario,
  imagenSeleccionada,
  establecerImagenSeleccionada,
}) {
  // FUNCION PARA LA PETICION DE REGISTRAR UNA DEPENDENCIA
  const { RegistrarNuevaDependencia } = useDependencias();
  // ESTADOS A USAR
  const [ubicacion, establecerUbicacion] = useState(null);
  // PARA MANEJAR EL FORMULARIO Y SUS ERRORES
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });
  const ReiniciarRegistro = () => {
    establecerImagenSeleccionada(null);
    establecerUbicacion(null);
    reset();
  };
  // CAMPO DEL MENSAJE DE ERROR
  const CampoRequerido = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
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
  };
  // FUNCION DE LA PETICION DE REGISTRAR UNA DEPENDENCIA
  const PeticionRegistrarDependencia = handleSubmit(async (data) => {
    if (!ubicacion) {
      // MOSTRAMOS LA ALERTA DE LA CONTRASEÑA ENCRYPTADA
      return AlertaInformativa({
        Titulo: "¡Sin ubicación!",
        Mensaje:
          "Debes seleccionar una ubicación en el mapa, esta nos proporcionara la ubicación exacta (Coordenadas) de la dependencia.",
        Imagen: "Imagenes/Error_Ubicacion.png",
        ColorAlerta: "Rojo",
      });
    }
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("tokenDeAcceso", COOKIE_CON_TOKEN);
      formData.append("idCreador", idUsuario);
      formData.append("NombreDependencia", data.NombreDependencia);
      formData.append("DescripcionDependencia", data.DescripcionDependencia);
      formData.append("DireccionDependencia", data.DireccionDependencia);
      formData.append("CPDependencia", data.CPDependencia);
      formData.append("TelefonoDependencia", data.TelefonoDependencia);
      formData.append("LatitudDependencia", ubicacion.lat);
      formData.append("LongitudDependencia", ubicacion.lng);
      formData.append("Imagen", imagenSeleccionada);
      const res = await RegistrarNuevaDependencia(formData);
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        const { status, data } = res;
        ManejarRespuestasDelServidor({ status, data });
        ReiniciarRegistro();
      }
    } catch (error) {
      console.error(error);
      ManejarRespuestasDelServidor();
    }
  });
  return {
    register,
    CampoRequerido,
    ubicacion,
    establecerUbicacion,
    PeticionRegistrarDependencia,
    ReiniciarRegistro,
  };
}
