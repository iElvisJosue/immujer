import { Navigate, Outlet } from "react-router-dom";
import { useSistemaContext } from "../context/SistemaContext";
import Cargando from "../components/global/Cargando";

export default function ProteccionPorCookie() {
  const { cargandoInformacion, tieneCookie } = useSistemaContext();

  if (cargandoInformacion) return <Cargando Tamaño="Completo" />;
  // SI TIENE COOKIE, MOSTRAMOS EL CONTENIDO
  if (tieneCookie) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}
