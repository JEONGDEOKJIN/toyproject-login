import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonNavigateMain = () => {
  const navigate = useNavigate();
  const onClickMain = () => {
    navigate("/main");
  };
  return (
    <div>
      <button
        className=" hover:bg-[rgba(100,154,234,0.3)]  hover:text-neutral-800
      bg-[rgba(100,154,234,0.1)] transition-all ease-in border-gray-100 border-[1px] px-3 py-1 rounded-full text-[14px]"
        onClick={onClickMain}
      >
        게시판 메인
      </button>


    </div>
  );
};

export default ButtonNavigateMain;
