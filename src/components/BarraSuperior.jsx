import React from "react";

function BarraSuperior({ children }) {
  return (
    <div className="w-full font-bold bg-[#FAFAFA] h-[80px] text-[30px] flex p-5 items-center text-gray-600 border-b-2 shadow-sm">
      {children}
    </div>
  );
}

export default BarraSuperior;
