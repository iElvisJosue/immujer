/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS A USAR
import useActualizarEstadoLlamada from "../../../hooks/llamadas/Lista/useActualizarEstadoLlamada";
// IMPORTAMOS LOS COMPONENTES A USAR
import Cargando from "../../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { ESTADOS_LLAMADA } from "../../../helpers/Constantes";
// IMPORTAMOS LOS ESTILOS
import "../../../styles/components/llamadas/Lista/ModalEstadoLlamada.css";

export default function ModalEstadoLlamada({
  idLlamada,
  idModificador,
  onCerrarModal,
  detallesLlamada,
}) {
  const {
    actualizandoEstado,
    PeticionActualizarEstadoLlamada,
    estadoSeleccionado,
    establecerEstadoSeleccionado,
  } = useActualizarEstadoLlamada({
    idLlamada,
    idModificador,
    onCerrarModal,
    detallesLlamada,
  });

  const ClaseInvalida =
    estadoSeleccionado === ESTADOS_LLAMADA.Invalida
      ? "ModalEstadoLlamada__Contenido--Opcion Invalida Seleccionada"
      : "ModalEstadoLlamada__Contenido--Opcion Invalida";

  const ClaseAtendida =
    estadoSeleccionado === ESTADOS_LLAMADA.Atendida
      ? "ModalEstadoLlamada__Contenido--Opcion Atendida Seleccionada"
      : "ModalEstadoLlamada__Contenido--Opcion Atendida";

  return (
    <div className="ModalEstadoLlamada">
      <div className="ModalEstadoLlamada__Contenido">
        {actualizandoEstado ? (
          <Cargando Texto="Actualizando estado..." />
        ) : (
          <>
            <button
              type="button"
              className="ModalEstadoLlamada__Contenido--CerrarModal"
              onClick={() => onCerrarModal()}
            >
              <ion-icon name="close"></ion-icon>
            </button>
            <span className="ModalEstadoLlamada__Contenido--ImagenTitulo">
              <img
                src="Imagenes/Estado_Llamada.png"
                alt="Imagen estado llamada"
              />
              <h1>Cambiar estado de la llamada</h1>
            </span>
            <picture
              className={ClaseInvalida}
              onClick={() =>
                establecerEstadoSeleccionado(ESTADOS_LLAMADA.Invalida)
              }
            >
              <img src="Imagenes/Ban.png" alt="Inválida" />
              <b>Inválida</b>
            </picture>
            <picture
              className={ClaseAtendida}
              onClick={() =>
                establecerEstadoSeleccionado(ESTADOS_LLAMADA.Atendida)
              }
            >
              <img src="Imagenes/Alerta_Exito.png" alt="Atendida" />
              <b>Atendida</b>
            </picture>
            {estadoSeleccionado && (
              <button
                className="ModalEstadoLlamada__Contenido--Boton"
                onClick={PeticionActualizarEstadoLlamada}
              >
                Confirmar seleccion
              </button>
            )}
            <small className="ModalEstadoLlamada__Contenido--TextoInformativo">
              Esta acción cambiará el estado de la llamada de Pendiente a un
              estado final. Una vez confirmado, no podrás revertir este cambio.
            </small>
          </>
        )}
      </div>
    </div>
  );
}
