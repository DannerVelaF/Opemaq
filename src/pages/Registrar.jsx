import React, { useState } from "react";
import BarraSuperior from "../components/BarraSuperior";
import Input from "../components/Input";
import InputCorto from "../components/InputCorto";
function Registrar() {
  const [formData, setFormData] = useState({});
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          className="p-20 flex flex-col gap-14"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-28">
            <div className="flex flex-col gap-6">
              <div className="flex gap-28">
                <div className="flex flex-col gap-6 ">
                  <Input
                    label={"RUC de la empresa"}
                    placeholder={"Ingrese el RUC de la empresa"}
                    onchange={handleInputChange}
                    name={"empresa"}
                  />
                  <Input
                    label={"Nombre de la empresa"}
                    placeholder={"Ingrese el nombre de la empresa"}
                    onchange={handleInputChange}
                    name={"nombre_empresa"}
                  />
                  <div className="flex w-[390px] justify-around">
                    <InputCorto
                      label={"Fecha de inicio"}
                      type={"date"}
                      onchange={handleInputChange}
                      name={"fecha_inicio"}
                    />
                    <InputCorto
                      label={"Fecha de Fin"}
                      type={"date"}
                      required={true}
                      onchange={handleInputChange}
                      name={"fecha_fin"}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <Input
                    label={"Correo electrónico de la empresa"}
                    placeholder={"Ingrese el correo de la empresa"}
                    required={false}
                    type="email"
                    onchange={handleInputChange}
                    name={"email"}
                  />
                  <Input
                    label={"Teléfono de la empresa"}
                    placeholder={"Ingrese el teléfono de la empresa"}
                    onchange={handleInputChange}
                    name={"telefono"}
                  />
                  <Input
                    label={"Dirección de la empresa"}
                    placeholder={"Ingrese direccion de la empresa"}
                    onchange={handleInputChange}
                    name={"direccion"}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>Decripción de contrato</label>
                <textarea
                  type="text"
                  className=" bottom-0 h-40 border-2  border-black p-[17px] text-start "
                  placeholder="Descripcion"
                  name="descripcion"
                  onChange={(e) =>
                    handleInputChange("descripcion", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Input
                label={"Tipo de máquina"}
                required={true}
                type="email"
                onchange={handleInputChange}
                name={"email"}
              />
              <Input
                label={"Marca de la máquina"}
                onchange={handleInputChange}
                name={"marca"}
              />
              <Input
                label={"Modelo de la máquina"}
                onchange={handleInputChange}
                name={"modelo"}
              />
              <div className="flex w-[390px] justify-around flex-col items-center gap-2">
                <div className="flex gap-2">
                  <InputCorto
                    label={"Horas de uso"}
                    required={true}
                    onchange={handleInputChange}
                    name={"horas_uso"}
                  />
                  <InputCorto
                    label={"Precio x Hora"}
                    placeholder="s/"
                    onchange={handleInputChange}
                    name={"precio"}
                  />
                </div>
                <div className=" ms-auto flex justify-center items-center">
                  <p className="me-5">Monto total </p>
                  <InputCorto readonly={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <button
              type="submit"
              className="rounded-2xl w-[251px] h-[76px] bg-[#234053] text-white text-[30px]"
            >
              Procesar
            </button>
            <button
              type="button"
              className="rounded-2xl w-[251px] h-[76px] bg-[#F0EFEF] text-black font-bold text-[30px]"
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
