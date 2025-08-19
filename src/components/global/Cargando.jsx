import "../../styles/components/global/Cargando.css";

// eslint-disable-next-line react/prop-types
export default function Cargando({ Tamaño = "", Texto = "Cargando..." }) {
  return (
    <section className={`Main__Cargando ${Tamaño}`}>
      <div className="Cargando"></div>
      <h1>{Texto}</h1>
    </section>
  );
}
