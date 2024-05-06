import React, { useState } from "react";
import Fondo from "../assets/fondo.webp";
import Imagen  from "../assets/fondo.svg";
import Logo from "../assets/Opemaq Logo.jpg";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 
import axios from "axios";

const FormSide = () => {
  const inputStyle =
    "border-b-[5px]  border-[#283B4A] bg-[#DFECF5]  h-[56px] w-[100%] ps-1 text-xl focus:outline-none rounded-[10px]";
  const labelStyle = "font-medium text-[#283B4A]";
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  const loginSuccess = async () => {
    try {
      const user = document.getElementById("user").value;
      const password = document.getElementById("password").value;
  
      if (!user) {
        throw new Error("Por favor ingresa tu nombre de usuario");
      }
  
      if (!password) {
        throw new Error("Por favor ingresa tu contraseña");
      }
      
      const endpoint = "http://localhost:8080/api/login";
      const data = { nombre: user, password: password };
      const headers = { 'Content-Type': 'application/json' };
      const response = await axios.post(endpoint, data, { headers });
  
      if (response.status === 200 || response.status === 202) {
        const token = response.data.jwTtoken;
        localStorage.setItem("token", token);
        navigate("/inicio");
      } else if (response.status === 404) {
        throw new Error("Usuario o contraseña incorrectos");
      } else {
        throw new Error("Ha ocurrido un error, por favor intenta de nuevo más tarde");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="w-[90vh] flex justify-center items-center bg-[#ffffff] h-screen rounded-[40px]">
      <div className="flex flex-col items-center text-[#283B4A]">
      <img 
        src={Logo} 
        alt="" 
        width={150} 
        className="rounded-full"
        style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}
      />

        <h1 className="mt-[2%] text-[20px] font-bold">OPEMAQ CONSTRUYE</h1>
        <h2 className="mt-[2%] text-[30px] font-bold mb-[5%]">
          Bienvenido
        </h2>

        <form action="" className="flex items-center justify-center flex-col h-[100%]">
          <div className="flex flex-col w-[430px]">
            <label className={labelStyle}>
              <FaUser className="inline-block align-middle mr-2" />
              Nombre de usuario
            </label>
            <input
              type="text"
              className={inputStyle}
              id="user"
              required={true}
            />
          </div>
          <div className="flex flex-col w-[430px] mt-[20px]"> 
            <label className={labelStyle}>
              <FaLock className="inline-block align-middle mr-2" /> 
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                className={inputStyle}
                id="password"
                required={true}
              />
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                {showPassword ? (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    className="text-[#283B4A cursor-pointer mr-2"
                  />
                ) : (
                  <FaEye
                    onClick={togglePasswordVisibility}
                    className="text-[#283B4A] cursor-pointer mr-2"
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={loginSuccess}
            type="button"
            className="hover:bg-[#008bcb] active:bg-[#006fa4] px-24 mt-[6%] bg-[#09A3DF] text-center text-[20px] h-[60px] rounded-3xl text-white"
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
    </div>
  );
};
function Login() {
  return (
    <div 
      className="flex h-screen" 
      style={{ 
        backgroundImage: `url(${Imagen})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <FormSide />
      <ImageSide />
    </div>
  );
}


export default Login;
