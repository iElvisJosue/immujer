import { createContext, useContext } from "react";

// CREAAMOS EL CONTEXTO
export const LlamadasContext = createContext();

export const useLlamadasContext = () => {
  const context = useContext(LlamadasContext);
  if (!context) {
    throw new Error(
      "useLlamadasContext debería ser usado dentro de Proveedor LLAMADAS"
    );
  }
  return context;
};
