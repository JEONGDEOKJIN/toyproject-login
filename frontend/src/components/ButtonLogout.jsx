import React from "react";
import { storedAccessToken } from "../stores";
import { useRecoilState } from "recoil";
import deleteCookies from "../utils/deleteCookies";

const ButtonLogout = ({formReset}) => {
    const [_accessToken, set_accessToken] =  useRecoilState(storedAccessToken);

    const onClickLogout = () => {
    deleteCookies("refreshToken");
    formReset()
    set_accessToken(null)
  };

  return (
    <>
      <button onClick={onClickLogout}>로그아웃</button>
    </>
  );
};

export default ButtonLogout;
