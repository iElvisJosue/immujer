/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../../styles/components/global/SinResultados.css";

export default function SinResultados({ children }) {
  return (
    <section className="SinResultados">
      <img src="Imagenes/SinResultados.png" alt="Sin resultados" />
      <p>{children}</p>
    </section>
  );
}
