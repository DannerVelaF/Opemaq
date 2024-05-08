import React, { useState } from "react";
import CloseIcon from "../assets/dashboard icons/CloseIcon";

function Modal({ titulo, handlerOpenModal, children }) {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    handlerOpenModal();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>
      <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-white p-7 rounded-2xl">
          <button
            onClick={handleCloseModal}
            className="absolute right-0 top-0 p-2 bg-[#E5E7EB] rounded-full m-2"
          >
            <CloseIcon />
          </button>
          <h1 className="font-bold text-2xl">{titulo}</h1>
          <div className="flex flex-col gap-5 mt-4 p-5 justify-center">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  value: formValues[child.props.name],
                  onChange: handleChange,
                });
              }
              return child;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
