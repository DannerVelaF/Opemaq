import React, { useState, useEffect } from "react";
import BarraSuperior from "../components/BarraSuperior";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaTruck, FaSearch, FaPlus } from 'react-icons/fa';


const Almacen = () => {
  const [materiales, setMateriales] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);
  const [openModalAgregar, setOpenModalAgregar] = useState(false); 
  const [openModalEditar, setOpenModalEditar] = useState(false); 
  const [nombreProducto, setNombreProducto] = useState("");
  const [openModalEntregar, setOpenModalEntregar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [maquinas, setMaquinas] = useState([]); 
  const [tipoMantenimiento, setTipoMantenimiento] = useState([]);
  const [tipoMantenimientoSeleccionado, setTipoMantenimientoSeleccionado] = useState(""); 
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState(null);
  const [maquinariaSeleccionada, setMaquinariaSeleccionada] = useState(null);
  const [mantenimientos, setMantenimientos] = useState([]);
  const [horometro, setHorometro] = useState("");

  useEffect(() => {
    obtenerMateriales();
    obtenerCategorias();
    obtenerMantenimientos();
    obtenerTiposMantenimiento();
    obtenerMaquinas();
  }, []);
const obtenerToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'No se ha iniciado sesión',
      text: 'Debes iniciar sesión para acceder a esta página',
      confirmButtonColor: '#2F4A5B',
      time: 2000,
    }).then(() => {
      window.location.href = "/login";
    });
  }
  return token;
};
  

  const obtenerMateriales = async () => {
    try {
      const token = obtenerToken();
      const response = await fetch("http://localhost:8080/api/productos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
  
      const data = await response.json();
      setMateriales(data);
    } catch (error) {
      setError("Error al obtener los datos de la API: " + error.message);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const token = obtenerToken();

      const response = await fetch("http://localhost:8080/api/categoria_producto", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener las categorías de la API");
      }
  
      const data = await response.json();
      setCategorias(data);
      if (data.length > 0) {
        setCategoriaSeleccionada(data[0].categoriaID.toString());
      }
    } catch (error) {
      setError("Error al obtener las categorías de la API: " + error.message);
    }
  };
  
  const obtenerMantenimientos = async () => {
    try {
      const token = obtenerToken();
  
      const response = await fetch("http://localhost:8080/api/mantenimientos", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener los datos de los mantenimientos");
      }
  
      const data = await response.json();
      const maquinasConHorometro = data.map(mantenimiento => ({
        maquinariaID: mantenimiento.maquinariaID,
        horometroMantenimiento: mantenimiento.horometroMantenimiento
      }));
      const maquinasUnicas = Array.from(new Set(maquinasConHorometro.map(maquina => maquina.maquinariaID)));
      const maquinasConHorometroUnicas = maquinasUnicas.map(maquina => {
        const mantenimientosMaquina = maquinasConHorometro.filter(m => m.maquinariaID === maquina);
        const horometroPromedio = mantenimientosMaquina.reduce((acc, cur) => acc + cur.horometroMantenimiento, 0) / mantenimientosMaquina.length;
        return {
          maquinariaID: maquina,
          horometroPromedio: horometroPromedio.toFixed(2)
        };
      });
      setMaquinas(maquinasConHorometroUnicas);
      setMantenimientos(data);
    } catch (error) {
      setError("Error al obtener los datos de los mantenimientos: " + error.message);
    }
  };
  

  const obtenerMaquinas = async () => {
    try {
      const token = obtenerToken();

      const response = await fetch("http://localhost:8080/api/maquinas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las máquinas");
      }

      const data = await response.json();
      setMaquinas(data);
    } catch (error) {
      setError("Error al obtener las máquinas: " + error.message);
    }
  };

  const obtenerTiposMantenimiento = async () => {
    try {
      const token = obtenerToken();
  
      const response = await fetch("http://localhost:8080/api/tipo_mantenimiento", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error al obtener los tipos de mantenimiento");
      }
  
      const data = await response.json();
      setTipoMantenimiento(data);
    } catch (error) {
      setError("Error al obtener los tipos de mantenimiento: " + error.message);
    }
  };
  
  
  const handlerOpenModalAgregar = () => {
    setOpenModalAgregar(!openModalAgregar);
    setProductoEditado(null);
  };

  const handlerOpenModalEditar = (producto) => {
    setOpenModalEditar(false);
    setNombreProducto(""); 
    setCantidad(""); 
    setError(null); 
  };  

  const handlerOpenModalEntregar = (material) => {
    setProductoSeleccionado(material);
    setOpenModalEntregar(true);
  };
  
  const handlerCloseModalEntregar = () => { 
    setOpenModalEntregar(false);
    setCantidad("");
    setMantenimientoSeleccionado(""); 
};

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  }; 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busqueda.trim() !== "") {
      try {
        const token = obtenerToken();

        const response = await fetch(`http://localhost:8080/api/productos/buscar?nombre=${busqueda}`, {
          headers: {
            "Authorization": `Bearer ${token}`, // Agregar el token JWT en la cabecera Authorization
          },
        });
        if (!response.ok) {
          throw new Error("Error al buscar productos");
        }
        const data = await response.json();
        if (data.length === 0) {
          setError("No se encontraron productos con el término de búsqueda ingresado.");
        } else {
          setMateriales(data);
          setError(null);
          setBusqueda("");
        }
      } catch (error) {
        setError("Error al buscar productos: " + error.message);
      }
    } else {
      setError("Por favor ingrese un término de búsqueda");
    }
};


  const handleAgregarMaterial = async (event) => {
    event.preventDefault();
    try {
        const token = obtenerToken();

        if (nombreProducto.trim() === "" || cantidad.trim() === "" || isNaN(parseInt(cantidad)) || parseInt(cantidad) <= 0 || isNaN(parseInt(categoriaSeleccionada)) || parseInt(categoriaSeleccionada) <= 0) {
            throw new Error("Por favor complete todos los campos correctamente.");
        }

        const materialData = {
            "nombreProducto": nombreProducto,
            "cantidad": parseInt(cantidad),
            "categoriaID": parseInt(categoriaSeleccionada),
        };
        const response = await fetch("http://localhost:8080/api/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(materialData),
        });
        if (!response.ok) {
            throw new Error("Error al agregar material");
        }
        const data = await response.json();
        setMateriales((prevMateriales) => [...prevMateriales, data]);
        resetForm();
        obtenerMateriales();
        Swal.fire({
            title: "Material agregado",
            text: "El material se ha agregado correctamente.",
            icon: "success",
            confirmButtonColor: "#2F4A5B",
        });
    } catch (error) {
        setError(`Error al agregar material: ${error.message}`);
    }
};

  const resetForm = () => {
    setOpenModalAgregar(false);
    setNombreProducto("");
    setCantidad("");
    setError(null);
  };  

  const eliminarMaterial = async (productoID, nombreProducto) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar el material "${nombreProducto}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = obtenerToken();
  
          const response = await fetch(`http://localhost:8080/api/productos/${productoID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Error al eliminar material");
          }
          setMateriales(materiales.filter(material => material.productoID !== productoID));
          Swal.fire("¡Eliminado!", "El material ha sido eliminado correctamente.", "success");
        } catch (error) {
          Swal.fire("Error", `Error al eliminar el material: ${error.message}`, "error");
        }
      }
    });
  };
  

  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setCategoriaSeleccionada(producto.categoriaID.toString());
    setOpenModalEditar(true); 
  };

  const handleCloseModalEditar = async () => {
    setOpenModalEditar(false);
    setNombreProducto(""); 
    setCantidad(""); 
    setError(null); 
  };

  useEffect(() => {
    if (productoEditado) {
      setCategoriaSeleccionada(productoEditado.categoriaID.toString()); 
    } else {
      setCategoriaSeleccionada("");
    }
  }, [productoEditado]);
  
  const handleEntregarMaterial = async (event) => {
    event.preventDefault();
    try {
      if (!maquinariaSeleccionada) {
        throw new Error("Por favor selecciona una máquina.");
      }
      if (!productoSeleccionado || !tipoMantenimientoSeleccionado || !cantidad || isNaN(Number(cantidad))) {
        throw new Error("Por favor completa todos los campos correctamente.");
      }
      const tipoMantenimiento = parseInt(tipoMantenimientoSeleccionado);
      if (isNaN(tipoMantenimiento)) {
        throw new Error("El tipo de mantenimiento seleccionado no es válido.");
      }
      if (isNaN(horometro) || horometro < 0) {
        throw new Error("El valor del horómetro debe ser un número válido y mayor o igual a 0.");
      }
      if (cantidad > productoSeleccionado.stock) {
        throw new Error("No hay suficiente stock del producto.");
      }
      const registroEntrega = {
        maquinariaID: parseInt(maquinariaSeleccionada),
        horometro_mantenimiento: horometro,
        fecha_mantenimiento: new Date(),
        productoID: parseInt(productoSeleccionado.productoID),
        tipo_mantenimiento: tipoMantenimiento,
        cantidad: parseInt(cantidad),
      };
  
      const token = obtenerToken();
  
      const response = await fetch("http://localhost:8080/api/mantenimientos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(registroEntrega),
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Entrega Exitosa',
          text: 'La entrega se ha realizado con éxito.',
          confirmButtonColor: '#2F4A5B',
        });
        setError(null);
        handlerCloseModalEntregar();
        obtenerMateriales();
      } else {
        const errorMessage = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Error al entregar material',
          text: errorMessage || 'Ha ocurrido un error al intentar entregar el material.',
          confirmButtonColor: '#2F4A5B',
        });
      }
    } catch (error) {
      console.error("Error al entregar material:", error);
      setError(`Error al entregar material: ${error.message}`);
    }
  };
  
  
  const handleActualizarMaterial = async (event) => {
    event.preventDefault();
    try {
      const categoriaSeleccionadaActualizar = categoriaSeleccionada;
      if (!categoriaSeleccionadaActualizar || categoriaSeleccionadaActualizar === "") {
        throw new Error("Por favor selecciona una categoría.");
      }
      const categoriaIDActualizar = parseInt(categoriaSeleccionadaActualizar);
      if (isNaN(categoriaIDActualizar) || categoriaIDActualizar <= 0) {
        throw new Error("La categoría seleccionada no es válida.");
      }
  
      const token = obtenerToken();
  
      const response = await fetch(`http://localhost:8080/api/productos/${productoEditado.productoID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token JWT en la cabecera Authorization
        },
        body: JSON.stringify({
          productoID: productoEditado.productoID,
          nombreProducto: productoEditado.nombreProducto,
          cantidad: parseInt(productoEditado.cantidad),
          categoriaID: categoriaIDActualizar,
          fecha: productoEditado.fecha, 
        }),
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Actualización Exitosa',
          text: 'El material se ha actualizado correctamente.',
          confirmButtonColor: '#2F4A5B',
        });
        setError(null);
        setOpenModalEditar(false);
        handleCloseModalEditar();
        obtenerMateriales();
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error al actualizar material");
      }
    } catch (error) {
      console.error("Error al actualizar material:", error);
      setError(`Error al actualizar material: ${error.message}`);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar material',
        text: error.message || 'Ha ocurrido un error al intentar actualizar el material.',
        confirmButtonColor: '#2F4A5B',
      });
    }
  };
  
  
  return (
    <div className="h-screen flex flex-col">
      <BarraSuperior>Inventario de almacén</BarraSuperior>
      <div className="flex-1 bg-gray-100 p-6">
        {openModalEditar && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={handlerOpenModalEditar}></div>
        )}
        {openModalAgregar && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={handlerOpenModalAgregar}></div>
        )}
        {openModalEntregar && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40" onClick={handlerCloseModalEntregar}></div>
        )}
        {openModalEditar && productoEditado  !== undefined &&(
          <Modal
            handlerOpenModal={handlerOpenModalEditar}
            titulo={"Editar Material"}
          >
            <form onSubmit={handleActualizarMaterial}>
              <div className="flex flex-col gap-4">
                <label htmlFor="nombreProducto">Nombre del Producto:</label>
                <input
                  type="text"
                  id="nombreProducto"
                  value={productoEditado.nombreProducto}
                  onChange={(e) => setProductoEditado({ ...productoEditado, nombreProducto: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  required
                />

                <label htmlFor="cantidad">Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  value={productoEditado.cantidad}
                  onChange={(e) => setProductoEditado({ ...productoEditado, cantidad: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <label htmlFor="categoria">Categoría:</label>
                <select
                  id="categoria"
                  value={categoriaSeleccionada}  // <-- Aquí está el posible origen del error
                  onChange={handleCategoriaChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled>-- Seleccione una categoría --</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.categoriaID} value={categoria.categoriaID}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>

              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2F4A5B] text-white rounded-md w-[100%] mt-4"
              >
                Actualizar Producto
              </button>
            </form>
          </Modal>
        )}
        {openModalEntregar && (
            <Modal
                handlerOpenModal={handlerCloseModalEntregar}
                titulo={"Entregar Material"}
            >
              <form onSubmit={handleEntregarMaterial}>
                <div className="flex flex-col gap-4">
                  <label htmlFor="cantidadEntrega">Cantidad a entregar:</label>
                  <input
                      type="number"
                      id="cantidadEntrega"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                      required
                  />

                  <label htmlFor="maquinaria">Máquina:</label>
                  <select
                    id="maquinaria"
                    value={maquinariaSeleccionada}
                    onChange={(e) => setMaquinariaSeleccionada(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="" disabled>-- Seleccione una máquina --</option>
                    {maquinas.map((maquina) => (
                      <option key={maquina.maquinariaID} value={maquina.maquinariaID}>
                        {`${maquina.modelo} - ID: ${maquina.maquinariaID}`}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="tipoMantenimiento">Tipo de Mantenimiento:</label>
                  <select
                      id="tipoMantenimiento"
                      value={tipoMantenimientoSeleccionado}
                      onChange={(e) => setTipoMantenimientoSeleccionado(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                      required
                  >
                      <option value="" disabled>-- Seleccione un tipo de mantenimiento --</option>
                      {tipoMantenimiento.map((tipo) => (
                          <option key={tipo.tipoMantenimientoID} value={tipo.tipoMantenimientoID}> 
                              {tipo.nombre}
                          </option>
                      ))}
                  </select>

                  <label htmlFor="horometro">Horómetro:</label>
                  <input
                    type="number"
                    id="horometro"
                    value={horometro}
                    onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value) && value >= 0) {
                            setHorometro(value);
                        } else {
                            setHorometro("");
                        }
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    required
                />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#2F4A5B] text-white rounded-md w-[100%] mt-4"
                >
                  Entregar Material
                </button>
              </form>
            </Modal>
        )}
        {openModalAgregar && (
          <Modal
            handlerOpenModal={handlerOpenModalAgregar}
            titulo={"Agregar Material"}
          >
            <form onSubmit={handleAgregarMaterial}>
              <div className="flex flex-col gap-4">
                <label htmlFor="nombreProducto">Nombre del Producto:</label>
                <input
                  type="text"
                  id="nombreProducto"
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  required
                />

                <label htmlFor="cantidad">Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  required
                />

                <label htmlFor="categoria">Categoría:</label>
                <select
                  id="categoria"
                  value={categoriaSeleccionada}
                  onChange={handleCategoriaChange}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled>-- Seleccione una categoría --</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.categoriaID} value={categoria.categoriaID}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2F4A5B] text-white rounded-md w-[100%] mt-4"
              >
                Agregar Producto
              </button>
            </form>
          </Modal>
        )}
        <div className="w-full mx-auto">
          
          <div className="flex flex-1 justify-between">
            <div className="flex flex-1 gap-4">
              <form onSubmit={handleSubmit} className="mb-4 flex" autoComplete="off" >
                <input
                  type="text"
                  value={busqueda}
                  onChange={handleBusquedaChange}
                  placeholder="Buscar material..."
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
              onClick={obtenerMateriales}
              >
                Listar
              </button>
            </div>
            <button
              className="px-4 py-2 bg-[#2F4A5B] text-white rounded-md flex items-center h-10"
              onClick={handlerOpenModalAgregar}
            >
              <FaPlus className="mr-2" />
              Agregar Material
            </button>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
            <table className="w-[100%] border-collapse border border-gray-300 mb-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Categoria</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Cantidad</th>
                  <th className="border border-gray-300 bg-[#2F4A5B] text-white px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((material) => (
                  <tr key={material.productoID}>
                    <td className="border border-gray-300 px-4 py-2">{material.nombreProducto}</td>
                    <td className="border border-gray-300 px-4 py-2">{material.categoriaID}</td>
                    <td className="border border-gray-300 px-4 py-2">{material.cantidad}</td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      <div className="flex flex-1 justify-around  items-center">
                        <button onClick={() => eliminarMaterial(material.productoID, material.nombreProducto)} className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md mr-2 hover:bg-white hover:text-red-500">
                          <FaTrash style={{ verticalAlign: 'middle' }} />
                        </button>
                        <button onClick={() => abrirModalEdicion(material)} className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-white hover:text-blue-700">
                          <FaEdit style={{ verticalAlign: 'middle' }} />
                        </button>
                        <button onClick={() => handlerOpenModalEntregar(material)} className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md ml-2 hover:bg-white hover:text-green-900">
                          <FaTruck style={{ verticalAlign: 'middle' }} />
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

export default Almacen;