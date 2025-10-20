// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useBoletinesContext } from "../../../context/BoletinesContext";
// AYUDAS A USAR
import {
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../../helpers/TiposDeAlertas";
import { COOKIE_CON_TOKEN } from "../../../helpers/AgregarCookiePeticion";
import { ManejarRespuestasDelServidor } from "../../../helpers/ManejarRespuestasDelServidor";

export default function useRegistrarBoletin({
  idUsuario,
  imagenSeleccionada,
  establecerImagenSeleccionada,
}) {
  const { Registrar } = useBoletinesContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  const PeticionRegistrarBoletin = handleSubmit(async (data) => {
    // SI NO SE HA SELECCIONADO UNA IMAGEN, NO PERMITIMOS EL REGISTRO
    if (!ValidarImagen()) return;
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
      const res = await Registrar(formData);
      if (res.exito) ReiniciarRegistro();
    } catch {
      ManejarRespuestasDelServidor({});
    }
  });
  function ValidarImagen() {
    if (!imagenSeleccionada) {
      AlertaInformativa({
        Titulo: "¡Sin imagen!",
        Mensaje:
          "Debes seleccionar una imagen para poder registrar el boletin, por favor inténtalo de nuevo.",
        Imagen: "Imagenes/Alerta_Error_Imagen.png",
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
    reset();
  }

  return {
    register,
    PeticionRegistrarBoletin,
    ReiniciarRegistro,
    CampoRequerido,
  };
}
