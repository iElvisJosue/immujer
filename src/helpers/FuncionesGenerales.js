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
export const TiempoRelativo = ({ Fecha, Hora }) => {
  try {
    // OBTENEMOS SOLO LA FECHA IMPORTANTE
    // QUITAMOS A PARTIR DE LA T
    const SoloFecha = Fecha.slice(0, 10);
    // CREAMOS LA FECHA COMPLETA CON LA HORA
    const FechaCompleta = `${SoloFecha}T${Hora}`;
    const ahora = new Date();
    const objetivo = new Date(FechaCompleta);
    const diffMs = Math.abs(ahora - objetivo);

    const segundos = Math.floor(diffMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);
    const anios = Math.floor(dias / 365);

    if (anios > 0) return `${anios}a`;
    if (meses > 0) return `${meses}m`;
    if (semanas > 0) return `${semanas}s`;
    if (dias > 0) return `${dias}d`;
    if (horas > 0) return `${horas}h`;
    if (minutos > 0) return `${minutos}min`;
    return `${segundos}s`;
  } catch (e) {
    console.log(e);
    return "-";
  }
};
