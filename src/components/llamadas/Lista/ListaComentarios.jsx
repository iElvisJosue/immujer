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
      <p className="DetallesLlamada__Contenido--Card Header">Comentarios</p>
      <div className="Comentarios">
        {Comentarios.map((comentario) => (
          <span
            className="Comentarios--Comentario"
            key={comentario.id_comentario}
          >
            <b>
              {`${comentario.nombre} ${comentario.apellido_paterno} ${comentario.apellido_materno}`}
              <small>
                {TiempoRelativo({
                  Fecha: comentario.fecha_creacion,
                  Hora: comentario.hora_creacion,
                })}
              </small>
            </b>
            <p>{comentario.comentario}</p>
          </span>
        ))}
      </div>
    </>
  );
}
