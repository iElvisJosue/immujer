/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// CONTEXTOS A USAR
import { useSistemaContext } from "../../context/SistemaContext";
import { useNotificacionesContext } from "../../context/NotificacionesContext";
// IMPORTAMOS LAS ALERTAS
import { AlertaRealizandoPeticion } from "../../helpers/TiposDeAlertas";
// IMPORTAMOS LAS AYUDAS
import { TiempoRelativo } from "../../helpers/FuncionesGenerales";
// IMPORTAMOS LOS ESTILOS
import "../../styles/components/global/Notificaciones.css";

export default function Notificaciones({ idUsuario }) {
  const navigate = useNavigate();
  const { establecerRecargarNotificaciones } = useSistemaContext();
  const { MarcarVista, MarcarTodasVistas, notificacionesNoVistas } =
    useNotificacionesContext();
  const [verNotificaciones, establecerVerNotificaciones] = useState(false);

  const ClaseNotificaciones = verNotificaciones
    ? "Notificaciones Activo"
    : "Notificaciones";
  const ImagenesNotificacion = {
    "llamada-nueva": "Numero_Llamada.png",
  };
  const onClickNotificacion = {
    "llamada-nueva": ({ idNotificacion, idLlamada }) =>
      AbrirNotificacionLlamada({ idNotificacion, idLlamada }),
  };
  const MarcarVistasTodasLasNotificaciones = async () => {
    AlertaRealizandoPeticion();
    const res = await MarcarTodasVistas({ idUsuario });
    if (res.exito) {
      establecerRecargarNotificaciones((prev) => prev + 1);
      establecerVerNotificaciones(false);
    }
  };
  const AbrirNotificacionLlamada = async ({ idNotificacion, idLlamada }) => {
    // LAS OCULTAMOS SIN IMPORTAR EL RESULTADO
    establecerVerNotificaciones(false);
    navigate(`/Llamadas?Vista=3&Id=${idLlamada}`);
    const res = await MarcarVista({ idNotificacion });
    if (res.exito) {
      establecerRecargarNotificaciones((prev) => prev + 1);
    }
  };

  return (
    <section className={ClaseNotificaciones}>
      {/* PREVISUALIZAMOS LAS NOTIFICACIONES */}
      <span
        className="Notificaciones__Previsualizacion"
        onClick={() => establecerVerNotificaciones(!verNotificaciones)}
      >
        <picture className="Notificaciones__Previsualizacion--Imagen">
          <img src="/Imagenes/Notificaciones.png" alt="Logo notificaciones" />
        </picture>
        <p className="Notificaciones__Previsualizacion--Titulo">
          {notificacionesNoVistas.length > 0
            ? `¡Tienes ${notificacionesNoVistas.length} notificaciones sin ver!`
            : "Sin notificaciones.. ¡Tu sí estás al día!"}
        </p>
        <p className="Notificaciones__Previsualizacion--Cantidad">
          {notificacionesNoVistas.length}
        </p>
      </span>
      {/* SOLO MOSTRAMOS LA LISTA SI TIENE NOTIFICACIONES */}
      {notificacionesNoVistas.length > 0 && (
        <>
          <ul className="Notificaciones__Lista">
            {notificacionesNoVistas.map(
              ({
                id_notificacion_web,
                id_llamada,
                tipo,
                titulo,
                fecha_creacion,
                hora_creacion,
              }) => {
                return (
                  <li
                    key={id_notificacion_web}
                    className="Notificaciones__Lista--Item"
                    onClick={() => {
                      onClickNotificacion[tipo]({
                        idNotificacion: id_notificacion_web,
                        idLlamada: id_llamada,
                      });
                    }}
                  >
                    <picture className="Notificaciones__Lista--Item--Imagen">
                      <img
                        src={`/Imagenes/${ImagenesNotificacion[tipo]}`}
                        alt="Icono notificación"
                      />
                    </picture>
                    <div className="Notificaciones__Lista--Item--Detalles">
                      <b>{titulo}</b>
                      <p>
                        {TiempoRelativo({
                          Fecha: fecha_creacion,
                          Hora: hora_creacion,
                        })}
                      </p>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
          <small
            className="Notificaciones__Marcar"
            onClick={MarcarVistasTodasLasNotificaciones}
          >
            Marcar todas como vistas
          </small>
        </>
      )}
    </section>
  );
}
