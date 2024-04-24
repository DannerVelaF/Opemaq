import React, { useState } from "react";

const useField = ({ type, placeholder }) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const clearValue = () => {
    setValue("");
  };
  return {
    type,
    placeholder,
    value,
    onChange,
    clearValue,
  };
};

function Almacen() {
  const usuario = useField({ type: "text", placeholder: "Ingresa el usuario" });
  const usuario2 = useField({
    type: "text",
    placeholder: "Ingresa el usuario2",
  });
  const usuario3 = useField({
    type: "text",
    placeholder: "Ingresa el usuario3",
  });

  const handlerClear = () => {
    usuario.clearValue();
  };
  return (
    <div>
      <label htmlFor="">Prueba</label>
      <input {...usuario} />
      <input {...usuario2} />
      <input {...usuario3} />
      <button onClick={handlerClear}>clear</button>
    </div>
  );
}

export default Almacen;
