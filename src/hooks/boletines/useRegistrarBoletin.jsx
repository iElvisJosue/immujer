// LIBRERÍAS A USAR
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDropzone } from "react-dropzone";
// CONTEXTOS A USAR
import { useBoletines } from "../../context/BoletinesContext";
import {
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../helpers/TiposDeAlertas";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/AgregarCookiePeticion";
export const useRegistrarBoletin = ({ idUsuario }) => {
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState(null);
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
  const ImagenBoletin = imagenSeleccionada
    ? URL.createObjectURL(imagenSeleccionada)
    : "Imagenes/Agregar_Imagen.png";

  return {
    register,
    imagenSeleccionada,
    getRootProps,
    getInputProps,
    isDragActive,
    PeticionRegistrarBoletin,
    ReiniciarRegistro,
    CampoRequerido,
    ImagenBoletin,
  };
};
