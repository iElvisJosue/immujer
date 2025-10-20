import { createContext, useContext } from "react";
// CREAAMOS EL CONTEXTO
export const SistemaContext = createContext();

export const useSistemaContext = () => {
  const context = useContext(SistemaContext);
  if (!context) {
    throw new Error(
      "useSistemaContext debería ser usado dentro de Proveedor SISTEMA"
    );
  }
  return context;
};
