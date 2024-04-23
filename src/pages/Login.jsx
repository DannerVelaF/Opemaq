import React from "react";
import Fondo from "../assets/fondo.webp";
import Logo from "../assets/Opemaq Logo.jpg";
import { useNavigate } from "react-router-dom";

const FormSide = () => {
  // Input style
  const inputStyle =
    "border-b-[3px] border-[#283B4A] bg-[#fafafa] h-[56px] ps-1 text-xl focus:outline-none";
  // label style
  const labelStlye = "font-medium text-[#283B4A]";
  // Form group style

  const navigate = useNavigate();

  function loginSuccess() {
    navigate("/inicio");
  }

  return (
    <div className="w-[706px] flex justify-center items-center bg-[#fafafa]">
      <div className="flex  flex-col items-center text-[#283B4A]">
        <img src={Logo} alt="" width={200} className="rounded-full" />
        <h1 className="mt-[21px] text-[30px] font-bold">OPEMAQ CONSTRUYE</h1>
        <h2 className="mt-[30px] text-[30px] font-bold mb-[50px]">
          Bienvenido
        </h2>

        {/* Login Form system */}
        <form action="" className="flex items-center justify-center flex-col">
          <div className="flex flex-col w-[430px]">
            <label className={labelStlye}>Nombre de usuario</label>
            <input type="text" className={inputStyle} />
          </div>
          <div className="flex flex-col w-[430px] mt-[40px]">
            <label className={labelStlye}>Contraseña</label>
            <input type="password" className={inputStyle} />
          </div>
          <button
            onClick={loginSuccess}
            type="button"
            className="hover:bg-[#008bcb] active:bg-[#006fa4] px-28 mt-[65px] bg-[#09A3DF] text-center text-[24px] h-[75px] rounded-3xl text-white"
          >
            Ingresar
          </button>
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
    <div className="flex  h-screen">
      <FormSide />
      <ImageSide />
    </div>
  );
}

export default Login;
