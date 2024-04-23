import React from "react";

function InputCorto({
  label = "",
  type = "text",
  required = false,
  placeholder = "",
  readonly = false,
  name,
  onchange,
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">
        {label}
        {required ? <span className="text-red-600 font-bold">*</span> : ""}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        className="h-[61px] w-[192px] border-2 border-black ps-[17px] mt-2"
        required={required}
        readOnly={readonly}
        autoComplete="off"
        name={name}
        onChange={(e) => onchange(name, e.target.value)}
      />
    </div>
  );
}

export default InputCorto;
