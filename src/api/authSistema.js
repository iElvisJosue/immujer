import axios from "./axios";

// SOLICITUD PARA VERIFICAR EL TOKEN DE ACCESO DE UN USUARIO
export const SolicitudVerificarToken = (data) =>
  axios.post("web/sistema/verificar-token", data);
export const SolicitudEnviarNotificacion = (data) =>
  axios.post("/web/sistema/enviar-notificacion", data);
