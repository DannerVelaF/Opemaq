import React, { useState } from "react";

function Almacen() {
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState(null);

  const handlerChange = (e) => {
    const file = e.target.files[0];
    z;
    console.log(file);
    console.log(URL.createObjectURL(file));
    setImage(URL.createObjectURL(file));
    setSelected(file);
  };

  return (
    <div>
      <input
        type="file"
        className="border-2"
        onChange={handlerChange}
        placeholder="Ingresa imagen"
      />
      <input />

      {selected && <img src={image} />}
    </div>
  );
}

export default Almacen;
