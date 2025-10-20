/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
// CONTEXTOS A USAR
import { useSistemaContext } from "../context/SistemaContext";
// COMPONENTES A USAR
import Titulo from "../components/global/Titulo";
import Separador from "../components/global/Separador";
import Notificaciones from "../components/global/Notificaciones";
// AYUDAS A USAR
import { HOST_IMAGENES } from "../helpers/Urls";
import { LISTA_SVGS } from "../helpers/SVGs";
import { OpcionesDelMenu } from "../helpers/OpcionesDelMenu";
import { AlertaDePregunta } from "../helpers/TiposDeAlertas";
import { TOKEN_DE_ACCESO_SISTEMA } from "../helpers/Constantes";
// ESTILOS A USAR
import "../styles/components/global/Main.css";

export default function PlatillaMain({
  TituloParteUno = "Titulo Parte Uno",
  TituloParteDos = "Titulo Parte Dos",
  // 0 -> LLAMADAS
  // 1 -> DEPENDENCIAS
  // 2 -> BOLETINES
  // 3 -> USUARIOS}
  // 4 -> NOTIFICACIONES
  VistaActual = 0,
  subvistaActual = 0,
  establecerSubvistaActual,
  OpcionesDeNavegacion = [],
  TituloSubvista = "Titulo Subvista",
  children,
}) {
  const {
    infUsuario,
    obtenerInformacionNuevamente,
    establecerObtenerInformacionNuevamente,
  } = useSistemaContext();
  const navigate = useNavigate();
  const opcionesRef = useRef(null);
  const [, setSearchParams] = useSearchParams();
  const [verMenu, establecerVerMenu] = useState(false);

  useEffect(() => {
    const opciones = opcionesRef.current;
    if (!opciones) return;

    const handleWheelScroll = (event) => {
      event.preventDefault(); // Evita el scroll vertical
      opciones.scrollLeft += event.deltaY; // Convierte el movimiento vertical en horizontal
    };

    opciones.addEventListener("wheel", handleWheelScroll);

    return () => {
      opciones.removeEventListener("wheel", handleWheelScroll); // Limpieza al desmontar
    };
  }, []);
  const EliminarSesionActual = () => {
    Cookies.remove(TOKEN_DE_ACCESO_SISTEMA);
    establecerObtenerInformacionNuevamente(!obtenerInformacionNuevamente);
  };

  const ClaseMenu = verMenu ? "Main__Menu Ver" : "Main__Menu";
  return (
    <main className="Main">
      {/* SECCION DE LAS NOTIFICACIONES */}
      <Notificaciones idUsuario={infUsuario.id_usuario} />
      <aside className={ClaseMenu}>
        <picture className="Main__Menu--Imagenes">
          <img src="ImmujerLogo.png" alt="Logo Sistema" title="Logo Sistema" />
        </picture>
        <span className="Main__Menu--Opciones">
          {OpcionesDelMenu[infUsuario.rol].map(
            ({ Tooltip, Svg, BoxSvg, Url, Tamaño }, index) => (
              <button
                key={index}
                className={`Main__Menu--Opciones--Boton ${
                  index === VistaActual ? "Activo" : ""
                }`}
                data-tooltip={Tooltip}
                onClick={() => {
                  navigate(Url);
                }}
              >
                <LISTA_SVGS SVG={Svg} Box={BoxSvg} Tamaño={Tamaño} />
              </button>
            )
          )}
        </span>
        <span className="Main__Menu--Configuracion">
          <button
            className="Main__Menu--Opciones--Boton CerrarSesion"
            data-tooltip="Cerrar Sesión"
            onClick={() => {
              AlertaDePregunta({
                Titulo: "¿Desea cerrar sesión?",
                Mensaje:
                  "Siempre puedes volver a iniciar sesión en cualquier momento con tus datos de acceso.",
                TextoBotonCancelar: "No",
                TextoBotonConfirmar: "Sí, cerrar sesión",
                FuncionParaRealizar: EliminarSesionActual,
              });
            }}
          >
            <LISTA_SVGS SVG="CERRAR_SESION" />
          </button>
          <picture className="Main__Menu--Imagenes">
            <img
              src={`${HOST_IMAGENES}/Perfil/${infUsuario.foto}`}
              alt="Foto de Perfil"
              onClick={() => navigate("/Perfil")}
            />
          </picture>
        </span>
      </aside>
      <header className="Main__Header">
        <LISTA_SVGS
          SVG="MENU"
          Tamaño={50}
          Clase="SVG Principal"
          Box="-5 -7 24 24"
          FuncionParaRealizar={() => establecerVerMenu(!verMenu)}
        />
        <h1 className="Main__Header--Titulo">
          {TituloParteUno} <br /> {TituloParteDos}
        </h1>
        {OpcionesDeNavegacion.length > 0 && (
          <nav className="Main__Header--Navegacion" ref={opcionesRef}>
            {OpcionesDeNavegacion.map(({ Imagen, AltImagen, Texto }, index) => (
              <button
                type="button"
                className={`Main__Header--Navegacion--Opcion ${
                  index === subvistaActual ? "Activa" : ""
                }`}
                key={index}
                onClick={() => {
                  // LIMPIAMOS CUALQUIER PARAMETRO DE BUSQUEDA
                  setSearchParams({});
                  establecerSubvistaActual(index);
                }}
              >
                <picture className="Main__Header--Navegacion--Opcion--Icono">
                  <img src={Imagen} alt={AltImagen} />
                </picture>
                <p className="Main__Header--Navegacion--Opcion--Texto">
                  {Texto}
                </p>
              </button>
            ))}
          </nav>
        )}
        <Separador />
        <Titulo>{TituloSubvista}</Titulo>
      </header>
      <section className="Main__Contenido">{children}</section>
    </main>
  );
}
