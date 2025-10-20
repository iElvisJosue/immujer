import { Navigate, Outlet } from "react-router-dom";
import { useSistemaContext } from "../context/SistemaContext";

export default function ProteccionParaPolicia() {
  const {
    infUsuario: { rol },
  } = useSistemaContext();
  const RolesPermitidos = ["Policia", "Admin"];

  // SI NO ES POLICIA Y NO ES ADMINISTRADOR
  // REDIRIGIMOS AL LOGIN (POR AHORA)
  if (RolesPermitidos.includes(rol)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}
