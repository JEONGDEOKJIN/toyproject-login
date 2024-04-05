import React from "react";
import { useNavigate } from "react-router-dom";

export const ButtonHome = () => {
  const navigate = useNavigate();

  // 이게 있으니까, 기능 -> url 바귀면 , 못 씀 - 재활용 못 해
  // 버튼은 ui 만 있어야
  // 바뀔 수 있는거면 - 컴포넌트에 안 넣어야 해

  // 버튼을 만들고 -> props 로 만드는게 나음
  // 머터리얼 ui, 같은거 ⭐⭐⭐⭐⭐⭐
  // 프롭스 넘기는 이유는,

  // 디렉토리만 보고 들어갈 수 있게 ⭐⭐⭐⭐⭐⭐⭐
  // props 를 과감하게, 써보는 쪽으로!!!!!! ⭐⭐⭐⭐⭐⭐⭐ 이때의 문제점을 느껴야 함
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
