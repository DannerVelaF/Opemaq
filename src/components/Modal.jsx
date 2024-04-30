import React from "react";
import CloseIcon from "../assets/dashboard icons/CloseIcon";

function Modal({ titulo, handlerOpenModal, children }) {
  return (
    <div className="z-50 absolute  bg-white p-7 rounded-2xl">
      <button
        onClick={handlerOpenModal}
        className="absolute right-0 top-0 p-2 bg-[#E5E7EB] rounded-full m-2"
      >
        <CloseIcon />
      </button>
      <h1 className="font-bold text-2xl">{titulo}</h1>
      <div className="flex flex-col gap-5 mt-4 p-5 justify-center">
        {children}
      </div>
      <div className="flex justify-end"></div>
    </div>
  );
}

export default Modal;
