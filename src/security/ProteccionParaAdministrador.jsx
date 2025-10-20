import { Navigate, Outlet } from "react-router-dom";
import { useSistemaContext } from "../context/SistemaContext";

export default function ProteccionParaAdministrador() {
  const {
    infUsuario: { rol },
  } = useSistemaContext();
  const RolesPermitidos = ["Admin"];

  // SI NO ES ADMINISTRADOR REDIRIGIMOS
  // A LLAMADAS (PORQUE COOKIE SI TIENE)
  if (!RolesPermitidos.includes(rol)) {
    return <Navigate to="/Llamadas" replace />;
  } else {
    return <Outlet />;
  }
}
