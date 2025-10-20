// IMPORTAMOS LIBRERÍAS
import { createContext, useContext } from "react";
// CREAMOS EL CONTEXTO
export const NotificacionesContext = createContext();

export const useNotificacionesContext = () => {
  const context = useContext(NotificacionesContext);
  if (!context) {
    throw new Error(
      "useNotificacionesContext debería ser usado dentro de Proveedor NOTIFICACIONES"
    );
  }
  return context;
};
