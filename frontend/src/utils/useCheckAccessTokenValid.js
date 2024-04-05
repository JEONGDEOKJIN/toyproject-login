// import { useRecoilState, useRecoilValue } from "recoil";
// import { storedAccessToken } from "../stores";
// import getNewAccessToken from "../apis/getNewAccessToken";
// import { useEffect, useState } from "react";
// import getRefreshTokenFromCookie from "./getRefreshTokenFromCookie";

// const useCheckAccessTokenValid =  () => {

//   const checkAccessToken = async () => {
//     const access_token = await getNewAccessToken()
//     console.log("access_token" , access_token)
    
//     if( typeof access_token === 'string' && access_token.split(".").length === 3){
//       return true
//     } else {
//       return false
//     }

//   }

//   useEffect( () => {
//     checkAccessToken()
//   } , [])
  

//   // header, payload, signature 구성이 있는지 파악 | 해당 내용이 변조된건지는 백엔드에서
// };

// export default useCheckAccessTokenValid;







// // newAccessToken
// //   ? (testToken = newAccessToken) // 로그인 되어 있다면, refreshToken 으로 새롭게 accessToken 발급 받을 것
// //   : (testToken = _storedAccessToken); // 로그인 안 되어 있다면, 'Bearer undefined' 등이 저장될 것
// // if (
// //   typeof testToken === "string" &&
// //   testToken.trim() !== "" &&
// //   testToken.startsWith("Bearer ")
// // ) {
// //   tokenPart = testToken.slice(7);
// //   setValid(tokenPart.split(".").length === 3); // header, payload, signature 구성이 있는지 파악 | 해당 내용이 변조된건지는 백엔드에서
// // } else {
// //   setValid(false);
// // }
