import React, { useState, useEffect } from "react";
import BarraSuperior from "../components/BarraSuperior";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaSearch, FaPlus, FaFileInvoice } from 'react-icons/fa';

const Contratos = () => {
  const [contratos, setContratos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);

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
    try {
      const contratosFiltrados = []; 
      setContratos(contratosFiltrados);
    } catch (error) {
      setError("Error al buscar contratos: " + error.message);
    }
  };

  const handlerOpenModalAgregar = () => {
    setOpenModalAgregar(!openModalAgregar);
  };

  const handlerOpenModalEditar = (contrato) => {
    setOpenModalEditar(!openModalEditar);
  };

  return (
    <div className="h-screen flex flex-col">
        <BarraSuperior>Contratos</BarraSuperior>
        <div className="flex-1 bg-gray-100 p-6">
        <div className="w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
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
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
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
                        <td className="border border-gray-300 px-4 py-2">{contrato.clienteID}</td>
                        <td className="border border-gray-300 px-4 py-2">{contrato.tipoMaquinaria}</td>
                        <td className="border border-gray-300 px-4 py-2">{contrato.maquinariaID}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(contrato.fechaInicio).toLocaleDateString()}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(contrato.fechaFin).toLocaleDateString()}</td>
                        <td className="border border-gray-300 px-4 py-2">{contrato.precioHora}</td>
                        <td className="border border-gray-300 px-4 py-2">{contrato.horasContratadas}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex justify-around">
                            <button
                              onClick={() => handlerOpenModalEditar(contrato)}
                              className="mr-2 text-blue-500 hover:text-blue-700"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleEliminarContrato(contrato.contratoID)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
                            <button
                              onClick={() => handleGenerarFactura(contrato)}
                              className="text-green-500 hover:text-green-700"
                            >
                              <FaFileInvoice />
                            </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contratos;