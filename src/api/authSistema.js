import axios from "./axios";

export const SolicitudVerificarToken = (data) =>
  axios.post("/web/sistema/verificar-token", data);
