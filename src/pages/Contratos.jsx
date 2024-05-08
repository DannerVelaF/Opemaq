import React, { useState, useEffect } from "react";
import BarraSuperior from "../components/BarraSuperior";
import Swal from "sweetalert2";
import { FaSearch, FaFileInvoice } from 'react-icons/fa';
import Modal from '../components/Modal'; 
import Logo from "./../assets/Empresa-logo.webp";
import html2pdf from 'html2pdf.js';

const Contratos = () => {
  const [contratos, setContratos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);
  const [openModalFactura, setOpenModalFactura] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

  useEffect(() => {
    obtenerContratos();
  }, []);

  const obtenerToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'No se ha iniciado sesión',
        text: 'Debes iniciar sesión para acceder a esta página',
        confirmButtonColor: '#2F4A5B',
      }).then(() => {
        window.location.href = "/login";
      });
    }
    return token;
  };

  const obtenerContratos = async () => {
    try {
      const token = obtenerToken();
      const response = await fetch("http://localhost:8080/api/contratos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron obtener los contratos");
      }

      const contratosData = await response.json();
      setContratos(contratosData);
    } catch (error) {
      setError("Error al obtener los contratos: " + error.message);
    }
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleSubmitBusqueda = async (event) => {
    event.preventDefault();
    if (busqueda.trim() !== "") {
      try {
        const token = obtenerToken();
        const response = await fetch(`http://localhost:8080/api/contratos/buscar?nombre=${busqueda}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudieron obtener los contratos");
        }

        const contratosData = await response.json();
        if (contratosData.length === 0) {
          setError("No se encontraron contratos");
        } else {
          setError(null);
          setContratos(contratosData);
          setBusqueda("");
        }
      } catch (error) {
        setError("Error al obtener los contratos: " + error.message);
      }
    } else {
      setError("Ingrese un valor para buscar");
    }
  };

  const handlerOpenModalFactura = (contrato) => {
    setOpenModalFactura(true);
    setFacturaSeleccionada(contrato);
  };

  const handleDescargarFactura = () => {
    const facturaHTML = document.getElementById('factura');
    const fechaActual = new Date().toLocaleString().replace(/[\/\s:]/g, "-");
    const nombreArchivo = `Factura_${fechaActual}.pdf`;
    
    const opt = {
      margin: 1,
      filename: nombreArchivo,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().from(facturaHTML).set(opt).save();
  };
  

  return (
    <div className="h-screen flex flex-col">
      <BarraSuperior>Contratos</BarraSuperior>
      <div className="flex-1 bg-gray-100 p-6">
        <div className="w-full mx-auto">
          <div className="flex justify-start gap-4 items-center mb-4">
            <form onSubmit={handleSubmitBusqueda} className="flex">
              <input
                type="text"
                value={busqueda}
                onChange={handleBusquedaChange}
                placeholder="Buscar contrato..."
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                required={true}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2F4A5B] text-white rounded-r-md"
              >
                <FaSearch />
              </button>
            </form>
            <button 
              className="px-4 py-2 bg-[#2F4A5B] text-white rounded-md h-10 "
              onClick={obtenerContratos}
              >
                Listar
              </button>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div style={{ maxHeight: "71vh", overflowY: "auto" }}>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">ID</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Cliente</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Tipo de Maquinaria</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Maquinaria</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Inicio</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Fin</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">P/H</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Horas</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contratos.map((contrato) => (
                  <tr key={contrato.contratoID}>
                    <td className="border border-gray-300 px-4 py-2 text-justify">{contrato.clienteID}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrato.nombreCliente.split(" ", 2).join(" ")}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrato.maquinariaID}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrato.tipoMaquinaria}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(contrato.fechaInicio).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(contrato.fechaFin).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrato.precioHora}</td>
                    <td className="border border-gray-300 px-4 py-2">{contrato.horasContratadas}</td>
                    <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                      <button
                        className="px-2 py-2 bg-[#2F4A5B] text-white rounded-md flex items-center justify-center"
                        onClick={() => handlerOpenModalFactura(contrato)}
                      >
                        <FaFileInvoice className="mr-2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openModalFactura && facturaSeleccionada && (
        <Modal handlerOpenModal={handlerOpenModalFactura} titulo={"Factura de contrato"}>
          <div className="border border-[#2F4A5B] rounded-[.9rem]" id="factura">
            <div className="p-1">
              <div className="mb-2 bg-[#2F4A5B] rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <img src={Logo} alt="Logo de la Empresa" className="w-20 h-20 m-0" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">OPEMAQ Construye IERL</h2>
                    <p className="text-sm text-white">RUC: 12345678901</p>
                    <p className="text-sm text-white">Emisión: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <p className="mb-1"><b>Cliente</b>: {facturaSeleccionada.nombreCliente}</p>
                <p className="mb-1"><b>RUC</b>:  {facturaSeleccionada.clienteID}</p>
                <p className="mb-1"><b>Maquinaria</b>: {facturaSeleccionada.maquinariaID} - {facturaSeleccionada.tipoMaquinaria}</p>
                <p className="mb-1"><b>Fecha de Inicio</b>: {new Date(facturaSeleccionada.fechaInicio).toLocaleDateString()} <b>Fecha de Fin</b>: {new Date(facturaSeleccionada.fechaFin).toLocaleDateString()}</p>
                <p className="mb-1"><b>Descripción</b>: {facturaSeleccionada.descripcion}</p>
              </div>
              <div className="border border-gray-300 p-4 mb-4 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-2">Detalles de la Factura</h3>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border-b border-gray-300 px-4 py-2">Horas Contratadas</th>
                      <th className="border-b border-gray-300 px-4 py-2">Precio por Hora</th>
                      <th className="border-b border-gray-300 px-4 py-2">Subtotal</th>
                      <th className="border-b border-gray-300 px-4 py-2">IGV (18%)</th>
                      <th className="border-b border-gray-300 px-4 py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-gray-300 px-4 py-2">{facturaSeleccionada.horasContratadas}</td>
                      <td className="border-b border-gray-300 px-4 py-2">${facturaSeleccionada.precioHora.toFixed(2)}</td>
                      <td className="border-b border-gray-300 px-4 py-2">${(facturaSeleccionada.horasContratadas * facturaSeleccionada.precioHora).toFixed(2)}</td>
                      <td className="border-b border-gray-300 px-4 py-2">${(facturaSeleccionada.horasContratadas * facturaSeleccionada.precioHora * 0.18).toFixed(2)}</td>
                      <td className="border-b border-gray-300 px-4 py-2">${(facturaSeleccionada.horasContratadas * facturaSeleccionada.precioHora * 1.18).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button className="px-4 py-3 bg-[#2F4A5B] text-white rounded-md w-60 flex" onClick={() => handleDescargarFactura(facturaSeleccionada)}>
            <FaFileInvoice className="mr-2" />
            Descargar Factura
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Contratos;
