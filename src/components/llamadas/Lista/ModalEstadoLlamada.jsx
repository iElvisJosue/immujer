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

  const FaseSeleccionada = (fase) => {
    if(fase === estadoSeleccionado) {
      return "ModalEstadoLlamada__Contenido--Opcion Seleccionada";
    }
    return "ModalEstadoLlamada__Contenido--Opcion";
  }

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
              className={FaseSeleccionada(ESTADOS_LLAMADA.Prueba)}
              onClick={() =>
                establecerEstadoSeleccionado(ESTADOS_LLAMADA.Prueba)
              }
            >
              <img src="Imagenes/Fase_Prueba.png" alt="Prueba" />
              <b>Prueba</b>
            </picture>
            <picture
              className={FaseSeleccionada(ESTADOS_LLAMADA.FalsaAlarma)}
              onClick={() =>
                establecerEstadoSeleccionado(ESTADOS_LLAMADA.FalsaAlarma)
              }
            >
              <img src="Imagenes/Fase_FalsaAlarma.png" alt="Falsa alarma" />
              <b>Falsa alarma</b>
            </picture>
            <picture
              className={FaseSeleccionada(ESTADOS_LLAMADA.Derivada)}
              onClick={() =>
                establecerEstadoSeleccionado(ESTADOS_LLAMADA.Derivada)
              }
            >
              <img src="Imagenes/Fase_Derivada.png" alt="Derivada a" />
              <b>Derivada a</b>
            </picture>
            <picture
              className={FaseSeleccionada(ESTADOS_LLAMADA.Cerrada)}
              onClick={() =>
                establecerEstadoSeleccionado(ESTADOS_LLAMADA.Cerrada)
              }
            >
              <img src="Imagenes/Alerta_Exito.png" alt="Cerrada" />
              <b>Cerrada</b>
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
