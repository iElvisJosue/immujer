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
    const IMAGEN = acceptedFiles[0];
    if (!IMAGEN.type.startsWith("image")) {
      return AlertaInformativa({
        Titulo: "¡Archivo no valido!",
        Mensaje:
          "Uno de los archivos no es una imagen, por favor inténtalo de nuevo.",
        Imagen: "Imagenes/Alerta_Duplicado.png",
        ColorAlerta: "Rojo",
      });
    }
    if (IMAGEN.size > 10485760) {
      return AlertaInformativa({
        Titulo: "Imagen demasiado grande!",
        Mensaje:
          "La imagen seleccionada es demasiado grande y sobre pasa el tamaño permitido (10MB), por favor inténtalo de nuevo.",
        Imagen: "Imagenes/Alerta_Duplicado.png",
        ColorAlerta: "Rojo",
      });
    }
    // SI PASA LAS VALIDACIONES, GUARDAMOS LA IMAGEN
    try {
      const reader = new FileReader();
      reader.onload = () => {
        establecerImagenSeleccionada(IMAGEN);
      };
      reader.onerror = () => {
        AlertaInformativa({
          Titulo: "¡Error!",
          Mensaje: "No se pudo procesar la imagen, inténtalo de nuevo.",
          Imagen: "Imagenes/Alerta_Duplicado.png",
          ColorAlerta: "Rojo",
        });
        establecerImagenSeleccionada(null);
      };
      reader.readAsArrayBuffer(IMAGEN);
    } catch (error) {
      console.error("Error procesando imagen:", error);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
    useFsAccessApi: false, // CRÍTICO: Evita errores en móviles
    preventDropOnDocument: true,
  });

  const ImagenPreview = imagenSeleccionada
    ? URL.createObjectURL(imagenSeleccionada)
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
