export const FormatearFecha = (Fecha) => {
  const fechaFormateada = Fecha.split("-").reverse().join("/");
  return fechaFormateada;
};

export const ObtenerFechaActual = () => {
  const now = new Date();
  const tzoffset = now.getTimezoneOffset() * 60000; // offset en milisegundos
  return new Date(now - tzoffset).toISOString().split("T")[0];
};

export const ObtenerHoraActual = () => {
  const Hoy = new Date();
  const Opciones = {
    timeZone: "America/Mexico_City",
    hour12: false, // Formato de 24 horas
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const HoraActual = Hoy.toLocaleTimeString("en-US", Opciones);
  return HoraActual;
};
export const FormatearFechaALetra = (fechaStr) => {
  const [year, month, day] = fechaStr.split("-").map(Number);
  const fecha = new Date(year, month - 1, day); // Restamos 1 al mes porque en JS los meses van de 0 a 11

  return fecha.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
