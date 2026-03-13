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
export const rutasParaTodosLosUsuarios = [
  {
    path: "/Perfil",
    element: <Perfil />,
  },
];
export const rutasParaAdministrador = [
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
];
export const rutasParaPolicia = [
  {
    path: "/Llamadas",
    element: <Llamadas />,
  },
];
