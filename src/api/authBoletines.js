import axios from "./axios";
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

export const SolicitudRegistrarNuevoBoletin = (data) =>
  axios.post("/web/boletines/registrar-boletin", data);
export const SolicitudBuscarBoletinesPorFiltro = (data) =>
  axios.post(
    "/web/boletines/buscar-boletines-por-filtro",
    AgregarCookiePeticion(data)
  );
export const SolicitudEditarUnBoletin = (data) =>
  axios.put("/web/boletines/editar-un-boletin", data);
