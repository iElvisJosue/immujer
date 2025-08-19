/* eslint-disable react/prop-types */
import { HOST_IMAGENES } from "../../helpers/Urls";
import { LISTA_SVGS } from "../../helpers/SVGs";
// ESTILOS A USAR
import "../../styles/components/perfil/MiInformacion.css";

export default function MiInformacion({ infUsuario }) {
  return (
    <section className="MiInformacion">
      <div className="MiInformacion__Imagen">
        <picture className="MiInformacion__Imagen--Contenedor">
          <img
            src={`${HOST_IMAGENES}/Perfil/${infUsuario.foto}`}
            alt="Foto de perfil"
          />
        </picture>
      </div>
      <div className="MiInformacion__Detalles Completo">
        <LISTA_SVGS
          SVG="NOMBRE"
          Clase="SVG Principal"
          Box="0 0 26 26"
          Tamaño="20"
        />
        <b>Nombre</b>
        <p>
          {infUsuario.nombre +
            " " +
            infUsuario.apellido_paterno +
            " " +
            infUsuario.apellido_materno || "-"}
        </p>
      </div>
      <div className="MiInformacion__Detalles">
        <LISTA_SVGS SVG="TELEFONO" Clase="SVG Principal" />
        <b>Teléfono</b>
        <p>{infUsuario.telefono || "-"}</p>
      </div>
      <div className="MiInformacion__Detalles">
        <LISTA_SVGS SVG="PERMISOS" Clase="SVG Principal" />
        <b>Permisos</b>
        <p>{infUsuario.rol || "-"}</p>
      </div>
      <div className="MiInformacion__Detalles Completo">
        <LISTA_SVGS SVG="CORREO" Clase="SVG Principal" />
        <b>Correo</b>
        <p>{infUsuario.correo || "-"}</p>
      </div>
    </section>
  );
}
