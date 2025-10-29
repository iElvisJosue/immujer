// COMPONENTES A USAR
import CardDetalles from "../components/politicas/CardDetalles";
// ESTILOS A USAR
import "../styles/views/Politicas.css";

export default function AvisoPrivacidad() {
  return (
    <main className="Politicas">
      <h1 className="Politicas__Titulo">Aviso de privacidad</h1>
      <CardDetalles
        DetallesIcono={{ SVG: "RESPONSABLE_DATOS", Clase: "SVG Principal" }}
        Titulo="1. Responsable del Tratamiento de Datos"
        Textos={[
          <>
            El Instituto Municipal de la Mujer de Acapulco, Guerrero, con
            domicilio en Calle Quebrada, S/n, Col Centro, Acapulco de Juárez,
            Guerrero, C.P. 39300, es responsable del tratamiento de los datos
            personales que nos proporcione la usuaria a través de la aplicación{" "}
            <b>{"'Botón Morado'"}</b>.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{
          SVG: "DATOS_RECABADOS",
          Box: "0 0 48 48",
          Clase: "SVG Principal",
        }}
        Titulo="2. Datos Personales Recabados"
        Textos={[
          <>Los datos que serán recabados incluyen:</>,
          <>· Nombre completo</>,
          <>· Edad</>,
          <>· Domicilio</>,
          <>· Sexo</>,
          <>· Teléfono de contacto de un familiar o contacto de emergencia.</>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{
          SVG: "OBJETIVO",
          Box: "0 0 16 16",
          Clase: "SVG Principal",
        }}
        Titulo="3. Finalidad del Tratamiento de Datos"
        Textos={[
          <>Los datos personales se utilizarán para:</>,
          <>
            · Coordinar la asistencia inmediata con la Dirección especializada
            para la atención de la Violencia Familiar y de Genero Municipal, en
            caso de activación del <b>{"'Botón Morado'"}</b>.
          </>,
          <>
            · Brindar servicios de apoyo psicológico, asesoría jurídica y
            trabajo social.
          </>,
          <>· Realizar un seguimiento posterior de los servicios prestados.</>,
          <>
            En cumplimiento con el{" "}
            <b>
              Artículo 16 de la Ley de Protección de Datos Personales en
              Posesión de Sujetos Obligados del Estado de Guerrero
            </b>
            , los datos serán tratados de forma concreta, explícita, lícita y
            legítima.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "COMPARTIR", Clase: "SVG Principal" }}
        Titulo="4. Transferencia de Datos"
        Textos={[
          <>
            Los datos personales podrán ser transferidos a las instituciones
            involucradas en la atención de la usuaria:
          </>,
          <>
            · Dirección especializada para la atención de la Violencia Familiar
            y de Genero Municipal
          </>,
          <>· Instituto Municipal de la Mujer</>,
          <>· Dirección de Comunicaciones y Sistemas</>,
          <>· Centro de Atención a Emergencias Urbanas (CENATEM)</>,
          <>
            De acuerdo con el{" "}
            <b>
              Artículo 93 de la Ley de Protección de Datos Personales en
              Posesión de Sujetos Obligados del Estado de Guerrero
            </b>
            , se informa a las usuarias que sus datos podrán ser transferidos
            solo a las instituciones competentes.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "CANDADO", Clase: "SVG Principal" }}
        Titulo="5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)"
        Textos={[
          <>
            La usuaria podrá ejercer sus derechos ARCO ante la Dirección de
            Políticas Públicas y Transparencia del Ayuntamiento de Acapulco, o a
            través de los canales de comunicación establecidos en la aplicación,
            en cumplimiento con el Artículo 92 de la Ley de Protección de Datos
            Personales en Posesión de Sujetos Obligados del Estado de Guerrero,
            la usuaria tiene derecho a acceder, rectificar, cancelar u oponerse
            al tratamiento de sus datos personales.{" "}
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "DOCUMENTO", Clase: "SVG Principal" }}
        Titulo="6. Medios de Ejercicio de Derechos ARCO"
        Textos={[
          <>
            La usuaria podrá presentar solicitudes ante el Instituto Municipal
            de la Mujer en el correo electrónico{" "}
            <a
              href="mailto:dirprevaten@acapulco.gob.mx"
              style={{
                color: "var(--ColorAzul)",
                textDecoration: "underline",
              }}
            >
              dirprevaten@acapulco.gob.mx
            </a>
            , a través del apartado de la aplicación, o bien en la Plataforma de
            la Unidad de Transparencia Municipal.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "ACTUALIZACION", Clase: "SVG Principal" }}
        Titulo="7. Modificaciones al Aviso de Privacidad"
        Textos={[
          <>
            Cualquier cambio a este Aviso de Privacidad será publicado en la
            aplicación y estará disponible en la sección correspondiente.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{
          SVG: "ATENCION",
          Box: "0 0 48 48",
          Clase: "SVG Principal",
        }}
        Titulo="8. Contacto"
        Textos={[
          <>
            Para cualquier consulta relacionada con el tratamiento de los datos
            personales, la usuaria puede contactar al Instituto Municipal de la
            Mujer a través de los canales establecidos en la aplicación.
          </>,
          <>
            De acuerdo con el{" "}
            <b>
              Artículo 94 de la Ley de Protección de Datos Personales en
              Posesión de Sujetos Obligados del Estado de Guerrero
            </b>
            , se implementan medidas de seguridad adecuadas para proteger los
            datos personales de las usuarias.
          </>,
        ]}
      />
    </main>
  );
}
