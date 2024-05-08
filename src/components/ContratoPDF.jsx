import React from "react";
import { Page, Text, View, StyleSheet, Image, Document } from "@react-pdf/renderer";
import logo from "./../assets/Empresa-logo.webp";


const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left", // Alineado a la izquierda
    color: "#2F4A5B",
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2F4A5B",
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  clientInfo: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  invoice: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 5,
  },
  table: {
    marginBottom: 10,
    display: "table",
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    marginBottom: 5,
  },
  tableHeader: {
    width: "25%",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2F4A5B",
  },
  tableData: {
    width: "25%",
    fontSize: 14,
    textAlign: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
    color: "#2F4A5B",
  },
});

const ContratoPDF = ({ contrato }) => {
  const ruc = Math.floor(Math.random() * 10000000000);

  const costoTotal = contrato.precioHora * contrato.horasContratadas;
  const igv = costoTotal * 0.18;
  const costoTotalConIGV = costoTotal + igv;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Factura de Servicios</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.clientInfo}>
            <Text style={styles.subtitle}>Cliente (RUC):</Text>
            <Text style={styles.text}>
              {contrato.clienteID} ({ruc})
            </Text>
            <Text style={styles.subtitle}>Fechas de Contrato:</Text>
            <Text style={styles.text}>
              Desde: {new Date(contrato.fechaInicio).toLocaleDateString()} Hasta:{" "}
              {new Date(contrato.fechaFin).toLocaleDateString()}
            </Text>
            <Text style={styles.subtitle}>Descripción:</Text>
            <Text style={styles.text}>{contrato.descripcion}</Text>
          </View>
          <View style={styles.invoice}>
            <Text style={styles.subtitle}>Detalles del Contrato</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Precio por Hora</Text>
                <Text style={styles.tableHeader}>Cantidad de Horas</Text>
                <Text style={styles.tableHeader}>IGV</Text>
                <Text style={styles.tableHeader}>Monto sin IGV</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableData}>{contrato.precioHora}</Text>
                <Text style={styles.tableData}>{contrato.horasContratadas}</Text>
                <Text style={styles.tableData}>{igv.toFixed(2)}</Text>
                <Text style={styles.tableData}>{costoTotal.toFixed(2)}</Text>
              </View>
            </View>
            <Text style={styles.total}>Monto Total (con IGV): S/. {costoTotalConIGV.toFixed(2)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ContratoPDF;