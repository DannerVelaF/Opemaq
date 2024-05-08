import React, { useContext, useEffect, useState } from "react";
import BarraSuperior from "../components/BarraSuperior";
import MaquinaIMG from "../assets/maquinaria.jpg";
import Modal from "../components/Modal";
import { MaquinaContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Maquinaria() {
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useContext(MaquinaContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [operadores, setOperadores] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [maquinasActivas, setMaquinasActivas] = useState([]);
  const [mostrarActivas, setMostrarActivas] = useState(false);
  const [orden, setOrden] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0].name,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleChangeOrden = (e) => {
    setOrden(e.target.value);
  };

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

  const handleAlquilar = (maquinaData) => {
    console.log("Datos de la máquina seleccionada:", maquinaData)
    setMaquinaSeleccionada(maquinaData);
    navigate("/inicio/registrar");
  };

  const handlerOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleRegistrar = async (e) => {
    e.preventDefault();
    const valuesArray = Object.values(formValues);
    if (valuesArray.some((value) => value === "")) {
      console.log("Por favor completa todos los campos antes de enviar.");
      return;
    }

    const registroMaquinaria = {
      maquinariaID: formValues.maquinaID,
      tipoMaquinariaID: parseInt(formValues.tipoMaquinariaID),
      marcaID: parseInt(formValues.marcaID),
      modelo: formValues.modelo,
      imagen: formValues.imagen,
      cantidadAceite: parseFloat(formValues.cantidad_aceite),
      trabajadorID: parseInt(formValues.trabajadorID),
    };

    const token = obtenerToken();

    try {
      const response = await fetch("http://localhost:8080/api/maquinas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(registroMaquinaria),
      });
      const responseText = await response.text();
      console.log("Respuesta del servidor:", responseText);
      if(response.ok){
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Se registro el nuevo equipo.',
          confirmButtonColor: '#2F4A5B',
        });

        setFormValues({});
        ObtenerMaquinas();
        handlerOpenModal();
      }else {
        const error = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el nuevo equipo',
          text: error || 'Ha ocurrido un error al registrar el nuevo equipo',
          confirmButtonColor: '#2F4A5B',
        });
      }
    } catch (error) {
      console.log("Error al registrar el nuevo equipo:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el nuevo equipo',
        text: error || 'Ha ocurrido un error al registrar el nuevo equipo',
        confirmButtonColor: '#2F4A5B',
      });
    }

  };


  const vin = {
    type: "text",
    name: "maquinaID",
    placeholder: "Identificador de la maquina",
    autoComplete: "off",
    require: "true",
    onChange: handleChange,
    value: formValues.maquinaID || "",
  };

  const modelo_maquina = {
    type: "text",
    name: "modelo",
    placeholder: "Tipo de maquina",
    autoComplete: "off",
    require: "true",
    onChange: handleChange,
    value: formValues.modelo || "",
  };
  const horas_uso = {
    type: "number",
    name: "horas_uso",
    placeholder: "Tipo de maquina",
    autoComplete: "off",
    require: "true",
    onChange: handleChange,
    value: formValues.horas_uso || "",
  };

  const imagen = {
    type: "file",
    name: "imagen",
    placeholder: "Ingresa imagen",
    autoComplete: "off",
    id: "imagen",
    require: "true",
    onChange: handleChange,
  };

  const cant_aceite = {
    type: "number",
    name: "cantidad_aceite",
    placeholder: "Ingresa la cantidad de aceite",
    autoComplete: "off",
    require: "true",
    onChange: handleChange,
    value: formValues.cantidad_aceite || "",
  };

  const ObtenerMarcas = async () => {
    try {
      const token = obtenerToken();
      const response = await fetch("http://localhost:8080/api/marca_maquinas", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos de las marcas");
      }
      const data = await response.json();
      setMarcas(data);
    } catch (error) {
      setError("Error al obtener la marca");
    }
  };

  const ObtenerTipos = async () => {
    try {
      const token = obtenerToken();

      const response = await fetch("http://localhost:8080/api/tipomaquinaria", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al obtener los tipos de maquinaria");
      }
      const data = await response.json();
      setTipos(data);
    } catch (error) {
      setError("Error al obtener los tipos de maquinaria");
    }
  };
  
  const ObtenerOperadores = async () => {
    try {
      const token = obtenerToken();

      const response = await fetch("http://localhost:8080/api/operadores", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al obtener los operadores");
      }

      const data = await response.json();
      setOperadores(data);
    } catch (error) {
      setError("Error al obtener operadores");
    }
  };


  const ObtenerMaquinas = async () => {
    try {
      const token = obtenerToken();

      const response = await fetch("http://localhost:8080/api/maquinas", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al obtener las máquinas");
      }

      const data = await response.json();
      setMaquinas(data);
    } catch (error) {
      setError("Error al obtener máquinas");
    }
  };


  useEffect(() => {
    ObtenerOperadores();
    ObtenerMarcas();
    ObtenerTipos();
    ObtenerMaquinas();
  }, []);


  const filtrarActivas = () => {
    const activas = maquinas.filter((maquina) => maquina.estado  === true);
    setMaquinasActivas(activas);
  };


  const toggleMostrarActivas = () => {
    setMostrarActivas(!mostrarActivas);
    if (!mostrarActivas) {
      filtrarActivas();
    } else {
      ObtenerMaquinas();
    }
  };

  const ordenarMaquinarias = (maquinarias) => {
    if (orden === "tipoMaquinaria") {
      return maquinarias.sort((a, b) => a.tipoMaquinaria.localeCompare(b.tipoMaquinaria));
    } else if (orden === "marca") {
      return maquinarias.sort((a, b) => a.marca.localeCompare(b.marca));
    } else {
      return maquinarias;
    }
  };


  return (
    <div className="h-screen flex flex-col">
      <BarraSuperior>Catálogo de Maquinaria</BarraSuperior>
      <div className="flex-1 flex justify-center items-center relative">
        {openModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
        )}
        {openModal && (
          <Modal
            handlerOpenModal={handlerOpenModal}
            titulo={"Registrar Maquinaria"}
            handleChange={handleChange}
          >
            <form
              action="
            "
            >
              <div className="flex gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
                    <label>Identificador</label>
                    <input
                      {...vin}
                      className="border-2 border-[#CCC6C6] py-3 ps-3 w-[327px] text-lg"
                    />
                  </div>
                  <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
                    <label>Tipo</label>
                    <select
                      name="tipoMaquinariaID"
                      value={formValues.tipoMaquinariaID || ""}
                      onChange={handleChange}
                      className="text-lg border-2 border-[#CCC6C6] py-3 ps-3 w-[327px]"
                    >
                      <option value="">Seleccionar el tipo de maquina</option>
                      {tipos.map((tipo) => (
                        <option
                          key={tipo.tipoMaquinariaID}
                          value={tipo.tipoMaquinariaID}
                        >
                          {tipo.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
                    <label>Marca</label>
                    <select
                      name="marcaID"
                      value={formValues.marcaID || ""}
                      onChange={handleChange}
                      className="text-lg border-2 border-[#CCC6C6] py-3 ps-3 w-[327px]"
                    >
                      <option value="">Seleccionar una marca</option>

                      {marcas.map((marca) => (
                        <option value={marca.marcaID} key={marca.marcaID}>
                          {marca.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
                    <label>Modelo</label>
                    <input
                      {...modelo_maquina}
                      className="border-2 border-[#CCC6C6] py-3 ps-3 w-[327px] text-lg"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
                    <label>Horas de uso</label>
                    <input
                      {...horas_uso}
                      className="border-2 border-[#CCC6C6] py-3 ps-3 w-[327px] text-lg"
                    />
                  </div>
                  <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
                    <label>Cantidad Aceite</label>
                    <input
                      {...cant_aceite}
                      className="border-2 border-[#CCC6C6] py-3 ps-3 w-[327px] text-lg"
                    />
                  </div>

                  <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
                    <label>Operador</label>
                    <select
                      name="trabajadorID"
                      value={formValues.trabajadorID || ""}
                      onChange={handleChange}
                      className="text-lg border-2 border-[#CCC6C6] py-3 ps-3 w-[327px]"
                    >
                      <option value="">Seleccionar Operador</option>
                      {operadores.map((operador) => (
                        <option
                          key={operador.operadorID}
                          value={operador.operadorID}
                        >{`${operador.nombre} ${operador.apellido}`}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
                    <label>Imagen maquinaria</label>
                    <input
                      {...imagen}
                      className=" py-3 ps-3 w-[327px] text-lg"
                    />
                  </div>
                </div>
              </div>
              <button
                className="bg-[#283B4A] font-medium text-2xl text-white py-3 px-6 rounded-3xl mt-10"
                onClick={handleRegistrar}
                type="button"
              >
                Registrar
              </button>
            </form>
          </Modal>
        )}

        <div className="w-[100%] max-h-[780px] bg-[#FAFAFA]  ">
          <div className="flex justify-between bg-[#F1F5F9] py-4 px-10">
            <button
              className="bg-[#2F4A5B] px-8 py-2 text-white rounded-xl"
              onClick={handlerOpenModal}
            >
              Registrar Maquinaria
            </button>
            <button
              className="bg-[#2F4A5B] px-8 py-2 text-white rounded-xl"
              onClick={toggleMostrarActivas}
            >
              {mostrarActivas ? "Mostrar todas" : "Mostrar activos"}
            </button>
            <div className="flex  items-center font-medium text-xl">
              <span className="text-[#2F4A5B]">Ordenar por: </span>
              <select
                id="filtro"
                className="appearance-none bg-[#2F4A5B] border text-white border-gray-300 rounded-md py-2 px-10 focus:outline-none focus:border-blue-500" 
                value={orden}
                onChange={handleChangeOrden}
              >
            <option value="tipoMaquinaria">Tipo</option>
            <option value="marca">Marca</option>
          </select>
            </div>
          </div>
          <div className="p-7 h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {ordenarMaquinarias(mostrarActivas ? maquinasActivas : maquinas).map((maquina) => (
                <div
                  key={maquina.maquinariaID}
                  className={`rounded-lg shadow-md cursor-pointer overflow-hidden ${maquina.estado ? 'bg-green-100' : 'bg-red-100'}`}
                  onClick={() => maquina.estado && handleAlquilar({
                    maquinaID: maquina.maquinariaID,
                    tipo_maquina: maquina.tipoMaquinaria,
                    marca_maquina: maquina.marca,
                    modelo_maquina: maquina.modelo,
                  })}
                >
                  <img
                    src={"https://www.finning.com/content/dam/finning/es/Images/Interiores/Secciones/Empresa/Noticias/Noticias_FINSA/420F2_560x394.jpg"}  
                    alt="Imagen de maquinaria"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-gray-800 font-medium"><b>Tipo    </b>: {maquina.tipoMaquinaria}</p>
                    <p className="text-gray-800 font-medium"><b>Marca   </b>: {maquina.marca}</p>
                    <p className="text-gray-800 font-medium"><b>Modelo  </b>: {maquina.modelo}</p>
                    <p className="text-gray-800 font-medium"><b>Operador</b>: {maquina.trabajador + " " + maquina.apellidoTrabajador}</p>
                    {maquina.estado && (
                      <div className="mt-2 flex justify-center">
                        <button
                          className="py-2 px-4 bg-blue-600 rounded-md text-white shadow-md hover:bg-blue-700 transition duration-300 w-full max-w-xs"     
                          onClick={() =>
                            handleAlquilar({
                              maquinaID: maquina.maquinaID,
                              tipo_maquina: maquina.tipoMaquinaria,
                              marca_maquina: maquina.marca,
                              modelo_maquina: maquina.modelo,
                            })
                          }
                        >
                          Alquilar
                        </button>
                      </div>
                    )}
                    {!maquina.estado && (
                      <div className="text-red-500 font-medium mt-2 text-center">Alquilada o en mantenimiento</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maquinaria;