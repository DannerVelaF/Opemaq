import React, { useState, useEffect } from "react";
import BarraSuperior from "../components/BarraSuperior";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaTruck } from "react-icons/fa";

function Almacen() {
  //* Almacena la consulta a la bd
  const [materiales, setMateriales] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);
  // Manejardor modal
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalEntregar, setOpenModalEntregar] = useState(false);

  const [nombreProducto, setNombreProducto] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mantenimientos, setMantenimientos] = useState([]);
  const [cantidad, setCantidad] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [maquinas, setMaquinas] = useState([]);
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState(
    {}
  );
  const [maquinariaSeleccionada, setMaquinariaSeleccionada] = useState("");

  useEffect(() => {
    obtenerMateriales();
    obtenerCategorias();
    obtenerMantenimientos();
  }, []);

  const obtenerMateriales = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/productos");
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
      const response = await fetch(
        "http://localhost:8080/api/categoria_producto"
      );
      if (!response.ok) {
        throw new Error("Error al obtener las categorías de la API");
      }

      const data = await response.json();
      setCategorias(data);

      // Después de obtener los datos de las categorías, establecemos categoriaSeleccionada
      if (data.length > 0) {
        setCategoriaSeleccionada(data[0].categoriaID.toString());
      }
    } catch (error) {
      setError("Error al obtener las categorías de la API: " + error.message);
    }
  };

  const obtenerMantenimientos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/mantenimientos");
      if (!response.ok) {
        throw new Error("Error al obtener los datos de los mantenimientos");
      }
      const data = await response.json();

      // Construir objetos con modelo de máquina y horómetro
      const maquinasConHorometro = data.map((mantenimiento) => ({
        maquinariaID: mantenimiento.maquinariaID,
        horometroMantenimiento: mantenimiento.horometroMantenimiento,
      }));

      // Obtener la lista de máquinas únicas
      const maquinasUnicas = Array.from(
        new Set(maquinasConHorometro.map((maquina) => maquina.maquinariaID))
      );

      // Construir objetos con el modelo de máquina y horómetro para mostrar en el select
      const maquinasConHorometroUnicas = maquinasUnicas.map((maquina) => {
        const mantenimientosMaquina = maquinasConHorometro.filter(
          (m) => m.maquinariaID === maquina
        );
        const horometroPromedio =
          mantenimientosMaquina.reduce(
            (acc, cur) => acc + cur.horometroMantenimiento,
            0
          ) / mantenimientosMaquina.length;
        return {
          maquinariaID: maquina,
          horometroPromedio: horometroPromedio.toFixed(2),
        };
      });

      setMaquinas(maquinasConHorometroUnicas);
      setMantenimientos(data);
    } catch (error) {
      setError(
        "Error al obtener los datos de los mantenimientos: " + error.message
      );
    }
  };

  const handlerOpenModalAgregar = () => {
    setOpenModalAgregar(!openModalAgregar);
    setProductoEditado(null); // Resetear el producto editado al abrir/cerrar el modal
  };

  const handlerOpenModalEditar = () => {
    setOpenModalEditar(!openModalEditar);
  };

  const handlerOpenModalEntregar = (material) => {
    setProductoSeleccionado(material);
    setMantenimientoSeleccionado(material.mantenimientoID); // Esto se mantiene igual
    setMaquinariaSeleccionada(material.maquinariaID); // Cambiamos esto para que sea el ID de la maquinaria
    setOpenModalEntregar(true);
  };

  const handlerCloseModalEntregar = () => {
    setOpenModalEntregar(false);
    setCantidad(""); // Corregir la llamada a la función setCantidad
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
        const response = await fetch(
          `http://localhost:8080/api/productos/buscar?nombre=${busqueda}`
        );
        if (!response.ok) {
          throw new Error("Error al buscar productos");
        }
        const data = await response.json();
        setMateriales(data);
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
      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreProducto,
          cantidad: parseInt(cantidad),
          categoriaID: parseInt(categoriaSeleccionada),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar material");
      }

      const data = await response.json();
      setMateriales((prevMateriales) => [...prevMateriales, data]);
      resetForm();
      obtenerMateriales();
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
      confirmButtonText: "Sí, eliminarlo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/productos/${productoID}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Error al eliminar material");
          }
          setMateriales(
            materiales.filter((material) => material.productoID !== productoID)
          );
          Swal.fire(
            "¡Eliminado!",
            "El material ha sido eliminado correctamente.",
            "success"
          );
        } catch (error) {
          Swal.fire(
            "Error",
            `Error al eliminar el material: ${error.message}`,
            "error"
          );
        }
      }
    });
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setCategoriaSeleccionada(producto.categoriaID.toString());
    setOpenModalEditar(true);
  };

  useEffect(() => {
    if (productoEditado) {
      setCategoriaSeleccionada(productoEditado.categoriaID.toString());
    } else {
      setCategoriaSeleccionada("");
    }
  }, [productoEditado]);

  const handleActualizarMaterial = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/productos/${productoEditado.productoID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productoID: productoEditado.productoID,
            nombreProducto: productoEditado.nombreProducto,
            cantidad: parseInt(productoEditado.cantidad),
            categoriaID: parseInt(productoEditado.categoriaID),
            fecha: productoEditado.fecha,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar material");
      }
      setOpenModalEditar(false);
      obtenerMateriales();
    } catch (error) {
      setError(`Error al actualizar material: ${error.message}`);
    }
  };

  const handleEntregarMaterial = async (event) => {
    event.preventDefault();
    try {
      if (!productoSeleccionado) {
        throw new Error("No se ha seleccionado un producto válido.");
      }
      if (!maquinariaSeleccionada) {
        throw new Error("No se ha seleccionado una máquina válida.");
      }
      if (
        !mantenimientos.some(
          (mantenimiento) =>
            mantenimiento.mantenimientoID === maquinariaSeleccionada
        )
      ) {
        throw new Error(
          "El mantenimiento seleccionado no está registrado en la base de datos."
        );
      }

      const registroEntrega = {
        productoID: productoSeleccionado.productoID,
        mantenimientoID: parseInt(maquinariaSeleccionada), // Convertir a entero si es necesario
        cantidad: parseFloat(cantidad),
      };

      const response = await fetch(
        "http://localhost:8080/api/materiales_mantenimiento",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registroEntrega),
        }
      );

      if (!response.ok) {
        throw new Error("Error al entregar material");
      }
      handlerCloseModalEntregar();
      obtenerMateriales();
    } catch (error) {
      setError(`Error al entregar material: ${error.message}`);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <BarraSuperior>Almacen de materiales</BarraSuperior>
      <div className="flex-1 bg-gray-100 p-6 flex justify-center  ">
        {openModalEditar && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            onClick={handlerOpenModalEditar}
          ></div>
        )}
        {openModalAgregar && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            onClick={handlerOpenModalAgregar}
          ></div>
        )}
        {openModalEntregar && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            onClick={handlerCloseModalEntregar}
          ></div>
        )}
        {openModalEditar && productoEditado && (
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
                  onChange={(e) =>
                    setProductoEditado({
                      ...productoEditado,
                      nombreProducto: e.target.value,
                    })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  required
                />

                <label htmlFor="cantidad">Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  value={productoEditado.cantidad}
                  onChange={(e) =>
                    setProductoEditado({
                      ...productoEditado,
                      cantidad: e.target.value,
                    })
                  }
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
                  <option value="" disabled>
                    -- Seleccione una categoría --
                  </option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.categoriaID}
                      value={categoria.categoriaID}
                    >
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
                <select
                  id="maquinaria"
                  value={maquinariaSeleccionada}
                  onChange={(e) => {
                    console.log("Valor seleccionado:", e.target.value); // Agregamos un console.log
                    setMaquinariaSeleccionada(e.target.value);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="" disabled>
                    -- Seleccione una máquina --
                  </option>
                  {maquinas.map(
                    (
                      mantenimiento // Cambiamos maquina por mantenimiento
                    ) => (
                      <option
                        key={mantenimiento.mantenimientoID}
                        value={mantenimiento.mantenimientoID}
                      >
                        {`${mantenimiento.maquinariaID} - Horómetro: ${mantenimiento.horometroPromedio}`}
                      </option>
                    )
                  )}
                </select>
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
              <div className="flex flex-col gap-4 ">
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
                  <option value="" disabled>
                    -- Seleccione una categoría --
                  </option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.categoriaID}
                      value={categoria.categoriaID}
                    >
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

        <div className="min-h-screen flex-1 mx-auto ">
          <div className="flex flex-1 justify-between">
            <form onSubmit={handleSubmit} className="mb-4" autoComplete="off">
              <input
                type="text"
                value={busqueda}
                onChange={handleBusquedaChange}
                placeholder="Buscar material..."
                className="px-4 py-2 border border-gray-300 rounded-md mr-2"
                required={true}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2F4A5B] text-white rounded-md h-10"
              >
                Buscar
              </button>
            </form>

            <button
              className="px-4 py-2 bg-[#2F4A5B] text-white rounded-md h-10 "
              onClick={handlerOpenModalAgregar}
            >
              Agregar Material
            </button>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
            <table className="w-[100%] border-collapse border border-gray-300 mb-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Categoria
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Cantidad</th>
                  <th className="border border-gray-300 px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((material) => (
                  <tr key={material.productoID}>
                    <td className="border border-gray-300 px-4 py-2">
                      {material.nombreProducto}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {material.categoriaID}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {material.cantidad}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 ">
                      {/* Botón de eliminar */}
                      <div className="flex flex-1 justify-around  items-center">
                        <button
                          onClick={() =>
                            eliminarMaterial(
                              material.productoID,
                              material.nombreProducto
                            )
                          }
                          className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md mr-2"
                        >
                          <FaTrash style={{ verticalAlign: "middle" }} />
                        </button>
                        {/* Botón de editar */}
                        <button
                          onClick={() => abrirModalEdicion(material)}
                          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md"
                        >
                          <FaEdit style={{ verticalAlign: "middle" }} />
                        </button>
                        {/* Botón de entregar */}
                        <button
                          onClick={() => handlerOpenModalEntregar(material)}
                          className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md ml-2"
                        >
                          <FaTruck style={{ verticalAlign: "middle" }} />
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
}

export default Almacen;
