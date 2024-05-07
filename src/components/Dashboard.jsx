import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../assets/Empresa-logo.webp";
import { FaWarehouse, FaFileInvoice, FaTools, FaStore, FaSignOutAlt } from 'react-icons/fa'; // Importa los iconos de react-icons

function Dashboard() {
  useEffect(() => {
    document.title = "Opemaq Construye EIRL";
  }, []);

  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };

  const opciones = [
    {
      icon: <FaWarehouse  style={{ color: 'white', fontSize: '1.6rem'  }} />,
      text: "Dashboard",
      to: "",
    },
    {
      icon: <FaFileInvoice style={{ color: 'white', fontSize: '1.6rem' }} />,
      text: "Contratos",
      to: "contratos",
    },
    {
      icon: <FaTools style={{ color: 'white', fontSize: '1.6rem' }} />,
      text: "Maquinaria",
      to: "maquinaria",
    },
    {
      icon: <FaStore style={{ color: 'white', fontSize: '1.6rem' }} />,
      text: "Almacén",
      to: "almacen",
    },
    {
      icon: <FaSignOutAlt style={{ color: 'black', fontSize: '1.4rem', margin: '0 0 0 .5rem' }} />,
      onClick: handleCerrarSesion,
      text: "Cerrar Sesión",
      to: "login",
    },
  ];

  return (
    <div className="flex">
      {/* Dashboard */}
      <div className="bg-[#2F4A5B] w-[15%] border-r shadow-2xl flex flex-col items-center">
        <div className="bg-[#2F4A5B] w-[100%] flex h-[15%] justify-center items-center border-b-2">
          <img src={Logo} width={100} alt="Logo" />
          <p className="text-white uppercase text-1xl">Opemaq <br /> Construye</p>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center gap-5">
          {opciones.map((op, key) => (
            <div className="flex items-center flex-col" key={key}>
              {op.onClick ? (
                <button
                  onClick={op.onClick}
                  className={op.text === "Cerrar Sesión" ? "bg-red-600 hover:bg-red-700 active:bg-red-800 w-[45px] h-[45px] rounded-[15px]" : "bg-[#234053] hover:bg-[#277193] active:bg-[#255d79] w-[50px] h-[50px] rounded-[15px]"}
                >
                  {op.icon}
                </button>
              ) : (
                <Link
                  to={op.to}
                  className="bg-[#234053] hover:bg-[#277193] active:bg-[#255d79] w-[50px] h-[50px] flex justify-center items-center rounded-[15px]"
                >
                  {op.icon}
                </Link>
              )}
              <p className="text-[#fff] font-bold">{op.text}</p>
            </div>
          ))}
        </div>
      </div>
      {/* show section */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
