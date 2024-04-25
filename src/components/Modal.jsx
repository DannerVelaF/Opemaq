import React, { useState } from "react";
import CloseIcon from "../assets/dashboard icons/CloseIcon";

function Modal({ titulo, handlerOpenModal, children }) {
  const [formValues, setFormValues] = useState({
    tipo_maquina: "",
    marca_maquina: "",
    modelo_maquina: "",
    horas_uso: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegistrar = () => {
    // Aquí puedes imprimir los valores o realizar otra acción
    console.log("Valores ingresados:", formValues);
    // Cerrar el modal
    handlerOpenModal();
  };

  return (
    <div className="z-50 absolute w-[605px]  bg-white p-7 rounded-2xl">
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
