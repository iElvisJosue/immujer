import axios from "./axios";
import { AgregarCookiePeticion } from "../helpers/AgregarCookiePeticion";

export const SolicitudRegistrarNuevaDependencia = (data) =>
  axios.post("/web/dependencias/registrar-dependencia", data);
export const SolicitudBuscarDependenciasPorFiltro = (data) =>
  axios.post(
    "/web/dependencias/buscar-dependencias-por-filtro",
    AgregarCookiePeticion(data)
  );
export const SolicitudEditarUnaDependencia = (data) =>
  axios.put("/web/dependencias/editar-una-dependencia", data);
