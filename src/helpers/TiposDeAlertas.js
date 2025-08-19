import Swal from "sweetalert2";

export const AlertaDePregunta = async ({
  Titulo = "Titulo Alerta",
  Mensaje = "Mensaje Alerta",
  VerBotonCancelar = true,
  TextoBotonCancelar = "Cancelar",
  TextoBotonConfirmar = "Confirmar",
  FuncionParaRealizar = () => {},
}) => {
  const result = await Swal.fire({
    title: Titulo,
    text: Mensaje,
    imageUrl: "Imagenes/Alerta_Pregunta.png",
    imageWidth: 150,
    showCancelButton: VerBotonCancelar,
    cancelButtonText: TextoBotonCancelar,
    confirmButtonText: TextoBotonConfirmar,
    reverseButtons: true,
    customClass: {
      title: "TituloDeAlerta Azul",
      htmlContainer: "ContenidoDeAlerta",
      cancelButton: "BotonDeCancelar",
      confirmButton: "BotonDeConfirmacion Azul",
      popup: "AlertaDePregunta",
    },
  });
  if (result.isConfirmed) {
    FuncionParaRealizar();
  }
};
export const AlertaRealizandoPeticion = () => {
  return Swal.fire({
    title: "¡Petición en proceso!",
    text: "Por favor, espera a que se resuelva tu petición antes de realizar otra.",
    imageUrl: "Imagenes/Alerta_PeticionPendiente.png",
    imageWidth: 150,
    allowEscapeKey: false,
    allowOutsideClick: false,
    showConfirmButton: false,
    customClass: {
      title: "TituloDeAlerta Azul",
      htmlContainer: "ContenidoDeAlerta",
      confirmButton: "BotonDeConfirmacion Azul",
      popup: "AlertaDePregunta",
    },
  });
};
export const AlertaCampoFaltante = ({
  Titulo = "Titulo Alerta",
  Mensaje = "Mensaje Alerta",
  TextoBotonConfirmar = "Entendido",
}) => {
  return Swal.fire({
    title: Titulo,
    text: Mensaje,
    imageUrl: "Imagenes/Alerta_CampoFaltante.png",
    imageWidth: 150,
    confirmButtonText: TextoBotonConfirmar,
    customClass: {
      title: "TituloDeAlerta Rojo",
      htmlContainer: "ContenidoDeAlerta",
      confirmButton: "BotonDeConfirmacion Rojo",
      popup: "AlertaDePregunta",
    },
  });
};
export const AlertaInformativa = ({
  Titulo = "Titulo Alerta",
  Mensaje = "Mensaje Alerta",
  Imagen = "Imagenes/Alerta_Contrasena.png",
  ColorAlerta = "Azul",
}) => {
  return Swal.fire({
    title: Titulo,
    text: Mensaje,
    imageUrl: Imagen,
    imageWidth: 150,
    confirmButtonText: "Entendido",
    customClass: {
      title: `TituloDeAlerta ${ColorAlerta}`,
      htmlContainer: "ContenidoDeAlerta",
      confirmButton: `BotonDeConfirmacion ${ColorAlerta}`,
      popup: "AlertaDePregunta",
    },
  });
};
export const AlertaInformacionAgente = ({
  Texto = "Información del agente",
}) => {
  return Swal.fire({
    title: "¡Información del agente!",
    html: Texto,
    imageUrl: "Imagenes/Alerta_Agente.png",
    imageWidth: 150,
    confirmButtonText: "Entendido",
    customClass: {
      title: "TituloDeAlerta Azul",
      htmlContainer: "ContenidoDeAlerta",
      confirmButton: "BotonDeConfirmacion Azul",
      popup: "AlertaDePregunta",
    },
  });
};
