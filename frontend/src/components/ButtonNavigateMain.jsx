import React from 'react'
import { useNavigate } from 'react-router-dom';

const ButtonNavigateMain = () => {
    const navigate = useNavigate()
    const onClickMain = () => {
      navigate("/main");
    };
  return (
    <div>
    <button onClick={onClickMain}> 게시판 메인 페이지 이동</button>
  </div>
  )
}

export default ButtonNavigateMain