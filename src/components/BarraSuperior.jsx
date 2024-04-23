import React from "react";

function BarraSuperior({ children }) {
  return (
    <div className="w-full font-bold bg-[#FAFAFA] h-[82px] text-[32px] flex p-6 items-center text-gray-600 border-b-2 shadow-sm">
      {children}
    </div>
  );
}

export default BarraSuperior;
