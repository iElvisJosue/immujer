/* eslint-disable react/prop-types */
import { ProveedorSistema } from "./providers/ProveedorSistema";
import { ProveedorNotificaciones } from "./providers/ProveedorNotificaciones";
import { ProveedorUsuarios } from "./providers/ProveedorUsuarios";
import { ProveedorDependencias } from "./providers/ProveedorDependencias";
import { ProveedorBoletines } from "./providers/ProveedorBoletines";
import { ProveedorLlamadas } from "./providers/ProveedorLlamadas";

export default function AppProviders({ children }) {
  return (
    <ProveedorSistema>
      <ProveedorUsuarios>
        <ProveedorNotificaciones>
          <ProveedorDependencias>
            <ProveedorBoletines>
              <ProveedorLlamadas>{children}</ProveedorLlamadas>
            </ProveedorBoletines>
          </ProveedorDependencias>
        </ProveedorNotificaciones>
      </ProveedorUsuarios>
    </ProveedorSistema>
  );
}
