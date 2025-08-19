import { createContext, useContext } from "react";

// CREAAMOS EL CONTEXTO
export const LlamadasContext = createContext();

export const useLlamadas = () => {
  const context = useContext(LlamadasContext);
  if (!context) {
    throw new Error(
      "useLlamadas debería ser usado dentro de Proveedor LLAMADAS"
    );
  }
  return context;
};
