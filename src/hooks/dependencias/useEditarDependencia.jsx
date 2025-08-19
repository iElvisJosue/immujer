// LIBRERÍAS A USAR
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useDependencias } from "../../context/DependenciasContext";
import {
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../helpers/TiposDeAlertas";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { HOST_IMAGENES } from "../../helpers/Urls";
import { COOKIE_CON_TOKEN } from "../../helpers/AgregarCookiePeticion";
export const useEditarDependencia = ({
  infDependencia,
  establecerSubvistaActual,
}) => {
  // FUNCION DE LA PETICION DE EDITAR UNA DEPENDENCIA
  const { EditarUnaDependencia } = useDependencias();
  // ESTADOS A USAR
  const [ubicacion, establecerUbicacion] = useState({
    lat: infDependencia.latitud,
    lng: infDependencia.longitud,
  });
  const [dependenciaActiva, establecerDependenciaActiva] = useState(
    infDependencia.activo
  );
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState(null);
  // PARA MANEJAR EL FORMULARIO Y SUS ERRORES
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      NombreDependencia: infDependencia.nombre,
      DireccionDependencia: infDependencia.direccion,
      CPDependencia: infDependencia.codigo_postal,
      TelefonoDependencia: infDependencia.telefono,
      DescripcionDependencia: infDependencia.descripcion,
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
  // PETICION DE ACTUALIZAR UNA DEPENDENCIA
  const PeticionActualizarDependencia = handleSubmit(async (data) => {
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
      //   CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("tokenDeAcceso", COOKIE_CON_TOKEN);
      formData.append("idDependencia", infDependencia.id_dependencia);
      formData.append("NombreDependencia", data.NombreDependencia);
      formData.append("DescripcionDependencia", data.DescripcionDependencia);
      formData.append("DireccionDependencia", data.DireccionDependencia);
      formData.append("CPDependencia", data.CPDependencia);
      formData.append("TelefonoDependencia", data.TelefonoDependencia);
      formData.append("LatitudDependencia", ubicacion.lat);
      formData.append("LongitudDependencia", ubicacion.lng);
      //  CON ESTE CONTROLAREMOS SI GENERAMOS UNA NUEVA FOTO DEL MAPA
      if (ubicacion.lat !== infDependencia.latitud) {
        formData.append("CambioUbicacion", true);
      }
      //   ESTE VALOR SOLO SE UTILIZA EN CASO DE NO SELECCIONAR UNA IMAGEN
      formData.append("FotoDependencia", infDependencia.foto);
      formData.append("ActivaDependencia", dependenciaActiva ? "Si" : "No");
      formData.append("Imagen", imagenSeleccionada);
      const res = await EditarUnaDependencia(formData);
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
  const ImagenDependencia = imagenSeleccionada
    ? URL.createObjectURL(imagenSeleccionada)
    : `${HOST_IMAGENES}/Dependencias/${infDependencia.foto}`;

  return {
    register,
    CampoRequerido,
    ubicacion,
    establecerUbicacion,
    dependenciaActiva,
    establecerDependenciaActiva,
    getRootProps,
    getInputProps,
    isDragActive,
    PeticionActualizarDependencia,
    ImagenDependencia,
  };
};
