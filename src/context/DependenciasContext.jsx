import { createContext, useContext } from "react";

// CREAAMOS EL CONTEXTO
export const DependenciasContext = createContext();

export const useDependenciasContext = () => {
  const context = useContext(DependenciasContext);
  if (!context) {
    throw new Error(
      "useDependenciasContext debería ser usado dentro de Proveedor DEPENDENCIAS"
    );
  }
  return context;
};
