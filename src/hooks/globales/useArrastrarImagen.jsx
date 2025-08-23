// LIBRERÍAS A USAR
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
// AYUDAS A USAR
import { AlertaInformativa } from "../../helpers/TiposDeAlertas";

export default function useArrastrarImagen({
  urlImagenActual = "Imagenes/Agregar_Imagen.png",
}) {
  const [imagenSeleccionada, establecerImagenSeleccionada] = useState(null);
  const [imagenPreviewURL, establecerImagenPreviewURL] = useState(null);

  // Función para crear preview con FileReader
  const crearPreviewConFileReader = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      establecerImagenPreviewURL(e.target.result); // DataURL string
    };
    reader.onerror = () => {
      console.log("Error creando preview");
      establecerImagenPreviewURL(null);
    };
    reader.readAsDataURL(file); // Cambio: usar DataURL en lugar de ArrayBuffer
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        return AlertaInformativa({
          Titulo: "¡No más de una imagen!",
          Mensaje:
            "Solo puedes subir una imagen, por favor inténtalo de nuevo.",
          Imagen: "Imagenes/Alerta_Duplicado.png",
          ColorAlerta: "Rojo",
        });
      }

      const IMAGEN = acceptedFiles[0];

      if (!IMAGEN.type.startsWith("image")) {
        return AlertaInformativa({
          Titulo: "¡Archivo no valido!",
          Mensaje:
            "Uno de los archivos no es una imagen, por favor inténtalo de nuevo.",
          Imagen: "Imagenes/Alerta_Duplicado.png",
          ColorAlerta: "Rojo",
        });
      }

      if (IMAGEN.size > 10000000) {
        return AlertaInformativa({
          Titulo: "Imagen demasiado grande!",
          Mensaje:
            "La imagen seleccionada es demasiado grande y sobre pasa el tamaño permitido (10MB), por favor inténtalo de nuevo.",
          Imagen: "Imagenes/Alerta_Duplicado.png",
          ColorAlerta: "Rojo",
        });
      }

      // SI PASA LAS VALIDACIONES, GUARDAMOS LA IMAGEN
      try {
        // Guardar la imagen inmediatamente
        establecerImagenSeleccionada(IMAGEN);

        // Crear preview con FileReader (separado de la validación)
        crearPreviewConFileReader(IMAGEN);
      } catch (error) {
        console.error("Error procesando imagen:", error);
        AlertaInformativa({
          Titulo: "¡Error!",
          Mensaje: "No se pudo procesar la imagen, inténtalo de nuevo.",
          Imagen: "Imagenes/Alerta_Duplicado.png",
          ColorAlerta: "Rojo",
        });
      }
    },
    [crearPreviewConFileReader]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 10485760, // 10MB
    maxFiles: 1,
    multiple: false,
    useFsAccessApi: false, // CRÍTICO: Evita errores en móviles
    preventDropOnDocument: true,
  });

  // Preview usando FileReader en lugar de URL.createObjectURL
  const ImagenPreview = imagenPreviewURL || urlImagenActual;

  // Función para limpiar la imagen
  const limpiarImagen = useCallback(() => {
    establecerImagenSeleccionada(null);
    establecerImagenPreviewURL(null);
  }, []);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    imagenSeleccionada,
    establecerImagenSeleccionada,
    ImagenPreview,
    limpiarImagen,
  };
}
