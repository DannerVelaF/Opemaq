import React, { useContext, useEffect, useState } from "react";
import BarraSuperior from "../components/BarraSuperior";
import MaquinaIMG from "../assets/maquinaria.jpg";
import Modal from "../components/Modal";
import { MaquinaContext } from "../App";
import { useNavigate } from "react-router-dom";
function Maquinaria() {
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [maquinaSeleccionada, setMaquinaSeleccionada] =
    useContext(MaquinaContext);

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({});

  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [operadores, setOperadores] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

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

  const handleAlquilar = (maquinaData) => {
    setMaquinaSeleccionada(maquinaData);
    navigate("/inicio");
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
    console.log(formValues);
    try {
      const response = await fetch("http://localhost:8080/api/maquinas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const responseText = await response.text();
      console.log("Respuesta del servidor:", responseText);
      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error("Error en la solicitud:", errorData);
        } catch (error) {
          console.error("Error al analizar la respuesta JSON:", error);
        }
        // throw new Error("Error al registrar maquina");
        return;
      }
    } catch (error) {
      console.log(error);
    }

    setFormValues({});
    handlerOpenModal();
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
      const response = await fetch("http://localhost:8080/api/marca_maquinas");
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
      const response = await fetch("http://localhost:8080/api/tipomaquinaria");
      if (!response.ok) {
        throw new Error("Error al obtener los tipos de maquinaria");
      }
      const data = await response.json();

      setTipos(data);
    } catch (error) {
      setError("Error al obtener la marca");
    }
  };
  const ObtenerOperadores = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/operadores");
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
      const response = await fetch("http://localhost:8080/api/maquinas");
      if (!response.ok) {
        throw new Error("Error al obtener las maquinas");
      }
      const data = await response.json();
      console.log(data);
      setMaquinas(data);
    } catch (error) {
      setError("Error al obtener maquinas");
    }
  };

  useEffect(() => {
    ObtenerOperadores();
    ObtenerMarcas();
    ObtenerTipos();
    ObtenerMaquinas();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <BarraSuperior>Catálago de Maquinaria</BarraSuperior>
      <div className="flex-1 flex justify-center items-center relative">
        {openModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
        )}
        {openModal && (
          <Modal
            handlerOpenModal={handlerOpenModal}
            titulo={"Registrar Maquinaria"}
            handleChange={handleChange} // Pasa handleChange como prop al Modal
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

        <div className="w-[1443px] max-h-[780px] bg-[#FAFAFA]  ">
          <div className="flex justify-between bg-[#F1F5F9] py-4 px-10">
            <button
              className="bg-[#2F4A5B] px-8 py-2 text-white rounded-xl"
              onClick={handlerOpenModal}
            >
              Registrar Maquinaria
            </button>

            <div className="flex  items-center font-medium text-xl">
              <span className="">Ordenar por: </span>
              <select id="" className="bg-inherit ">
                <option value="nombre">Tipo</option>
                <option value="marca">Marca</option>
              </select>
            </div>
          </div>
          {/* interfaz de muestra */}
          <div className="p-7 flex flex-col gap-7 flex-1 min-h-[700px] overflow-y-scroll">
            {maquinas.map((maquina) => (
              <div
                key={maquina.maquinaID}
                className="flex items-center justify-between"
              >
                <div className="flex gap-3 items-center flex-1">
                  <img
                    src={`/public/image/${maquina.imagenMaquinaria}`}
                    width={250}
                    alt=""
                    className=""
                  />
                  <div className="font-medium text-xl">
                    <p>Tipo: {maquina.tipoMaquinaria}</p>
                    <p>Marca: {maquina.marca}</p>
                    <p>Modelo: {maquina.modelo}</p>
                    <p>Operador: {maquina.trabajador}</p>
                  </div>
                </div>
                <hr className="border-2 rotate-90 w-44" />
                <div className="flex-1 flex items-center flex-col justify-center">
                  <p className="text-xl relative px-4 flex text-green-500 font-bold">
                    <span className="absolute rounded-full w-3 h-3 bg-green-500 top-0 left-0 translate-y-[50%]"></span>
                    Estado: Disponible
                  </p>
                  <div className="font-medium text-xl text-white">
                    <button
                      className="py-2 px-8 bg-[#2F4A5B] mt-1"
                      onClick={() =>
                        handleAlquilar({
                          tipo_maquina: maquina.tipoMaquinaria,
                          marca_maquina: maquina.marca,
                          modelo_maquina: maquina.modelo,
                        })
                      }
                    >
                      Alquilar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maquinaria;
