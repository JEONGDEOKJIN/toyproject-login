import React from 'react'
import { useNavigate } from "react-router-dom";



const ButtonNavigateRegister = () => {
    const navigate = useNavigate()
    const onClickRegister = () => {
      navigate("/register");
    };
  return (
    <div>
    <button onClick={onClickRegister}>회원가입 페이지 이동</button>
  </div>  )
}

export default ButtonNavigateRegister