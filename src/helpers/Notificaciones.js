export const SolicitarPermisosDeNotificacion = async () => {
  // VERIFICAR SI EL NAVEGADOR SOPORTA NOTIFICACIONES
  if (!("Notification" in window)) {
    return "incompatible";
  }
  // SI LAS SOPORTA, LAS SOLICITAMOS Y RETORNAMOS EL ESTADO
  return await Notification.requestPermission();
};
export const MostrarNotificacion = ({
  Icono = "/ImmujerLogo.png",
  Titulo = "🔔 Nueva notificación",
  Detalles = "Haz clic para ver los detalles.",
  Silenciosa = false,
  RequiereInteraccion = false,
  ID = "notificacion-nueva",
  onClick = () => {},
}) => {
  const noti = new Notification(Titulo, {
    body: Detalles,
    icon: Icono,
    requireInteraction: RequiereInteraccion,
    silent: Silenciosa,
    tag: ID, // PARA EVITAR NOTIFICACIONES DUPLICADAS
  });
  noti.onclick = (e) => {
    e.preventDefault();
    onClick();
    noti.close();
  };
};
