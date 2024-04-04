import React from "react";
import { useNavigate } from "react-router-dom";

export const ButtonHome = () => {
  const navigate = useNavigate();

  const onClickHome = () => {
    navigate("/");
  };

  return (
    <button
      className=" hover:bg-[rgba(234,100,217,0.3)]  hover:text-neutral-800
      bg-[rgba(234,100,217,0.1)] transition-all ease-in border-gray-100 border-[1px] px-3 py-1 rounded-full text-[14px]"
      onClick={onClickHome}
    >
      Home
    </button>
  );
};
