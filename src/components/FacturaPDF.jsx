import React from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from "../assets/OpemaqLogo.jpg";

const FacturaPDF = ({ facturaSeleccionada}) => {
  const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <PDFViewer width="100%" height="100%">
      <Document>
        <Page size="A4">
          <View style={styles.section}>
            <Text>Factura de contrato</Text>
            {/* Contenido de la factura */}
            <View>
              {/* Logo de la empresa */}
              <Image src={Logo} style={{ width: 100, height: 100 }} />
              {/* Información de la empresa */}
              <Text>OPEMAQ Construye IERL</Text>
              <Text>RUC: 12345678901</Text>
              <Text>Emisión: {new Date().toLocaleDateString()}</Text>
            </View>
            <View>
              {/* Detalles de la factura */}
              <Text>Cliente: {facturaSeleccionada?.nombreCliente}</Text>
              <Text>RUC: {facturaSeleccionada?.clienteID}</Text>
              <Text>Maquinaria: {facturaSeleccionada?.maquinariaID} - {facturaSeleccionada?.tipoMaquinaria}</Text>
              <Text>Fecha de Inicio: {new Date(facturaSeleccionada?.fechaInicio).toLocaleDateString()} - Fecha de Fin: {new Date(facturaSeleccionada?.fechaFin).toLocaleDateString()}</Text>
              <Text>Descripción: {facturaSeleccionada?.descripcion}</Text>
            </View>
            <View style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Detalles de la Factura</Text>
              {/* Tabla con los detalles de la factura */}
              <View>
                <View style={{ flexDirection: "row", borderBottom: "1px solid #ccc", padding: 5 }}>
                  <Text style={{ flex: 1 }}>Horas Contratadas</Text>
                  <Text style={{ flex: 1 }}>Precio por Hora</Text>
                  <Text style={{ flex: 1 }}>Subtotal</Text>
                  <Text style={{ flex: 1 }}>IGV (18%)</Text>
                  <Text style={{ flex: 1 }}>Total</Text>
                </View>
                <View style={{ flexDirection: "row", padding: 5 }}>
                  <Text style={{ flex: 1 }}>{facturaSeleccionada?.horasContratadas}</Text>
                  <Text style={{ flex: 1 }}>${facturaSeleccionada?.precioHora?.toFixed(2)}</Text>
                  <Text style={{ flex: 1 }}>${(facturaSeleccionada?.horasContratadas * facturaSeleccionada?.precioHora)?.toFixed(2)}</Text>
                  <Text style={{ flex: 1 }}>${(facturaSeleccionada?.horasContratadas * facturaSeleccionada?.precioHora * 0.18)?.toFixed(2)}</Text>
                  <Text style={{ flex: 1 }}>${(facturaSeleccionada?.horasContratadas * facturaSeleccionada?.precioHora * 1.18)?.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default FacturaPDF;
