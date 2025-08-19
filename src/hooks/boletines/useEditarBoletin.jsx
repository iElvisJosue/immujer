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
import { HOST_IMAGENES } from "../../helpers/Urls";
export const useEditarBoletin = ({ infBoletin, establecerSubvistaActual }) => {
  // FUNCION DE LA PETICION DE EDITAR UN BOLETIN
  const { EditarUnBoletin } = useBoletines();
  // ESTADOS A USAR
  const [boletinActivo, establecerBoletinActivo] = useState(infBoletin.activo);
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState(null);
  // PARA MANEJAR EL FORMULARIO Y SUS ERRORES
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      TituloBoletin: infBoletin.titulo,
      DescripcionBoletin: infBoletin.descripcion,
      RecomendadoBoletin: infBoletin.recomendado ? "Si" : "No",
    },
    criteriaMode: "all",
  });
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
  // FUNCION PARA EDITAR UN BOLETIN
  const PeticionEditarBoletin = handleSubmit(async (data) => {
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("tokenDeAcceso", COOKIE_CON_TOKEN);
      formData.append("idBoletin", infBoletin.id_boletin);
      formData.append("TituloBoletin", data.TituloBoletin);
      formData.append("DescripcionBoletin", data.DescripcionBoletin);
      formData.append("RecomendadoBoletin", data.RecomendadoBoletin);
      // ESTO SOLO SE USA EN CASO DE QUE NO SE HAYA MODIFICADO LA IMAGEN
      formData.append("ImagenBoletin", infBoletin.imagen);
      formData.append("ActivoBoletin", boletinActivo ? "Si" : "No");
      formData.append("Imagen", imagenSeleccionada);
      const res = await EditarUnBoletin(formData);
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        const { status, data } = res;
        ManejarRespuestasDelServidor({ status, data });
        establecerSubvistaActual(0);
      }
    } catch (error) {
      console.error(error);
      ManejarRespuestasDelServidor();
    }
  });
  // IMAGEN DEL BOLETIN
  const ImagenBoletin = imagenSeleccionada
    ? URL.createObjectURL(imagenSeleccionada)
    : `${HOST_IMAGENES}/Boletines/${infBoletin.imagen}`;

  return {
    register,
    CampoRequerido,
    boletinActivo,
    establecerBoletinActivo,
    getRootProps,
    getInputProps,
    isDragActive,
    PeticionEditarBoletin,
    ImagenBoletin,
  };
};
