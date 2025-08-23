// LIBRERÍAS A USAR
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
// AYUDAS A USAR
import { AlertaInformativa } from "../../helpers/TiposDeAlertas";
export default function useArrastrarImagen({
  urlImagenActual = "Imagenes/Agregar_Imagen.png",
}) {
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState(null);
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
    if (acceptedFiles[0].size > 10485760) {
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    useFsAccessApi: false,
    maxSize: 10485760,
    maxFiles: 1,
  });

  const ImagenPreview = imagenSeleccionada
    ? "Imagenes/Alerta_Exito.png"
    : urlImagenActual;

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    imagenSeleccionada,
    establecerImagenSeleccionada,
    ImagenPreview,
  };
}
