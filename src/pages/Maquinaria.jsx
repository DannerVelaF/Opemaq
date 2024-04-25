import React, { useContext, useEffect, useState } from "react";
import BarraSuperior from "../components/BarraSuperior";
import MaquinaIMG from "../assets/maquinaria.jpg";
import Modal from "../components/Modal";
import { MaquinaContext } from "../App";
import { useNavigate } from "react-router-dom";
function Maquinaria() {
  const [openModal, setOpenModal] = useState(false);
  const [maquinaSeleccionada, setMaquinaSeleccionada] =
    useContext(MaquinaContext);
  const navigate = useNavigate();
  const handleAlquilar = (maquinaData) => {
    setMaquinaSeleccionada(maquinaData);
    navigate("/inicio");
  };

  const handlerOpenModal = () => {
    setOpenModal(!openModal);
  };

  const tipo_maquina = {
    type: "text",
    name: "tipo_maquina",
    placeholder: "Tipo de maquina",
    autoComplete: "off",
  };
  const marca_maquina = {
    type: "text",
    name: "tipo_maquina",
    placeholder: "Tipo de maquina",
    autoComplete: "off",
  };
  const modelo_maquina = {
    type: "text",
    name: "tipo_maquina",
    placeholder: "Tipo de maquina",
    autoComplete: "off",
  };
  const horas_uso = {
    type: "text",
    name: "tipo_maquina",
    placeholder: "Tipo de maquina",
    autoComplete: "off",
  };

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
          >
            <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
              <label>Tipo de maquina</label>
              <input
                {...tipo_maquina}
                className="text-lg border-2 border-[#CCC6C6] py-3 ps-3 w-[327px]"
              />
            </div>
            <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
              <label>Marca</label>
              <input
                {...marca_maquina}
                className="text-lg border-2 border-[#CCC6C6] py-3 ps-3 w-[327px]"
              />
            </div>
            <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
              <label>Modelo</label>
              <input
                {...modelo_maquina}
                className="border-2 border-[#CCC6C6] py-3 ps-3 w-[327px] text-lg"
              />
            </div>
            <div className="flex gap-4 text-xl text-[#131216] items-center justify-between">
              <label>Horas de uso</label>
              <input
                {...horas_uso}
                className="border-2 border-[#CCC6C6] py-3 ps-3 w-[327px] text-lg"
              />
            </div>
          </Modal>
        )}
        <div className="w-[1443px] min-h-[780px] bg-[#FAFAFA] ">
          <div className="flex justify-between bg-[#F1F5F9] py-4 px-10">
            <button
              className="bg-[#2F4A5B] px-8 py-2 text-white rounded-xl"
              onClick={handlerOpenModal}
            >
              Registrar Maquinaria
            </button>

            <div className="flex  items-center font-medium text-xl">
              <span className="">Ordenar por: </span>
              <select name="" id="" className="bg-inherit  ps-3  ">
                <option value="nombre">Nombre</option>
                <option value="marca">Marca</option>
              </select>
            </div>
          </div>
          {/* interfaz de muestra */}
          <div className="p-7">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center flex-1">
                <img src={MaquinaIMG} width={250} alt="" className="" />
                <div className="font-medium text-xl">
                  <p>Tipo: Excavadora</p>
                  <p>Marca: CAT</p>
                  <p>Modelo: XXXXX</p>
                  <p>Operador: XXXX</p>
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
                    className="py-2 px-8 bg-[#2F4A5B] me-1"
                    onClick={() =>
                      handleAlquilar({
                        tipo_maquina: "Excavadora",
                        marca_maquina: "Cat",
                        modelo_maquina: "XXXX",
                      })
                    }
                  >
                    Alquilar
                  </button>
                  <button className="py-2 px-8 bg-[#2F4A5B]">
                    Mantenimiento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maquinaria;
