import { createContext, useContext } from "react";

// CREAAMOS EL CONTEXTO
export const BoletinesContext = createContext();

export const useBoletines = () => {
  const context = useContext(BoletinesContext);
  if (!context) {
    throw new Error(
      "useBoletines debería ser usado dentro de Proveedor BOLETINES"
    );
  }
  return context;
};
