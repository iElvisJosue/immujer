import { createContext, useContext } from "react";
// CREAAMOS EL CONTEXTO
export const BoletinesContext = createContext();

export const useBoletinesContext = () => {
  const context = useContext(BoletinesContext);
  if (!context) {
    throw new Error(
      "useBoletinesContext debería ser usado dentro de Proveedor BOLETINES"
    );
  }
  return context;
};
