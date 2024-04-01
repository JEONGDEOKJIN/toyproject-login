import React from 'react'
import { useNavigate } from 'react-router-dom'


export const ButtonHome = () => {

    const navigate = useNavigate()

    const onClickHome = () => {
        navigate('/')
    }

  return (
    <button onClick={onClickHome}>
        Home 으로 가기
    </button>
    
  )
}
