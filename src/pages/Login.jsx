import React, { useState } from "react";
import Fondo from "../assets/fondo.webp";
import Logo from "../assets/Opemaq Logo.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormSide = () => {
  const inputStyle =
    "border-b-[3px] border-[#283B4A] bg-[#fafafa] h-[56px] ps-1 text-xl focus:outline-none";
  const labelStyle = "font-medium text-[#283B4A]";
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginSuccess = async () => {
    try {
      const user = document.getElementById("user").value;
      const password = document.getElementById("password").value;

      if (!user & !password) {
        throw new Error("Por favor ingresa tu usuario y contraseña");
      } else if (!user) {
        throw new Error("Por favor ingresa tu usuario");
      } else if (!password) {
        throw new Error("Por favor ingresa tu contraseña");
      }

      const endpoint = "http://localhost:8080/api/usuarios/logging";
      const data = { nombre: user, password: password };
      const headers = { "Content-Type": "application/json" };
      const response = await axios.post(endpoint, data, { headers });
      if (response.status === 200 || response.status === 202) {
        navigate("/inicio/registrar");
      } else if (response.status === 404) {
        throw new Error("El usuario no existe");
      } else {
        console.error("Respuesta inesperada de la API:", response.status);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="w-[706px] flex justify-center items-center bg-[#fafafa]">
      <div className="flex flex-col items-center text-[#283B4A]">
        <img src={Logo} alt="" width={200} className="rounded-full" />
        <h1 className="mt-[21px] text-[30px] font-bold">OPEMAQ CONSTRUYE</h1>
        <h2 className="mt-[30px] text-[30px] font-bold mb-[50px]">
          Bienvenido
        </h2>

        {/* Login Form */}
        <form action="" className="flex items-center justify-center flex-col">
          <div className="flex flex-col w-[430px]">
            <label className={labelStyle}>Nombre de usuario</label>
            <input
              type="text"
              className={inputStyle}
              id="user"
              required={true}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col w-[430px] mt-[40px]">
            <label className={labelStyle}>Contraseña</label>
            <input
              type="password"
              className={inputStyle}
              id="password"
              required={true}
            />
          </div>
          <button
            onClick={loginSuccess}
            type="button"
            className="hover:bg-[#008bcb] active:bg-[#006fa4] px-28 mt-[65px] bg-[#09A3DF] text-center text-[24px] h-[75px] rounded-3xl text-white"
          >
            Ingresar
          </button>
          {/* Mensaje de validacion*/}
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </form>
      </div>
    </div>
  );
};

const ImageSide = () => {
  return (
    <div className="brightness-50">
      <img src={Fondo} alt="Imagen Opemaq" className="h-screen" />
    </div>
  );
};

function Login() {
  return (
    <div className="flex h-screen">
      <FormSide />
      <ImageSide />
    </div>
  );
}

export default Login;
