/* eslint-disable react/prop-types */
import { LISTA_SVGS } from "../../helpers/SVGs";

export default function CardDetalles({
  DetallesIcono = "DOCUMENTO",
  Titulo = "Titulo",
  Textos = [],
}) {
  return (
    <section className="Politicas__Card">
      <b className="Politicas__Card--Titulo">
        <LISTA_SVGS {...DetallesIcono} /> {Titulo}
      </b>
      {Textos.map((texto, index) => (
        <p className="Politicas__Card--Detalles" key={index}>
          {texto}
        </p>
      ))}
    </section>
  );
}
