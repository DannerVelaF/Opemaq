import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/Empresa-logo.webp";

import Contract from "../assets/dashboard icons/Contrato";
import Maquinaria from "../assets/dashboard icons/Maquinaria";
import Almacen from "../assets/dashboard icons/Almacen";
import LogOut from "../assets/dashboard icons/LogOut";
function Dashboard() {
  useEffect(() => {
    document.title = "Opemaq Construye EIRL";
  }, []);

  const opciones = [
    {
      icon: <Contract width={46} color={"#ffff"} />,
      text: "Registrar Contrato",
      to: "",
    },
    {
      icon: <Maquinaria width={46} color={"#ffff"} />,
      text: "Gestionar maquinaria",
      to: "maquinaria",
    },
    {
      icon: <Almacen width={46} color={"#ffff"} />,
      text: "Gestionar materiales",
      to: "almacen",
    },
    {
      icon: <LogOut width={46} color={"#ffff"} />,
      text: "Cerrar Sesion",
      to: "/login",
    },
  ];

  return (
    <div className="h-screen flex w-full ">
      {/* Dashboard */}
      <div className="bg-[#fafafa] w-[290px] border-e shadow-2xl max-h-screen flex flex-col">
        <div className="bg-[#2F4A5B] h-[132px] flex justify-center items-center">
          <img src={Logo} width={90} />
          <p className="text-white uppercase text- text-xl">
            opemaq <br /> construye
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center gap-20 ">
          {opciones.map((op, key) => (
            <div
              className="flex items-center flex-col justify-center"
              key={key}
            >
              <Link
                to={op.to}
                className=" bg-[#234053] hover:bg-[#277193] active:bg-[#255d79] w-[66px] h-[66px] flex justify-center items-center rounded-[15px]"
              >
                {op.icon}
              </Link>
              <p className="text-[#2F4A5B] font-bold">{op.text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* show section */}
      <div className="h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
