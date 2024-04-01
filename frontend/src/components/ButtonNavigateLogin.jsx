import React from 'react'
import { useNavigate } from "react-router-dom";


const ButtonNavigateLogin = () => {
  const navigate = useNavigate()
  const onClickLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div>
        <button onClick={onClickLogin}>로그인 페이지 이동</button>
      </div>
    </>
  )
}

export default ButtonNavigateLogin