/* eslint-disable react/prop-types */
// LIBRERIAS A USAR
import { PDFDownloadLink } from "@react-pdf/renderer";
//IMPORTAMOS LOS ESTILOS A USAR
import "../../styles/components/global/GenerarPDF.css";
export default function GenerarPDF({
  Componente,
  ListaParaPDF,
  NombrePDF = "Sin_Nombre",
}) {
  return (
    <div className="GenerarPDF">
      <PDFDownloadLink
        document={<Componente data={ListaParaPDF} />}
        fileName={`${NombrePDF}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <p className="GenerarPDF__Texto">Generando PDF...</p>
          ) : (
            <button className="GenerarPDF__Boton">Descargar PDF</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}
