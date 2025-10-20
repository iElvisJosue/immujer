// LIBRERÍAS A USAR
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// CONTEXTOS A USAR
import { useBoletinesContext } from "../../../context/BoletinesContext";
// AYUDAS A USAR
import { COOKIE_CON_TOKEN } from "../../../helpers/AgregarCookiePeticion";
import { AlertaRealizandoPeticion } from "../../../helpers/TiposDeAlertas";
import { ManejarRespuestasDelServidor } from "../../../helpers/ManejarRespuestasDelServidor";

export default function useEditarBoletin({
  infBoletin,
  imagenSeleccionada,
  establecerSubvistaActual,
}) {
  const { Editar } = useBoletinesContext();
  const [boletinActivo, establecerBoletinActivo] = useState(infBoletin.activo);
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
      const res = await Editar(formData);
      if (res.exito) establecerSubvistaActual(0);
    } catch {
      ManejarRespuestasDelServidor({});
    }
  });
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
    boletinActivo,
    establecerBoletinActivo,
    PeticionEditarBoletin,
  };
}
