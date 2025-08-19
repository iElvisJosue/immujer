import { createContext, useContext } from "react";

// CREAAMOS EL CONTEXTO
export const DependenciasContext = createContext();

export const useDependencias = () => {
  const context = useContext(DependenciasContext);
  if (!context) {
    throw new Error(
      "useDependencias debería ser usado dentro de Proveedor DEPENDENCIAS"
    );
  }
  return context;
};
