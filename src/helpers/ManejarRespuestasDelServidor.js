import Swal from "sweetalert2";

export const ManejarRespuestasDelServidor = ({ status, data: message }) => {
  switch (status) {
    // ESTA ES PARA EXITOSO (SUCCESS)
    case 200:
      return Swal.fire({
        title: "¡Operación exitosa!",
        text: message,
        imageUrl: "Imagenes/Alerta_Exito.png",
        imageWidth: 150,
        showCancelButton: false,
        confirmButtonText: "Continuar",
        customClass: {
          title: "TituloDeAlerta Verde",
          htmlContainer: "ContenidoDeAlerta",
          confirmButton: "BotonDeConfirmacion Verde",
          popup: "AlertaDePregunta",
        },
      });
    // ESTA ES PARA ACTUALIZACION EXITOSA
    case 204:
      return Swal.fire({
        title: "¡Actualización exitosa!",
        text: "El registro se actualizo de manera exitosa.",
        imageUrl: "Imagenes/Alerta_Actualizacion.png",
        imageWidth: 150,
        showCancelButton: false,
        confirmButtonText: "Continuar",
        customClass: {
          title: "TituloDeAlerta Azul",
          htmlContainer: "ContenidoDeAlerta",
          confirmButton: "BotonDeConfirmacion Azul",
          popup: "AlertaDePregunta",
        },
      });
    // ESTA ES PARA ERROR EN CONSULTA (SQL)
    case 400:
      return Swal.fire({
        title: "¡Error en la consulta SQL!",
        text: message,
        imageUrl: "Imagenes/Alerta_ErrorSQL.png",
        imageWidth: 150,
        showCancelButton: false,
        confirmButtonText: "Entendido",
        customClass: {
          title: "TituloDeAlerta Rojo",
          htmlContainer: "ContenidoDeAlerta",
          confirmButton: "BotonDeConfirmacion Rojo",
          popup: "AlertaDePregunta",
        },
      });
    // ESTA ES PARA NO AUTORIZADO (UNAUTHORIZED)
    case 401:
      return Swal.fire({
        title: "¡No autorizado!",
        text: message,
        imageUrl: "Imagenes/Alerta_SinAcceso.png",
        imageWidth: 150,
        showCancelButton: false,
        confirmButtonText: "Entendido",
        customClass: {
          title: "TituloDeAlerta Naranja",
          htmlContainer: "ContenidoDeAlerta",
          confirmButton: "BotonDeConfirmacion Naranja",
          popup: "AlertaDePregunta",
        },
      });
    // ESTA ES PARA DATOS NO EXISTENTES (NOT FOUND)
    case 404:
      return Swal.fire({
        title: "¡Datos no encontrados!",
        text: message,
        imageUrl: "Imagenes/Alerta_NoEncontrado.png",
        imageWidth: 150,
        showCancelButton: false,
        confirmButtonText: "Intentar nuevamente",
        customClass: {
          title: "TituloDeAlerta Rojo",
          htmlContainer: "ContenidoDeAlerta",
          cancelButton: "BotonDeCancelar",
          confirmButton: "BotonDeConfirmacion Rojo",
          popup: "AlertaDePregunta",
        },
      });
    // ESTA ES PARA DATOS EXISTENTES (CONFLICT)
    case 409:
      return Swal.fire({
        title: "¡Datos duplicados!",
        text: message,
        imageUrl: "Imagenes/Alerta_Duplicado.png",
        imageWidth: 150,
        showCancelButton: false,
        confirmButtonText: "Entendido",
        customClass: {
          title: "TituloDeAlerta Azul",
          htmlContainer: "ContenidoDeAlerta",
          cancelButton: "BotonDeCancelar",
          confirmButton: "BotonDeConfirmacion Azul",
          popup: "AlertaDePregunta",
        },
      });
    // ESTA ES PARA ERROR DEL SERVIDOR (INTERNAL SERVER ERROR)
    case 500:
      return Swal.fire({
        title: "¡Error en el servidor!",
        text: message,
        imageUrl: "Imagenes/Alerta_ErrorServidor.png",
        imageWidth: 150,
        showCancelButton: false,
        confirmButtonText: "Entendido",
        customClass: {
          title: "TituloDeAlerta Rojo",
          htmlContainer: "ContenidoDeAlerta",
          cancelButton: "BotonDeCancelar",
          confirmButton: "BotonDeConfirmacion Rojo",
          popup: "AlertaDePregunta",
        },
      });
    default:
      return Swal.fire({
        title: "¡Error en el servidor!",
        text: message,
        imageUrl: "Imagenes/Alerta_ErrorServidor.png",
        imageWidth: 150,
        showCancelButton: false,
        confirmButtonText: "Intentar nuevamente",
        customClass: {
          title: "TituloDeAlerta Rojo",
          htmlContainer: "ContenidoDeAlerta",
          cancelButton: "BotonDeCancelar",
          confirmButton: "BotonDeConfirmacion Rojo",
          popup: "AlertaDePregunta",
        },
      });
  }
};
