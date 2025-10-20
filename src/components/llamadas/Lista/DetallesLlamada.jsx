/* eslint-disable react/prop-types */
// HOOKS A USAR
import useDetallesLlamada from "../../../hooks/llamadas/Lista/useDetallesLlamada";
// COMPONENTES A USAR
import Mapa from "../../global/Mapa";
import Cargando from "../../global/Cargando";
import Separador from "../../global/Separador";
import ListaComentarios from "./ListaComentarios";
import ModalEstadoLlamada from "./ModalEstadoLlamada";
import SinResultados from "../../global/SinResultados";
import ModalAgregarComentario from "./ModalAgregarComentario";
import ModalEnviarNotificacionPersonalizada from "./ModalEnviarNotificacionPersonalizada";
//AYUDAS A USAR
import { LISTA_SVGS } from "../../../helpers/SVGs";
import { ESTADOS_LLAMADA } from "../../../helpers/Constantes";
import { FormatearFechaALetra } from "../../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../../styles/components/llamadas/Lista/DetallesLlamada.css";

export default function DetallesLlamada({
  PropsVista: { vieneDeVistaCompleta, establecerSubvistaActual },
  PropsContenido: { idLlamadaSeleccionada },
  PropsUsuario: { idUsuario },
}) {
  const {
    detallesLlamada,
    cargandoDetalles,
    comentariosLlamada,
    ubicacionesLlamada,
    cargandoUbicaciones,
    cargandoComentarios,
    verModalNotificacion,
    verModalEstadoLlamada,
    ManejarVistaDeRegreso,
    verModalAgregarComentario,
    establecerRecargarComentarios,
    establecerVerModalNotificacion,
    establecerVerModalEstadoLlamada,
    establecerVerModalAgregarComentario,
  } = useDetallesLlamada({
    vieneDeVistaCompleta,
    idLlamadaSeleccionada,
    establecerSubvistaActual,
  });

  if (cargandoDetalles) return <Cargando />;

  if (!detallesLlamada)
    return <SinResultados>¡No hay nada que mostrar!</SinResultados>;

  const {
    id_creador,
    id_one_signal,
    id_llamada,
    nombre_creador,
    apellido_paterno_creador,
    apellido_materno_creador,
    fecha_creacion,
    hora_creacion,
    edad,
    telefono,
    correo,
    colonia,
    codigo_postal,
    contacto_emergencia,
    telefono_emergencia,
    fase,
  } = detallesLlamada;

  return (
    <div className="DetallesLlamada">
      {verModalAgregarComentario && (
        <ModalAgregarComentario
          idLlamada={id_llamada}
          idUsuario={idUsuario}
          onRecargar={() => {
            establecerRecargarComentarios((prev) => prev + 1);
          }}
          onCerrarModal={() => {
            establecerVerModalAgregarComentario(false);
          }}
        />
      )}
      {verModalEstadoLlamada && (
        <ModalEstadoLlamada
          idLlamada={id_llamada}
          idModificador={idUsuario}
          // PARA ACTUALIZAR EL ESTADO DE LA LLAMADA
          // EN EL LISTADO DE LLAMADAS Y ASI OCULTAR EL BOTON
          // EVITANDO RECARGAR LA PAGINA
          detallesLlamada={detallesLlamada}
          onCerrarModal={() => {
            establecerVerModalEstadoLlamada(false);
          }}
        />
      )}
      {verModalNotificacion && (
        <ModalEnviarNotificacionPersonalizada
          idCreador={idUsuario}
          idUsuarioDestino={id_creador}
          idOneSignal={id_one_signal}
          NombreCompleto={`${nombre_creador} ${apellido_paterno_creador} ${apellido_materno_creador}`}
          onCerrarModal={() => {
            establecerVerModalNotificacion(false);
          }}
        />
      )}
      <section className="DetallesLlamada__Contenido">
        <header className="DetallesLlamada__Contenido--Header">
          <button
            className="DetallesLlamada__Contenido--Header--Regresar"
            onClick={ManejarVistaDeRegreso}
          >
            <LISTA_SVGS SVG="REGRESAR" Tamaño="24" Clase="SVG Blanco" />
          </button>
          <span className="DetallesLlamada__Contenido--Header--Acciones">
            {/* BOTONES PARA AGREGAR UN COMENTARIO */}
            <button
              className="DetallesLlamada__Contenido--Header--Acciones--Boton AgregarComentario"
              title="Añadir comentario"
              onClick={() => {
                establecerVerModalAgregarComentario(true);
              }}
            >
              <LISTA_SVGS SVG="AGREGAR_COMENTARIO" Tamaño="22" Clase="SVG " />
            </button>
            {/* BOTÓN PARA CAMBIAR EL ESTADO DE LA LLAMADA */}
            {fase === ESTADOS_LLAMADA.Pendiente && (
              <button
                className="DetallesLlamada__Contenido--Header--Acciones--Boton CambiarEstado"
                title="Cambiar estado"
                onClick={() => {
                  establecerVerModalEstadoLlamada(true);
                }}
              >
                <LISTA_SVGS
                  SVG="ATENCION"
                  Tamaño="24"
                  Box="0 0 48 48"
                  Clase="SVG Blanco"
                />
              </button>
            )}
            {/* BOTONES PARA ENVIAR UNA NOTIFICACIÓN */}
            {id_one_signal && (
              <button
                className="DetallesLlamada__Contenido--Header--Acciones--Boton Notificar"
                title="Enviar notificación"
                onClick={() => {
                  establecerVerModalNotificacion(true);
                }}
              >
                <LISTA_SVGS
                  SVG="NOTIFICACIONES"
                  Tamaño="22"
                  Clase="SVG Blanco"
                />
              </button>
            )}
          </span>
        </header>
        <Separador />
        <p className="DetallesLlamada__Contenido--Card Header">Generales</p>
        {/* ID DE LA LLAMADA */}
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
            {id_llamada}
          </p>
        </span>
        {/* NOMBRE */}
        <span className="DetallesLlamada__Contenido--Card Nombre">
          <img
            src="Imagenes/Usuaria.png"
            alt="Nombre"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Nombre</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            {nombre_creador} {apellido_paterno_creador}{" "}
            {apellido_materno_creador}
          </p>
        </span>
        {/* FASE DE LA LLAMADA */}
        <span className="DetallesLlamada__Contenido--Card">
          <img
            src="Imagenes/Estado_Llamada.png"
            alt="Realizada"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Estado</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">{fase}</p>
        </span>
        {/* FECHA DE CREACIÓN */}
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
            {FormatearFechaALetra(fecha_creacion.slice(0, 10))} a las{" "}
            {hora_creacion || "00:00:00"}
          </p>
        </span>
        {/* EDAD */}
        <span className="DetallesLlamada__Contenido--Card">
          <img
            src="Imagenes/Edad.png"
            alt="Edad"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Edad</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">{edad}</p>
        </span>
        {/* TELEFONO */}
        <a
          className="DetallesLlamada__Contenido--Card Telefono"
          href={`tel:${telefono}`}
        >
          <img
            src="Imagenes/Numero_Telefono.png"
            alt="Telefono"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Teléfono</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">{telefono}</p>
        </a>
        {/* CORREO */}
        <a
          className="DetallesLlamada__Contenido--Card Correo Dos"
          href={`mailto:${correo}`}
        >
          <img
            src="Imagenes/Correo.png"
            alt="Correo"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">
            Correo electrónico
          </p>
          <p className="DetallesLlamada__Contenido--Card--Texto">{correo}</p>
        </a>
        {/* DIRECCIÓN */}
        <span className="DetallesLlamada__Contenido--Card Dos">
          <img
            src="Imagenes/Direccion.png"
            alt="Direción"
            className="DetallesLlamada__Contenido--Card--Icono"
          />
          <p className="DetallesLlamada__Contenido--Card--Titulo">Direción</p>
          <p className="DetallesLlamada__Contenido--Card--Texto">
            Col. {colonia || "No especificada"} - CP. {codigo_postal || "00000"}
          </p>
        </span>
        {/* CONTACTO DE EMERGENCIA */}
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
            {contacto_emergencia || "Sin contacto de emergencia"}
          </p>
        </span>
        {/* TELEFONO DE EMERGENCIA */}
        <a
          className="DetallesLlamada__Contenido--Card Telefono"
          href={`tel:${telefono_emergencia}`}
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
            {telefono_emergencia || "Sin número de emergencia"}
          </p>
        </a>
        <Separador />
        <p className="DetallesLlamada__Contenido--Card Header">
          Ubicación de la llamada
        </p>
        {/* UBICACION DE LA LLAMADA */}
        {cargandoUbicaciones ? (
          <Cargando Texto="Cargando..." />
        ) : (
          <Mapa
            iconoPing="Imagenes/PinLlamada.png"
            textoPin="Ubicación de la llamada:"
            ubicacion={{
              lat: ubicacionesLlamada.latitud_final,
              lng: ubicacionesLlamada.longitud_final,
            }}
            center={[
              ubicacionesLlamada.latitud_final,
              ubicacionesLlamada.longitud_final,
            ]}
          />
        )}

        {cargandoComentarios ? (
          <Cargando Texto="Cargando..." />
        ) : (
          comentariosLlamada.length > 0 && (
            <ListaComentarios Comentarios={comentariosLlamada} />
          )
        )}
      </section>
    </div>
  );
}
