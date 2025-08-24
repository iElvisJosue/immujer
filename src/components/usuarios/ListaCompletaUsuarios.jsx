/* eslint-disable react/prop-types */
// IMPORTAMOS LOS HOOKS
import useBuscarUsuariosPorFiltro from "../../hooks/usuarios/useBuscarUsuariosPorFiltro";
// COMPONENTES A USAR
import Buscador from "../global/Buscardor";
import InformacionRegistro from "../global/InformacionRegistro";
import SinResultados from "../global/SinResultados";
import Cargando from "../global/Cargando";
// IMPORTAMOS LAS AYUDAS
import { AlertaInformativa } from "../../helpers/TiposDeAlertas";
import { HOST_IMAGENES } from "../../helpers/Urls";
import { FormatearFechaALetra } from "../../helpers/FuncionesGenerales";
// ESTILOS A USAR
import "../../styles/components/usuarios/ListaCompletaUsuarios.css";

export default function ListaCompletaUsuarios({
  idUsuario,
  establecerInfUsuarioSeleccionado,
  filtroBusqueda,
  establecerFiltroBusqueda,
  establecerSubvistaActual,
}) {
  const { listaDeUsuarios, cargandoUsuarios } = useBuscarUsuariosPorFiltro({
    idUsuario,
    filtroBusqueda,
  });

  const EstablecerUsuarioSeleccionado = (infUsuario) => {
    if (infUsuario.rol === "Admin") {
      AlertaInformativa({
        Titulo: "¡Acción no permitida!",
        Mensaje: "No se permite editar usuarios con rol de administrador.",
        Imagen: "Imagenes/Alerta_SinAcceso.png",
        ColorAlerta: "Rojo",
      });
    } else {
      establecerInfUsuarioSeleccionado(infUsuario);
      establecerSubvistaActual(2);
    }
  };

  return (
    <section className="ListaCompletaUsuarios">
      <Buscador
        TextoLabel="Buscar usuarios"
        ValorInput={filtroBusqueda}
        FiltroBusqueda={establecerFiltroBusqueda}
      />
      {cargandoUsuarios ? (
        <Cargando Texto="Cargando usuarios..." />
      ) : listaDeUsuarios.length > 0 ? (
        listaDeUsuarios.map((infUsuario) => (
          <InformacionRegistro
            key={infUsuario.id_usuario}
            Imagen={`${HOST_IMAGENES}/Perfil/${infUsuario.foto}`}
            Titulo={`${infUsuario.rol.toUpperCase()} - ${infUsuario.nombre} ${
              infUsuario.apellido_paterno
            } ${infUsuario.apellido_materno} ${
              infUsuario.id_one_signal ? "🔔" : "🔕"
            }`}
            ID={infUsuario.id_usuario}
            Descripcion={`${infUsuario.colonia}, ${infUsuario.codigo_postal}`}
            Detalles={`${
              infUsuario.app === "Web" ? "🌐 Web" : "📱 Android"
            } - ${FormatearFechaALetra(
              infUsuario.fecha_creacion.slice(0, 10)
            )} a las ${infUsuario.hora_creacion}`}
            Color={infUsuario.activo ? "" : "Rojo"}
            FuncionParaRealizar={() =>
              EstablecerUsuarioSeleccionado(infUsuario)
            }
          />
        ))
      ) : (
        <SinResultados>¡No se encontraron usuarios!</SinResultados>
      )}
    </section>
  );
}
