/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS A USAR
import "../../styles/components/global/OpcionesDeSwitches.css";

export default function OpcionesDeSwitches({ Opciones }) {
  return (
    <section className="OpcionesDeSwitches">
      {Opciones.map(
        (
          {
            Titulo = "Titulo",
            Activo = false,
            FuncionDeEstablecimiento = () => {},
            ValorDeEstablecimiento,
            AlineadoDelSwitch = "",
          },
          index
        ) => (
          <div
            className={`OpcionesDeSwitches--Opcion ${AlineadoDelSwitch}`}
            key={index}
          >
            <p className="OpcionesDeSwitches--Opcion--Titulo">{Titulo}</p>
            <span
              className={`OpcionesDeSwitches--Opcion--Switch ${
                Activo ? "" : "Desactivado"
              }`}
            >
              <button
                title={ValorDeEstablecimiento ? "No" : "Si"}
                type="button"
                onClick={() =>
                  FuncionDeEstablecimiento(!ValorDeEstablecimiento)
                }
              ></button>
            </span>
          </div>
        )
      )}
    </section>
  );
}
