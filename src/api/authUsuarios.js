import axios from "./axios";
import {
  // COOKIE_CON_TOKEN,
  AgregarCookiePeticion,
} from "../helpers/AgregarCookiePeticion";

export const SolicitudIniciarSesion = (data) =>
  axios.post("/web/usuarios/iniciar-sesion", data);
export const SolicitudActualizarMiInformacion = (data) =>
  axios.put(
    "/web/usuarios/actualizar-mi-informacion",
    AgregarCookiePeticion(data)
  );
export const SolicitudRegistrar = (data) =>
  axios.post("/web/usuarios/registrar", AgregarCookiePeticion(data));
export const SolicitudBuscarPorFiltro = (data) =>
  axios.post("/web/usuarios/buscar-por-filtro", AgregarCookiePeticion(data));
export const SolicitudEditar = (data) =>
  axios.put("/web/usuarios/editar", data);
