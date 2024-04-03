import React from "react";
import { storedAccessToken } from "../stores";
import { useRecoilState, useResetRecoilState } from "recoil";
import deleteCookies from "../utils/deleteCookies";

const ButtonLogout = ({ formReset }) => {
  const [_accessToken, set_accessToken] = useRecoilState(storedAccessToken);
  const resetAccessToken = useResetRecoilState(storedAccessToken);

  const onClickLogout = () => {
    deleteCookies("refreshToken");
    formReset();

    // accessToken 초기과
    resetAccessToken()
      // set_accessToken(undefined) 
      // undefined 문자열 자체가 넘어가서, '토큰 변조 에러 코드' 가 뜸 
  };

  return (
    <>
      <button onClick={onClickLogout}>로그아웃</button>
    </>
  );
};

export default ButtonLogout;
