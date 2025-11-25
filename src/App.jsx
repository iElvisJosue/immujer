// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
// IMPORTAMOS LOS PROVEEDORES
import AppProviders from "./AppProviders.jsx";
// IMPORTAMOS LAS RUTRAS
import {
  rutasPublicas,
  rutasParaTodosLosUsuarios,
  rutasParaAdministrador,
  rutasParaPolicia,
} from "./AppRutas.jsx";
// PROTECCIÓN DE RUTAS
import ProteccionPorCookie from "./security/ProteccionPorCookie";
import ProtecccionParaPolicia from "./security/ProteccionParaPolicia";
import ProteccionParaAdministrador from "./security/ProteccionParaAdministrador";

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        {/* <BrowserRouter basename="/immujer"> */}
        <Routes>
          {/* RUTAS SIN PROTECCIÓN */}
          {rutasPublicas.map((ruta) => (
            <Route key={ruta.path} {...ruta} />
          ))}
          {/* TERMINAN RUTAS SIN PROTECCIÓN */}

          {/* RUTAS PROTEGIDAS POR COOKIES */}
          <Route element={<ProteccionPorCookie />}>
            {/* RUTAS PARA TODOS LOS USUARIOS */}
            {rutasParaTodosLosUsuarios.map((ruta) => (
              <Route key={ruta.path} {...ruta} />
            ))}
            {/* TERMINAN RUTAS PARA TODOS LOS USUARIOS */}

            {/* RUTAS PROTEGIDAS PARA POLICIAS*/}
            <Route element={<ProtecccionParaPolicia />}>
              {rutasParaPolicia.map((ruta) => (
                <Route key={ruta.path} {...ruta} />
              ))}
            </Route>
            {/* TERMINAN RUTAS PROTEGIDAS PARA POLICIAS */}

            {/* RUTAS PROTEGIDAS PARA ADMINISTRADORES*/}
            <Route element={<ProteccionParaAdministrador />}>
              {rutasParaAdministrador.map((ruta) => (
                <Route key={ruta.path} {...ruta} />
              ))}
            </Route>
            {/* TERMINAN RUTAS PROTEGIDAS POR COOKIES */}
          </Route>
          {/* TERMINAN RUTAS PROTEGIDAS POR COOKIES */}
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
