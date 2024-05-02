import React, { useContext, useEffect, useState } from "react";
import BarraSuperior from "../components/BarraSuperior";
import { MaquinaContext } from "../App";
import axios from "axios";
const useField = ({ placeholder, name, autoComplete = "off", required }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const resetValue = () => {
    setValue("");
  };
  return {
    placeholder,
    name,
    value,
    onChange,
    autoComplete,
    required,
    resetValue,
  };
};

function Registrar() {
  const [formData, setFormData] = useState({}); // Estado para almacenar los datos del formulario
  const [maquinaSeleccionada, setMaquinaSeleccionada] =
    useContext(MaquinaContext);

  useEffect(() => {
    if (maquinaSeleccionada) {
      setFormData((prevData) => ({
        ...prevData,
        maquinariaID: maquinaSeleccionada.maquinariaID, // Utiliza directamente maquinaSeleccionada.maquinariaID
        usuarioID: localStorage.getItem("usuarioID"),
      }));
    }
  }, [maquinaSeleccionada]);

  const validar = () => {
    const campos = [
      "ruc",
      "nombre_empresa",
      "fecha_inicio",
      "fecha_fin",
      "correo_empresa",
      "telefono_empresa",
      "dirección_empresa",
      "horas_contratadas",
      "precio_hora",
      "descripcion",
      "maquinariaID",
    ];
    const vacios = campos.filter((campo) => !formData[campos]);
    return vacios.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!maquinaSeleccionada) {
      console.log("primero debe selecconar una maquina");
    } else {
      if (!validar()) {
        console.log(formData);
      }
    }

    const {
      clienteID,
      nombre_empresa,
      correo_empresa,
      dirección_empresa,
      telefono_empresa,
    } = formData;

    const formCliente = {
      clienteID: clienteID,
      nombre: nombre_empresa,
      direccion: dirección_empresa,
      correo: correo_empresa,
      telefono: telefono_empresa,
    };

    // console.log(formCliente);
    registrarCliente(formCliente);
    // regist
  };

  const registrarCliente = async (data) => {
    try {
      const endpoint = "http://localhost:8080/api/clientes";
      const response = await axios.post(endpoint, data);
      registrarContrato(formData);
    } catch (error) {
      throw new Error();
    }
  };

  const registrarContrato = async (data) => {
    console.log(formData);
    try {
      const endpoint = "http://localhost:8080/api/contratos";
      const response = await axios.post(endpoint, data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const inputStlye = "h-14 w-[390px] border-2 border-black ps-[17px] mt-2";
  const shortInput = "h-[61px] w-[192px] border-2 border-black ps-[17px] mt-2";

  const ruc = useField({
    placeholder: "Ingrese el RUC de la empresa",
    name: "clienteID",
    required: true,
  });

  const empresa = useField({
    placeholder: "Ingrese el nombre de la empresa",
    name: "nombre_empresa",
    required: true,
  });
  const fecha_inicio = useField({
    name: "fecha_inicio",
    required: true,
  });
  const fecha_fin = useField({
    name: "fecha_fin",
    required: true,
  });

  const correo_empresa = useField({
    placeholder: "Ingresa el correo de la empresa",
    name: "correo_empresa",
    required: true,
  });

  const telefono_empresa = useField({
    placeholder: "Ingresa el teléfono de la empresa",
    name: "telefono_empresa",
    required: true,
  });

  const direccion_empresa = useField({
    placeholder: "Ingresa la dirección de la empresa",
    name: "dirección_empresa",
    required: true,
  });

  const horas_uso = useField({
    required: true,
    name: "horas_uso",
  });

  const precio_hora = useField({
    required: true,
    name: "horas_contratadas",
    placeholder: "s/",
  });

  const descripcion = useField({
    placeholder: "Descripcion del contrato",
    name: "descripcion",
  });

  const handlerReset = () => {
    ruc.resetValue();
    empresa.resetValue();
    fecha_inicio.resetValue();
    fecha_fin.resetValue();
    correo_empresa.resetValue();
    telefono_empresa.resetValue();
    direccion_empresa.resetValue();
    horas_uso.resetValue();
    precio_hora.resetValue();
    descripcion.resetValue();
    setMaquinaSeleccionada(null);
  };

  return (
    <div className=" h-screen flex flex-col">
      <BarraSuperior>Contrato de alquiler</BarraSuperior>
      <div className="flex-1 ">
        <h1 className="font-bold text-3xl ps-10 pt-7">
          Información de contrato
        </h1>
        {/* Form */}
        <form
          action=""
          className="p-20 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-28 justify-center items-center">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 ">
              <div className="flex flex-col ">
                <label>
                  Ruc de la empresa{" "}
                  {ruc.required ? (
                    <span className="text-red-700 font-bold text-xl">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  {...ruc}
                  className={inputStlye}
                  onChange={(e) => {
                    ruc.onChange(e);
                    handleInputChange(ruc.name, e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col ">
                <label>
                  Nombre de la empresa
                  {empresa.required ? (
                    <span className="text-red-700 font-bold text-xl">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  {...empresa}
                  className={inputStlye}
                  onChange={(e) => {
                    empresa.onChange(e);
                    handleInputChange(empresa.name, e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label htmlFor="">Hora de inicio</label>
                  <input
                    type="date"
                    className={shortInput}
                    {...fecha_inicio}
                    onChange={(e) => {
                      fecha_inicio.onChange(e);
                      handleInputChange(
                        fecha_inicio.name,
                        new Date(e.target.value).toISOString()
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Hora de fin</label>
                  <input
                    type="date"
                    className={shortInput}
                    {...fecha_fin}
                    onChange={(e) => {
                      fecha_fin.onChange(e);
                      handleInputChange(
                        fecha_fin.name,
                        new Date(e.target.value).toISOString()
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Column 1 */}

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col ">
                <label>
                  Correo electronico de la empresa
                  {correo_empresa.required ? (
                    <span className="text-red-700 font-bold text-xl">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  {...correo_empresa}
                  className={inputStlye}
                  onChange={(e) => {
                    correo_empresa.onChange(e);
                    handleInputChange(correo_empresa.name, e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col ">
                <label>
                  Teléfono de la empresa
                  {telefono_empresa.required ? (
                    <span className="text-red-700 font-bold text-xl">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  {...telefono_empresa}
                  className={inputStlye}
                  onChange={(e) => {
                    telefono_empresa.onChange(e);
                    handleInputChange(telefono_empresa.name, e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col ">
                <label>
                  Dirección de la empresa
                  {direccion_empresa.required ? (
                    <span className="text-red-700 font-bold text-xl">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  {...direccion_empresa}
                  className={inputStlye}
                  onChange={(e) => {
                    direccion_empresa.onChange(e);
                    handleInputChange(direccion_empresa.name, e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Column 2 */}

            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="">Tipo de maquina</label>
                <input
                  type="text"
                  name="tipo_maquina"
                  className={inputStlye}
                  readOnly={true}
                  value={maquinaSeleccionada?.tipo_maquina || ""}
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="">Marca de la máquina</label>
                <input
                  type="text"
                  name="marca_maquina"
                  className={inputStlye}
                  readOnly={true}
                  value={maquinaSeleccionada?.marca_maquina || ""}
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="">Modelo de maquina</label>
                <input
                  type="text"
                  name="modelo_maquina"
                  className={inputStlye}
                  readOnly={true}
                  value={maquinaSeleccionada?.modelo_maquina || ""}
                  required={true}
                />
              </div>
            </div>
            {/* Column 3 */}
          </div>
          <div className="flex gap-28  items-center">
            <div className="flex flex-col gap-2">
              <label>Descripcion del contrato</label>
              <textarea
                className="p-2 border-2 border-black resize-none"
                id=""
                cols="106"
                rows="5"
                {...descripcion}
                onChange={(event) => {
                  descripcion.onChange(event);
                  handleInputChange(descripcion.name, event.target.value);
                }}
              ></textarea>
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label htmlFor="">Horas de uso</label>
                  <input
                    type="text"
                    className={shortInput}
                    {...horas_uso}
                    onChange={(e) => {
                      horas_uso.onChange(e);
                      handleInputChange(horas_uso.name, e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Precio por hora</label>
                  <input
                    type="text"
                    className={shortInput}
                    {...precio_hora}
                    onChange={(e) => {
                      precio_hora.onChange(e);
                      handleInputChange(precio_hora.name, e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end  ">
                <div className="flex items-center gap-5">
                  <label htmlFor="">Monto total</label>
                  <input className={shortInput} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button className="w-[251px] bg-[#234053] font-bold text-white text-3xl rounded-xl py-4 px-10 mr-6">
              Procesar
            </button>
            <button
              onClick={handlerReset}
              type="button"
              className="w-[251px] bg-[#F0EFEF] font-bold text-black text-3xl rounded-xl py-4 px-10"
            >
              Descartar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registrar;
