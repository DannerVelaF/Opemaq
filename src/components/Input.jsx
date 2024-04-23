import React from "react";

function Input({ label, placeholder = "", required = true, name, onchange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">
        {label}
        {required ? <span className="text-red-600 font-bold">*</span> : ""}
      </label>
      <input
        placeholder={placeholder}
        className="h-14 w-[390px] border-2 border-black ps-[17px] mt-2"
        required={required}
        name={name}
        autoComplete="off"
        onChange={(e) => onchange(e.target.name, e.target.value)}
      />
    </div>
  );
}

export default Input;
