import axios from "./axios";

// SOLICITUD PARA VERIFICAR EL TOKEN DE ACCESO DE UN USUARIO
export const SolicitudVerificarToken = (data) =>
  axios.post("web/sistema/verificar-token", data);
