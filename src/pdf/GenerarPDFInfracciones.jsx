/* eslint-disable react/prop-types */
import { Page, Document, StyleSheet, View, Text } from "@react-pdf/renderer";
import { FormatearFechaALetra } from "../helpers/FuncionesGenerales";

const EstilosPDF = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#f0f0f0",
    padding: 5,
    textAlign: "center",
  },
  tableCol: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: {
    fontWeight: "bold",
    fontSize: 12,
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
  },
});
const DividirEnPaginas = (datos, FilasPorPagina) => {
  const Paginas = [];
  for (let i = 0; i < datos.length; i += FilasPorPagina) {
    Paginas.push(datos.slice(i, i + FilasPorPagina));
  }
  return Paginas;
};

export default function GenerarPDFInfracciones({ data: Infracciones }) {
  // LA PAGINA TENDRA 25 FILAS
  const FilasPorPagina = 25;
  const CantidadDePaginas = DividirEnPaginas(Infracciones, FilasPorPagina);

  return (
    <Document>
      {CantidadDePaginas.map((pagina, indexPagina) => (
        <Page
          key={indexPagina}
          size="A4"
          style={EstilosPDF.page}
          orientation="landscape"
        >
          <View style={EstilosPDF.table}>
            {/* Encabezados de la tabla (en cada página) */}
            <View style={EstilosPDF.tableRow}>
              <View style={EstilosPDF.tableColHeader}>
                <Text style={EstilosPDF.tableCellHeader}>#</Text>
              </View>
              <View style={EstilosPDF.tableColHeader}>
                <Text style={EstilosPDF.tableCellHeader}>Nombre completo</Text>
              </View>
              <View style={EstilosPDF.tableColHeader}>
                <Text style={EstilosPDF.tableCellHeader}>Fecha</Text>
              </View>
              <View style={EstilosPDF.tableColHeader}>
                <Text style={EstilosPDF.tableCellHeader}>Teléfono</Text>
              </View>
              <View style={EstilosPDF.tableColHeader}>
                <Text style={EstilosPDF.tableCellHeader}>Correo</Text>
              </View>
            </View>

            {/* Filas de la tabla para la página actual */}
            {pagina.map((infLlamada, index) => (
              <View key={index} style={EstilosPDF.tableRow}>
                <View style={EstilosPDF.tableCol}>
                  <Text style={EstilosPDF.tableCell}>
                    {infLlamada.id_llamada}
                  </Text>
                </View>
                <View style={EstilosPDF.tableCol}>
                  <Text style={EstilosPDF.tableCell}>
                    {infLlamada.nombre} {infLlamada.apellido_paterno}{" "}
                    {infLlamada.apellido_materno}
                  </Text>
                </View>
                <View style={EstilosPDF.tableCol}>
                  <Text style={EstilosPDF.tableCell}>
                    {FormatearFechaALetra(
                      infLlamada.fecha_creacion.slice(0, 10)
                    )}
                  </Text>
                </View>
                <View style={EstilosPDF.tableCol}>
                  <Text style={EstilosPDF.tableCell}>
                    {infLlamada.telefono}
                  </Text>
                </View>
                <View style={EstilosPDF.tableCol}>
                  <Text style={EstilosPDF.tableCell}>{infLlamada.correo}</Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
}
