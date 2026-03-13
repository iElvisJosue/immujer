import { Navigate, Outlet } from "react-router-dom";
import { useSistemaContext } from "../context/SistemaContext";
import Cargando from "../components/global/Cargando";

export default function ProteccionPorCookie() {
  const { cargandoInformacion, tieneCookie } = useSistemaContext();

  if (cargandoInformacion) return <Cargando Tamaño="Completo" />;
  if (tieneCookie) {
    return <Outlet />;
  } else {
    return <Navigate to="/." replace />;
  }
}
