import axios from "./axios";

export const SolicitudVerificarToken = () =>
  axios.post("/web/sistema/verificar-token");
