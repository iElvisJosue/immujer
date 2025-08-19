// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "sonner";

// IMPORTAMOS LOS PROVEEDORES
import AppProviders from "./AppProviders.jsx";
// IMPORTAMOS LAS RUTRAS
import { rutasPublicas, rutasParaAdministrador } from "./AppRutas.jsx";
// PROTECCIÓN DE RUTAS
import ProteccionPorCookies from "./security/ProteccionPorCookies";

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          {/* RUTAS SIN PROTECCIÓN */}
          {rutasPublicas.map((ruta) => (
            <Route key={ruta.path} {...ruta} />
          ))}
          {/* TERMINAN RUTAS SIN PROTECCIÓN */}

          {/* RUTAS PROTEGIDAS POR COOKIES */}
          <Route element={<ProteccionPorCookies />}>
            {rutasParaAdministrador.map((ruta) => (
              <Route key={ruta.path} {...ruta} />
            ))}
          </Route>
          {/* TERMINAN RUTAS PROTEGIDAS POR COOKIES */}
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
