// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useDependenciasContext } from "../../../context/DependenciasContext";
import {
  AlertaInformativa,
  AlertaRealizandoPeticion,
} from "../../../helpers/TiposDeAlertas";
// AYUDAS A USAR
import { COOKIE_CON_TOKEN } from "../../../helpers/AgregarCookiePeticion";
import { ManejarRespuestasDelServidor } from "../../../helpers/ManejarRespuestasDelServidor";

export default function useEditarDependencia({
  infDependencia,
  imagenSeleccionada,
  establecerSubvistaActual,
}) {
  const { Editar } = useDependenciasContext();
  const [ubicacion, establecerUbicacion] = useState({
    lat: infDependencia.latitud,
    lng: infDependencia.longitud,
  });
  const [dependenciaActiva, establecerDependenciaActiva] = useState(
    infDependencia.activo
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      NombreDependencia: infDependencia.nombre,
      DireccionDependencia: infDependencia.direccion,
      CPDependencia: infDependencia.codigo_postal,
      TelefonoDependencia: infDependencia.telefono,
      DescripcionDependencia: infDependencia.descripcion,
    },
    criteriaMode: "all",
  });

  // PETICION DE ACTUALIZAR UNA DEPENDENCIA
  const PeticionActualizarDependencia = handleSubmit(async (data) => {
    // SI NO SE HA SELECCIONADO UNA UBICACION, NO PERMITIMOS LA ACTUALIZACION
    if (!ValidarUbicacion()) return;
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("tokenDeAcceso", COOKIE_CON_TOKEN);
      formData.append("idDependencia", infDependencia.id_dependencia);
      formData.append("NombreDependencia", data.NombreDependencia);
      formData.append("DescripcionDependencia", data.DescripcionDependencia);
      formData.append("DireccionDependencia", data.DireccionDependencia);
      formData.append("CPDependencia", data.CPDependencia);
      formData.append("TelefonoDependencia", data.TelefonoDependencia);
      formData.append("LatitudDependencia", ubicacion.lat);
      formData.append("LongitudDependencia", ubicacion.lng);
      // CON ESTE CONTROLAREMOS SI GENERAMOS UNA NUEVA FOTO DEL MAPA
      if (ubicacion.lat !== infDependencia.latitud) {
        formData.append("CambioUbicacion", true);
      }
      // ESTE VALOR SOLO SE UTILIZA EN CASO DE NO SELECCIONAR UNA IMAGEN
      formData.append("FotoDependencia", infDependencia.foto);
      formData.append("ActivaDependencia", dependenciaActiva ? "Si" : "No");
      formData.append("Imagen", imagenSeleccionada);
      const res = await Editar(formData);
      if (res.exito) establecerSubvistaActual(0);
    } catch {
      ManejarRespuestasDelServidor({});
    }
  });
  function ValidarUbicacion() {
    if (!ubicacion) {
      AlertaInformativa({
        Titulo: "¡Sin ubicación!",
        Mensaje:
          "Debes seleccionar una ubicación en el mapa, esta nos proporcionara la ubicación exacta (Coordenadas) de la dependencia.",
        Imagen: "Imagenes/Error_Ubicacion.png",
        ColorAlerta: "Rojo",
      });
      return false;
    }
    return true;
  }
  function CampoRequerido(NombreCampo) {
    return (
      <ErrorMessage
        errors={errors}
        name={NombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="CampoRequerido">
              {message}
            </small>
          ))
        }
      />
    );
  }

  return {
    register,
    CampoRequerido,
    ubicacion,
    establecerUbicacion,
    dependenciaActiva,
    establecerDependenciaActiva,
    PeticionActualizarDependencia,
  };
}
