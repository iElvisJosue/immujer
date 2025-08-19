// LIBRERÍAS A USAR
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
// CONTEXTOS A USAR
import { useDependencias } from "../../context/DependenciasContext";
import {
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../helpers/TiposDeAlertas";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/AgregarCookiePeticion";
export const useRegistrarDependencia = ({ idUsuario }) => {
  // FUNCION PARA LA PETICION DE REGISTRAR UNA DEPENDENCIA
  const { RegistrarNuevaDependencia } = useDependencias();
  // ESTADOS A USAR
  const [ubicacion, establecerUbicacion] = useState(null);
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState(null);
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
  // MODULO PARA LA IMAGEN
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      return AlertaInformativa({
        Titulo: "¡No más de una imagen!",
        Mensaje: "Solo puedes subir una imagen, por favor inténtalo de nuevo.",
        Imagen: "Imagenes/Alerta_Duplicado.png",
        ColorAlerta: "Rojo",
      });
    }
    if (!acceptedFiles[0].type.startsWith("image")) {
      return AlertaInformativa({
        Titulo: "¡Archivo no valido!",
        Mensaje:
          "Uno de los archivos no es una imagen, por favor inténtalo de nuevo.",
        Imagen: "Imagenes/Alerta_Duplicado.png",
        ColorAlerta: "Rojo",
      });
    }
    if (acceptedFiles[0].size > 10000000) {
      return AlertaInformativa({
        Titulo: "Imagen demasiado grande!",
        Mensaje:
          "La imagen seleccionada es demasiado grande y sobre pasa el tamaño permitido (10MB), por favor inténtalo de nuevo.",
        Imagen: "Imagenes/Alerta_Duplicado.png",
        ColorAlerta: "Rojo",
      });
    }
    // SI PASA LAS VALIDACIONES, GUARDAMOS LA IMAGEN
    establecerImagenSeleccionada(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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
  // PREVIEW DE LA IMAGEN DE LA DEPENDENCIA
  const ImagenDependencia = imagenSeleccionada
    ? URL.createObjectURL(imagenSeleccionada)
    : "Imagenes/Agregar_Imagen.png";
  return {
    register,
    CampoRequerido,
    ubicacion,
    establecerUbicacion,
    getRootProps,
    getInputProps,
    isDragActive,
    PeticionRegistrarDependencia,
    ReiniciarRegistro,
    ImagenDependencia,
  };
};
