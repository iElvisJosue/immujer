// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useBoletines } from "../../context/BoletinesContext";
import { AlertaRealizandoPeticion } from "../../helpers/TiposDeAlertas";
// AYUDAS A USAR
import { ManejarRespuestasDelServidor } from "../../helpers/ManejarRespuestasDelServidor";
import { COOKIE_CON_TOKEN } from "../../helpers/AgregarCookiePeticion";
export default function useEditarBoletin({
  infBoletin,
  imagenSeleccionada,
  establecerSubvistaActual,
}) {
  // FUNCION DE LA PETICION DE EDITAR UN BOLETIN
  const { EditarUnBoletin } = useBoletines();
  // ESTADOS A USAR
  const [boletinActivo, establecerBoletinActivo] = useState(infBoletin.activo);
  // PARA MANEJAR EL FORMULARIO Y SUS ERRORES
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      TituloBoletin: infBoletin.titulo,
      DescripcionBoletin: infBoletin.descripcion,
      RecomendadoBoletin: infBoletin.recomendado ? "Si" : "No",
    },
    criteriaMode: "all",
  });
  // CAMPO DEL MENSAJE DE ERROR
  const CampoRequerido = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
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
  };
  // FUNCION PARA EDITAR UN BOLETIN
  const PeticionEditarBoletin = handleSubmit(async (data) => {
    // MOSTRAMOS LA ALERTA DE REALIZANDO PETICIÓN
    // LA ALERTA SE CERRARA AUTOMATICAMENTE AL TERMINAR LA PETICIÓN
    AlertaRealizandoPeticion();
    try {
      // CREAMOS EL FORM DATA QUE ENVIARA LA IMAGEN
      const formData = new FormData();
      formData.append("tokenDeAcceso", COOKIE_CON_TOKEN);
      formData.append("idBoletin", infBoletin.id_boletin);
      formData.append("TituloBoletin", data.TituloBoletin);
      formData.append("DescripcionBoletin", data.DescripcionBoletin);
      formData.append("RecomendadoBoletin", data.RecomendadoBoletin);
      // ESTO SOLO SE USA EN CASO DE QUE NO SE HAYA MODIFICADO LA IMAGEN
      formData.append("ImagenBoletin", infBoletin.imagen);
      formData.append("ActivoBoletin", boletinActivo ? "Si" : "No");
      formData.append("Imagen", imagenSeleccionada);
      const res = await EditarUnBoletin(formData);
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        const { status, data } = res;
        ManejarRespuestasDelServidor({ status, data });
        establecerSubvistaActual(0);
      }
    } catch (error) {
      console.error(error);
      ManejarRespuestasDelServidor();
    }
  });

  return {
    register,
    CampoRequerido,
    boletinActivo,
    establecerBoletinActivo,
    PeticionEditarBoletin,
  };
}
