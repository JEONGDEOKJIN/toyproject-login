import React, { useEffect } from "react";
import LoginForm from "../contents/Login/LoginForm";
import useCheckAccessTokenValid from "../utils/useCheckAccessTokenValid";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  return (
    <>
      <div className="flex items-center justify-center w-screen min-h-screen bg-white">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
