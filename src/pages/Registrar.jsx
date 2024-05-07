import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraSuperior from "../components/BarraSuperior";
import { MaquinaContext } from "../App";
import Swal from "sweetalert2";
import { useHref } from "react-router-dom";

const useField = ({ placeholder, name, autoComplete = "off", required }) => {
  const [value, setValue] = useState("");
  const [horasContratadas, setHorasContratadas] = useState('');
  const [precioPorHora, setPrecioPorHora] = useState('');
  const [montoTotal, setMontoTotal] = useState('');

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
  const [formData, setFormData] = useState({});
  const [maquinaSeleccionada] = useContext(MaquinaContext);
  const [horasContratadas, setHorasContratadas] = useState("");
  const [precioPorHora, setPrecioPorHora] = useState("");
  const [montoTotal, setMontoTotal] = useState("");
  const navigate = useNavigate();

  const obtenerToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "No se ha iniciado sesión",
        text: "Debes iniciar sesión para acceder a esta página",
        confirmButtonColor: "#2F4A5B",
      }).then(() => {
        window.location.href = "/login";
      });
    }
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ruc || !formData.nombreCliente || !formData.correoCliente || !formData.telefonoCliente || !formData.direccionCliente || !formData.fecha_inicio || !formData.fecha_fin || !formData.descripcion || !maquinaSeleccionada || !horasContratadas || !precioPorHora) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos antes de enviar el formulario.",
        confirmButtonColor: "#2F4A5B",
      });
      return;
    }

    const dataToSend = {
      clienteID: formData.ruc,
      nombreCliente: formData.nombreCliente,
      correoCliente: formData.correoCliente,
      telefonoCliente: formData.telefonoCliente,
      direccionCliente: formData.direccionCliente,
      fecha_inicio: formData.fecha_inicio + "T00:00:00",
      fecha_fin: formData.fecha_fin + "T00:00:00",
      descripcion: formData.descripcion,
      maquinariaID: maquinaSeleccionada.maquinaID,
      usuarioID: 1,
      horas_contratadas: parseFloat(horasContratadas) || "",
      precio_hora: parseFloat(precioPorHora) || "",
    };

    try {
      const token = obtenerToken();
      const response = await fetch("http://localhost:8080/api/contratos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });
      console.log(dataToSend);
      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      Swal.fire({
        icon: "success",
        title: "Se realizo el contrato exitosamente",
        confirmButtonColor: "#2F4A5B",
      }).then(() => {
        navigate("/inicio/contratos"); 
      });
  
      resetForm();
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al enviar los datos");
    }
  };

  const resetForm = () => {
    setFormData({});
    setHorasContratadas("");
    setPrecioPorHora("");
    setMontoTotal("");
  };

  const calculateTotal = (horas, precio) => {
    const total = parseFloat(horas) * parseFloat(precio);
    setMontoTotal(isNaN(total) ? '' : total.toFixed(2));
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const ruc = useField({
    placeholder: "Ingrese el RUC de la empresa",
    name: "ruc",
    required: true,
  });

  const empresa = useField({
    placeholder: "Ingrese el nombre de la empresa",
    name: "nombreCliente",
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
    name: "correoCliente",
    required: true,
  });

  const telefono_empresa = useField({
    placeholder: "Ingresa el teléfono de la empresa",
    name: "telefonoCliente",
    required: true,
  });

  const direccion_empresa = useField({
    placeholder: "Ingresa la dirección de la empresa",
    name: "direccionCliente",
    required: true,
  });

  const descripcion = useField({
    placeholder: "Descripcion del contrato",
    name: "descripcion",
  });

  const inputStlye = "h-10 w-[100%] border-2 ps-[17px] mt-1 border-[#2F4A5B] transition-all duration-300 focus:border-blue-500 focus:outline-none";
  const shortInput = "h-10 w-[80%] border-2 ps-[17px] mt-2 border-[#2F4A5B] transition-all duration-300 focus:border-blue-500 focus:outline-none";

  return (
    <div className="h-screen flex flex-col">
      <BarraSuperior>Nuevo contrato de alquiler</BarraSuperior>
      <div className="flex-1 w-[100%]">
        <form
          action=""
          className="p-2 flex flex-col gap-2 justify-center items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-10 justify-center items-center">
            <div className="flex flex-col gap-2 w-[30%]">
              <div className="flex flex-col ">
                <label>Ruc de la empresa {ruc.required ? <span className="text-red-700 font-bold text-xl">*</span> : ""}</label>
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
                <label>Nombre de la empresa{empresa.required ? <span className="text-red-700 font-bold text-xl">*</span> : ""}</label>
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
                      handleInputChange(fecha_inicio.name, e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="">Hora de fin</label>
                  <input
                    type="date"
                    className={shortInput}
                    {...fecha_fin}
                    onChange={(e) => {
                      fecha_fin.onChange(e);
                      handleInputChange(fecha_fin.name, e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-[30%]">
              <div className="flex flex-col w-[100%]">
                <label>Correo electronico de la empresa{correo_empresa.required ? <span className="text-red-700 font-bold text-xl">*</span> : ""}</label>
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
                <label>Teléfono de la empresa{telefono_empresa.required ? <span className="text-red-700 font-bold text-xl">*</span> : ""}</label>
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
                <label>Dirección de la empresa{direccion_empresa.required ? <span className="text-red-700 font-bold text-xl">*</span> : ""}</label>
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
            <div className="flex flex-col gap-6 w-[30%]">
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
          </div>
          <div className="flex gap-1 items-center w-[90%]">
            <div className="flex flex-col w-[90%]">
              <label>Descripcion del contrato</label>
              <textarea
                className="p-2 border-2 border-[#2F4A5B] resize-none mr-[0 0 0 2] w-[95%] h-[100px]"
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
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label htmlFor="">Horas contratadas</label>
                  <input
                    type="text"
                    value={horasContratadas}
                    className={inputStlye}
                    onChange={(e) => {
                      setHorasContratadas(e.target.value);
                      calculateTotal(e.target.value, precioPorHora);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Precio por hora</label>
                  <input
                    type="text"
                    value={precioPorHora}
                    className={inputStlye}
                    onChange={(e) => {
                      setPrecioPorHora(e.target.value);
                      calculateTotal(horasContratadas, e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="flex items-center gap-5">
                  <label htmlFor="">Monto total</label>
                  <input
                    type="text"
                    value={montoTotal}
                    readOnly
                    className={inputStlye}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button className="w-[200px] bg-[#234053] text-white rounded-xl py-3 px-1 mr-6">Procesar</button>
            <button onClick={resetForm} type="button" className="w-[200px] bg-[#F0EFEF] text-black rounded-xl py-3 px-1">Descartar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registrar;
