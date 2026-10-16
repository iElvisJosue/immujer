/* eslint-disable react/prop-types */
// IMPORTAMOS LOS COMPONENTES
import Separador from "../../global/Separador";
// IMPORTAMOS LAS AYUDAS
import { TiempoRelativo } from "../../../helpers/FuncionesGenerales";
// IMPORTAMOS LOS ESTILOS
import "../../../styles/components/llamadas/Lista/ListaComentarios.css";

export default function ListaComentarios({ Comentarios }) {
  return (
    <>
      <Separador />
      <p className="DetallesLlamada__Contenido--Card Header">Observaciones</p>
      <div className="Comentarios">
        {Comentarios.map((obs) => (
          <span className="Comentarios--Comentario" key={obs.id_observacion}>
            <b>
              {`${obs.nombre} ${obs.apellido_paterno} ${obs.apellido_materno}`}
              <small>
                {TiempoRelativo({
                  Fecha: obs.fecha_creacion,
                  Hora: obs.hora_creacion,
                })}
              </small>
            </b>
            <p>{obs.observaciones}</p>
          </span>
        ))}
      </div>
    </>
  );
}
