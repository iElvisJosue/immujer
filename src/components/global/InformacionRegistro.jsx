/* eslint-disable react/prop-types */
// IMPORTAMOS LOS ESTILOS
import "../../styles/components/global/InformacionRegistro.css";
export default function InformacionRegistro({
  Imagen = "Imagenes/Seccion.png",
  Titulo = "Titulo",
  ID = 0,
  Descripcion = "Datos importantes",
  Detalles = "Datos extras",
  Color = "",
  FuncionParaRealizar = () => {},
}) {
  return (
    <div
      className={`InformacionRegistro ${Color}`}
      onClick={FuncionParaRealizar}
      title={Descripcion}
    >
      <header className="InformacionRegistro__Header">
        <span className="InformacionRegistro__Header--ImagenTitulo">
          <picture className="InformacionRegistro__Header--ImagenTitulo--Imagen">
            <img src={Imagen} alt="ImagenRegistro" />
          </picture>
          <p>{Titulo}</p>
        </span>
        <span className="InformacionRegistro__Header--ID">
          <img src="Imagenes/ID.png" alt="" />
          <p>{ID}</p>
        </span>
      </header>
      <span>
        <p className="InformacionRegistro__Descripcion">{Descripcion}</p>
        <small className="InformacionRegistro__Detalles">{Detalles}</small>
      </span>
    </div>
  );
}
