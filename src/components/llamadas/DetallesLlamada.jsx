/* eslint-disable react/prop-types */
// COMPONENTES A USAR
import Mapa from "../global/Mapa";
import Separador from "../global/Separador";
//AYUDAS A USAR
import { FormatearFechaALetra } from "../../helpers/FuncionesGenerales";
import { LISTA_SVGS } from "../../helpers/SVGs";
// ESTILOS A USAR
import "../../styles/components/llamadas/DetallesLlamada.css";
export default function DetallesLlamada({
  vieneDeVistaCompleta,
  establecerSubvistaActual,
  infLlamadaSeleccionada,
}) {
  const ManejarVistaDeRegreso = () => {
    establecerSubvistaActual(vieneDeVistaCompleta ? 0 : 1);
  };
  return (
    <div className="DetallesLlamada">
      <section className="DetallesLlamada__Contenido">
        <header className="DetallesLlamada__Contenido--Header">
          <button
            className="DetallesLlamada__Contenido--Header--Boton Regresar"
            onClick={ManejarVistaDeRegreso}
          >
            <LISTA_SVGS SVG="REGRESAR" Tamaño="24" Clase="SVG Blanco" />
          </button>
          {/* <span className="DetallesLlamada__Contenido--Header--Acciones">
            <button
              className="DetallesLlamada__Contenido--Header--Boton Imprimir"
              title="Imprimir reporte"
            >
              <LISTA_SVGS SVG="IMPRIMIR" Tamaño="30" Clase="SVG Blanco" />
            </button>
          </span> */}
        </header>
        <Separador />
        <p className="DetallesLlamada__Contenido--Card Header">Generales</p>
        <span className="DetallesLlamada__Contenido--Card ID">
          <img
            src="Imagenes/Numero_Llamada.png"
            alt="ID"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">
            Llamada número
          </p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {infLlamadaSeleccionada.id_historial_llamada}
          </p>
        </span>
        <span className="DetallesLlamada__Contenido--Card Nombre Dos">
          <img
            src="Imagenes/Usuaria.png"
            alt="Nombre"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Nombre</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {infLlamadaSeleccionada.nombre}{" "}
            {infLlamadaSeleccionada.apellido_paterno}{" "}
            {infLlamadaSeleccionada.apellido_materno}
          </p>
        </span>
        <span className="DetallesLlamada__Contenido--Card">
          <img
            src="Imagenes/Calendario.png"
            alt="Realizada"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">
            Realizada el
          </p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {FormatearFechaALetra(
              infLlamadaSeleccionada.fecha_creacion.slice(0, 10)
            )}{" "}
            a las {infLlamadaSeleccionada.hora_creacion}
          </p>
        </span>
        <span className="DetallesLlamada__Contenido--Card">
          <img
            src="Imagenes/Edad.png"
            alt="Edad"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Edad</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {infLlamadaSeleccionada.edad}
          </p>
        </span>
        <a
          className="DetallesLlamada__Contenido--Card Telefono"
          href={`tel:${infLlamadaSeleccionada.telefono}`}
        >
          <img
            src="Imagenes/Numero_Telefono.png"
            alt="Telefono"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Teléfono</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {infLlamadaSeleccionada.telefono}
          </p>
        </a>
        <a
          className="DetallesLlamada__Contenido--Card Correo Dos"
          href={`mailto:${infLlamadaSeleccionada.correo}`}
        >
          <img
            src="Imagenes/Correo.png"
            alt="Correo"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">
            Correo electrónico
          </p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {infLlamadaSeleccionada.correo}
          </p>
        </a>
        <span className="DetallesLlamada__Contenido--Card Dos">
          <img
            src="Imagenes/Direccion.png"
            alt="Direción"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Direción</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            Col. {infLlamadaSeleccionada.colonia || "No especificada"} - CP.{" "}
            {infLlamadaSeleccionada.codigo_postal || "00000"}
          </p>
        </span>
        <span className="DetallesLlamada__Contenido--Card">
          <img
            src="Imagenes/Contacto_Emergencia.png"
            alt="Contacto de emergencia"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">
            Contacto de emergencia
          </p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {infLlamadaSeleccionada.contacto_emergencia ||
              "Sin contacto de emergencia"}
          </p>
        </span>
        <a
          className="DetallesLlamada__Contenido--Card Telefono"
          href={`tel:${infLlamadaSeleccionada.telefono_emergencia}`}
        >
          <img
            src="Imagenes/Telefono_Emergencia.png"
            alt="Telefono"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">
            Teléfono del contacto
          </p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {infLlamadaSeleccionada.telefono_emergencia ||
              "Sin número de emergencia"}
          </p>
        </a>
        <Separador />
        <p className="DetallesLlamada__Contenido--Card Header">
          Ubicación de la llamada
        </p>
        <Mapa
          ubicacion={{
            lat: infLlamadaSeleccionada.latitud,
            lng: infLlamadaSeleccionada.longitud,
          }}
          center={[
            infLlamadaSeleccionada.latitud,
            infLlamadaSeleccionada.longitud,
          ]}
          zoom={20}
        />
      </section>
    </div>
  );
}
