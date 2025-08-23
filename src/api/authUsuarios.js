import axios from "./axios";
import {
  // COOKIE_CON_TOKEN,
  AgregarCookiePeticion,
} from "../helpers/AgregarCookiePeticion";

export const SolicitudIniciarSesionUsuario = (data) =>
  axios.post("/web/usuarios/iniciar-sesion", data);
export const SolicitudActualizarMiInformacion = (data) =>
  axios.put(
    "/web/usuarios/actualizar-mi-informacion",
    AgregarCookiePeticion(data)
  );
export const SolicitudRegistrarNuevoUsuario = (data) =>
  axios.post("/web/usuarios/registrar-usuario", AgregarCookiePeticion(data));
export const SolicitudBuscarUsuariosPorFiltro = (data) =>
  axios.post(
    "/web/usuarios/buscar-usuarios-por-filtro",
    AgregarCookiePeticion(data)
  );
export const SolicitudEditarUnUsuario = (data) =>
  axios.put("/web/usuarios/editar-un-usuario", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
