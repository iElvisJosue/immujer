import axios from "./axios";
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

export const SolicitudBuscarLlamadasPorFiltro = (data) =>
  axios.post(
    "/web/llamadas/buscar-llamadas-por-filtro",
    AgregarCookiePeticion(data)
  );
export const SolicitudBuscarLlamadasPorFecha = (data) =>
  axios.post(
    "/web/llamadas/buscar-llamadas-por-fecha",
    AgregarCookiePeticion(data)
  );
