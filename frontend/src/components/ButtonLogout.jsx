import React from "react";
import { loggedInState, storedAccessToken } from "../stores";
import { useRecoilState, useResetRecoilState } from "recoil";
import deleteCookies from "../utils/deleteCookies";

const ButtonLogout = ({ formReset }) => {
  const resetAccessToken = useResetRecoilState(storedAccessToken);
  const resetLoginState = useResetRecoilState(loggedInState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);


  const onClickLogout = async () => {
    deleteCookies("refreshToken");
    formReset();

    setIsLoggedIn(false)  // 로그인 상태 초기화

    // accessToken 초기화
      resetAccessToken(); // recoil 완전 초기화
      // set_accessToken(undefined) // 토큰 변조 테스트 용 | undefined 문자열 자체가 넘어가서, '토큰 변조 에러 코드' 가 뜸
  };


  return (
    <>
      <button
        className=" hover:bg-gray-800  hover:text-white
      bg-gray-100  transition-all ease-in border-gray-100 border-[1px] px-3 py-1 rounded-full text-[14px]"
        onClick={onClickLogout}
      >
        Logout
      </button>

    </>
  );
};

export default ButtonLogout;
