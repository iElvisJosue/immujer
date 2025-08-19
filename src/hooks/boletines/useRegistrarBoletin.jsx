// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useBoletines } from "../../context/BoletinesContext";
// AYUDAS A USAR
import {
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../helpers/TiposDeAlertas";
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/AgregarCookiePeticion";
export default function useRegistrarBoletin({
  idUsuario,
  imagenSeleccionada,
  establecerImagenSeleccionada,
}) {
  const { RegistrarNuevoBoletin } = useBoletines();
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
  // PETICION DE REGISTRO
  const PeticionRegistrarBoletin = handleSubmit(async (data) => {
    if (!imagenSeleccionada) {
      // MOSTRAMOS LA ALERTA DE LA CONTRASEÑA ENCRYPTADA
      return AlertaInformativa({
        Titulo: "¡Sin imagen!",
        Mensaje:
          "Debes seleccionar una imagen para poder registrar el boletin, por favor inténtalo de nuevo.",
        Imagen: "Imagenes/Alerta_Error_Imagen.png",
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
      formData.append("TituloBoletin", data.TituloBoletin);
      formData.append("DescripcionBoletin", data.DescripcionBoletin);
      formData.append("RecomendadoBoletin", data.RecomendadoBoletin);
      formData.append("Imagen", imagenSeleccionada);
      const res = await RegistrarNuevoBoletin(formData);
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
    PeticionRegistrarBoletin,
    ReiniciarRegistro,
    CampoRequerido,
  };
}
