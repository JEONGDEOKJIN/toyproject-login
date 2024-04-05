import React from 'react'
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children, isLoggedIn, userAccessTokenValid  }) => {
  return (
    <>
    { isLoggedIn == true && userAccessTokenValid == true ? children : <Navigate to="/login" replace /> }
    
    {/* store에서 초기화 했으나, 한번에 안 바뀜 
      -> isLoggedIn && userAccessTokenValid : 2개 다 있어야, 로그아웃 했을 때, 빈 껍데기 페이지로 이동 안함 */}
    </>
  )
}

export default PrivateRoute