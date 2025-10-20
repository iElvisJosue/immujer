// IMPORTAMOS LA ALERTA INFORMATIVA
import { AlertaInformativa } from "./TiposDeAlertas";

export const ReproducirAudio = ({
  Nombre = "Notificacion_Llamada.mp3",
  Volumen = 0.5,
}) => {
  const sonido = new Audio(`/Audios/${Nombre}`);
  sonido.volume = Volumen;
  sonido.play().catch(() => {
    AlertaInformativa({
      Titulo: "Ups, silencio...",
      Mensaje:
        "El sonido no pudo reproducirse, pero las notificaciones volverán a sonar al cerrar esta ventana.",
      Imagen: "Imagenes/Alerta_Sin_Sonido.png",
    });
  });
};
