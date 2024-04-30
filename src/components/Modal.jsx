import React, { useState } from "react";
import CloseIcon from "../assets/dashboard icons/CloseIcon";

function Modal({ titulo, handlerOpenModal, children }) {
  const [formValues, setFormValues] = useState({
    tipo_maquina: "",
    marca_maquina: "",
    modelo_maquina: "",
    horas_uso: "",
    imagen_maquina: "",
    operador: "",
    estado: true,
  });

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

  const handleRegistrar = () => {
    const valuesArray = Object.values(formValues);
    if (valuesArray.some((value) => value === "")) {
      console.log("Por favor completa todos los campos antes de enviar.");
      return;
    }
    console.log(formValues);
    handlerOpenModal();
  };

  return (
    <div className="z-50 absolute   bg-white p-7 rounded-2xl">
      <button
        onClick={handlerOpenModal}
        className="absolute right-0 top-0 p-2 bg-[#E5E7EB] rounded-full m-2"
      >
        <CloseIcon />
      </button>
      <h1 className="font-bold text-2xl">{titulo}</h1>
      <div className="flex flex-col gap-5 mt-4 p-5 justify-center">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              value: formValues[child.props.name],
              onChange: handleChange,
            });
          }
          return child;
        })}
        <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
          <label>Operador</label>
          <select
            name="operador"
            value={formValues.operador}
            onChange={handleChange}
          >
            <option value="">Seleccione un operador</option>
            <option value="1">Jhon Mendoza</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#283B4A] font-medium text-2xl text-white py-3 px-6 rounded-3xl"
          onClick={handleRegistrar}
        >
          Registrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
