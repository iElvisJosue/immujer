/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
// IMPORTAMOS LAS AYUDAS
import { LISTA_SVGS } from "../../helpers/SVGs";

export default function Buscador({
  FiltroBusqueda,
  TextoLabel = "Buscar",
  ValorInput = "",
  reiniciarValores = () => {},
}) {
  const [valorDelInput, establecerValorDelInput] = useState("");

  useEffect(() => {
    establecerValorDelInput(ValorInput);
  }, [ValorInput]);

  // Creamos una versión debounced de la función de búsqueda
  const debouncedBusqueda = useCallback(
    debounce((filtroParaBuscar) => {
      // UTILIZAMOS UNA EXPRESIÓN REGULAR PARA PERMITIR LETRAS, NUMEROS Y "-" y "." PERO NO AL FINAL
      const regex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜ/#.-]*(?<!\.)$/;

      if (regex.test(filtroParaBuscar)) {
        FiltroBusqueda(filtroParaBuscar);
        reiniciarValores();
      }
    }, 300), // ESPERAMOS 300MS DESPUÉS DE QUE EL USUARIO DEJE DE ESCRIBIR
    [FiltroBusqueda]
  );

  const manejarValorDelInput = (event) => {
    const nuevoValor = event.target.value;
    establecerValorDelInput(nuevoValor);
    debouncedBusqueda(nuevoValor);
  };

  return (
    <span className="ContenedorInput Completo">
      <div className="ContenedorInput__MaterialDesign">
        <span className="ContenedorInput__MaterialDesign--Icono">
          <LISTA_SVGS SVG="BUSCAR" />
        </span>
        <input
          id="InputBuscar"
          name="InputBuscar"
          type="text"
          placeholder=" "
          className="ContenedorInput__MaterialDesign--InputText SinBorde"
          value={valorDelInput}
          onChange={manejarValorDelInput}
        />
        <label
          htmlFor="InputBuscar"
          className="ContenedorInput__MaterialDesign--Label"
        >
          {TextoLabel}
        </label>
      </div>
    </span>
  );
}
