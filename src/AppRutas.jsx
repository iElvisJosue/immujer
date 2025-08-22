// IMPORTAMOS LAS VISTAS
import IniciarSesion from "./views/IniciarSesion";
import NoExistente from "./views/NoExistente";
import Llamadas from "./views/Llamadas";
import Dependencias from "./views/Dependencias";
import Boletines from "./views/Boletines";
import Usuarios from "./views/Usuarios";
import Notificaciones from "./views/Notificaciones";
import Perfil from "./views/Perfil";

export const rutasPublicas = [
  {
    path: "*",
    element: <NoExistente />,
  },
  {
    path: "/",
    element: <IniciarSesion />,
  },
];
export const rutasParaAdministrador = [
  {
    path: "/Llamadas",
    element: <Llamadas />,
  },
  {
    path: "/Dependencias",
    element: <Dependencias />,
  },
  {
    path: "/Boletines",
    element: <Boletines />,
  },
  {
    path: "/Usuarios",
    element: <Usuarios />,
  },
  {
    path: "/Notificaciones",
    element: <Notificaciones />,
  },
  {
    path: "/Perfil",
    element: <Perfil />,
  },
];
