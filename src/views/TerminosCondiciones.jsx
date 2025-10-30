// COMPONENTES A USAR
import CardDetalles from "../components/politicas/CardDetalles";
// ESTILOS A USAR
import "../styles/views/Politicas.css";

export default function TerminosCondiciones() {
  return (
    <main className="Politicas">
      <h1 className="Politicas__Titulo">Términos y condiciones</h1>
      <CardDetalles
        DetallesIcono={{ SVG: "ACEPTAR", Clase: "SVG Principal" }}
        Titulo="1. Aceptación de los Términos"
        Textos={[
          <>
            Al utilizar la aplicación <b>{"'Botón Morado'"}</b>, la usuaria
            acepta plenamente estos Términos y Condiciones.
          </>,
          <>
            El uso de la aplicación también implica la aceptación del Aviso de
            Privacidad y las políticas de seguridad.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "CELULAR", Clase: "SVG Principal" }}
        Titulo="2. Definición de la Aplicación"
        Textos={[
          <>
            La aplicación <b>{"'Botón Morado'"}</b> tiene como objetivo brindar
            protección a mujeres en situación de violencia en Acapulco,
            Guerrero. Al activar el <b>{"'Botón Morado'"}</b> , el Centro de
            Atención a Emergencias Urbanas (CENATEM) responderá con el envío de
            una patrulla de la Dirección especializada para la atención de la
            Violencia Familiar y de Genero Municipal, para el resguardo de la
            usuaria.
          </>,
          <>
            El Instituto Municipal de la Mujer, ofrecerá servicios de atención
            psicológica, asesoría jurídica y de trabajo social, siempre que lo
            requiera la usuaria.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "CUBITOS", Clase: "SVG Principal" }}
        Titulo="3. Modo de Uso de la Aplicación"
        Textos={[
          <>
            Para utilizar el <b>{"'Botón Morado'"}</b>, es imprescindible que la
            usuaria se registre previamente en la aplicación. Durante el proceso
            de registro, la usuaria deberá proporcionar datos personales tales
            como: nombre, edad, domicilio, sexo y números de contacto de
            emergencia. Esta información será utilizada exclusivamente para
            fines de seguimiento y coordinación con las autoridades competentes.
          </>,
          <>
            Una vez completado el registro, la usuaria podrá activar el{" "}
            <b>{"'Botón Morado'"}</b>. Al hacerlo, se enviará automáticamente
            una notificación al Centro de Atención a Emergencias Urbanas
            (CENATEM), iniciando asi el protocolo de resguardo de la mujer en
            coordinación con la Dirección Especializada para la Atención de la
            Violencia Familiar y de Género Municipal.
          </>,
          <>
            Es fundamental que el registro se realice de manera completa y
            correcta para asegurar la efectividad y rapidez en la respuesta ante
            cualquier emergencia.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{
          SVG: "DATOS_RECABADOS",
          Box: "0 0 48 48",
          Clase: "SVG Principal",
        }}
        Titulo="4. Recolección de Datos Personales"
        Textos={[
          <>
            Al utilizar la aplicación, se recopilarán los siguientes datos
            personales de la usuaria:
          </>,
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
        Titulo="5. Finalidad del Tratamiento de Datos Personales"
        Textos={[
          <>Los datos personales serán utilizados para:</>,
          <>· Coordinar el resguardo policial y la asistencia inmediata.</>,
          <>
            · Brindar atención psicológica, asesoría jurídica y de trabajo
            social, si así lo requiere.
          </>,
          <>· Hacer un seguimiento posterior de los servicios prestados.</>,
          <>
            En cumplimiento con el{" "}
            <b>
              Artículo 16 de la Ley de Protección de Datos Personales en
              Posesión de Sujetos Obligados del Estado de Guerrero
            </b>
            , los datos personales serán tratados de forma concreta, explícita,
            lícita y legítima con la finalidad de garantizar la protección de
            las usuarias.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "RESPONSABLE_DATOS", Clase: "SVG Principal" }}
        Titulo="6. Responsabilidad del Usuario"
        Textos={[
          <>
            El usuario es responsable de la veracidad de los datos
            proporcionados y de mantener la confidencialidad de su información.
            En caso de uso indebido o acceso no autorizado a la cuenta, la
            usuaria deberá informar a las autoridades correspondientes.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{
          SVG: "GOBIERNO",
          Box: "0 0 14 14",
          Clase: "SVG Principal",
        }}
        Titulo="7. Responsabilidad de las Instituciones"
        Textos={[
          <>
            Las instituciones involucradas, como lo es el Centro de Atención a
            Emergencias Urbanas (CENATEM), la Dirección especializada para la
            atención de la Violencia Familiar y de Genero Municipal y el
            Instituto Municipal de la Mujer, se comprometen a utilizar los datos
            de manera segura y conforme a la ley. Solo tendrán acceso a la
            información cuando la usuaria active el <b>{"'Botón Morado'"}</b>.
          </>,
          <>
            De acuerdo con el{" "}
            <b>
              Artículo 93 de la Ley de Protección de Datos Personales en
              Posesión de Sujetos Obligados del Estado de Guerrero
            </b>
            , los datos serán transferidos solo a las instituciones competentes
            y en función de la protección de la usuaria.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "BALANCE", Clase: "SVG Principal" }}
        Titulo="8. Limitación de Responsabilidad"
        Textos={[
          <>
            La aplicación no será responsable por daños indirectos, pérdidas de
            datos o demoras en los servicios. El gobierno municipal actuará
            dentro de sus competencias y conforme a los protocolos establecidos.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "ACTUALIZACION", Clase: "SVG Principal" }}
        Titulo="9. Modificaciones a los Términos y Condiciones"
        Textos={[
          <>
            El gobierno municipal se reserva el derecho de modificar estos
            Términos y Condiciones en cualquier momento, y dichas modificaciones
            serán publicadas en la aplicación.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{ SVG: "LEYES", Clase: "SVG Principal" }}
        Titulo="10. Jurisdicción y Ley Aplicable"
        Textos={[
          <>
            Estos términos se regirán por las leyes del Estado de Guerrero,
            México, y cualquier controversia será resuelta por los tribunales
            competentes de Acapulco.
          </>,
        ]}
      />
      <CardDetalles
        DetallesIcono={{
          SVG: "ATENCION",
          Box: "0 0 48 48",
          Clase: "SVG Principal",
        }}
        Titulo="11. Contacto"
        Textos={[
          <>
            Para cualquier consulta sobre los Términos y Condiciones, los
            usuarios pueden contactar al Instituto Municipal de la Mujer a
            través de los canales disponibles en la aplicación.
          </>,
        ]}
      />
    </main>
  );
}
