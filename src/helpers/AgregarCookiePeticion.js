import Cookies from "js-cookie";
const cookies = Cookies.get();
import { TOKEN_DE_ACCESO_SISTEMA } from "../helpers/Constantes";

export const COOKIE_CON_TOKEN = cookies[TOKEN_DE_ACCESO_SISTEMA];

export const AgregarCookiePeticion = (data = {}) => {
  return { ...data, tokenDeAcceso: COOKIE_CON_TOKEN };
};
