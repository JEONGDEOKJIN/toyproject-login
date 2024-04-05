import React, { useEffect, useState } from "react";
import ButtonNavigateLogin from "../components/ButtonNavigateLogin";
import getCookie from "../utils/getRefreshTokenFromCookie";
import useAxiosInterceptor from "../apis/useAxiosInterceptor.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { storedAccessToken } from "../stores/index.js";
import getNewAccessToken from "../apis/getNewAccessToken.js";
import refreshAuth from "../utils/refreshAuth.js";
import validifyToken from "../utils/validifyToken.js";

const Main = () => {
  const axiosInstance = useAxiosInterceptor();
  const [_accessToken, set_accessToken] = useRecoilState(storedAccessToken);

  const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 저장할 상태

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/userinfo"); // 사용자 정보 API 경로
      setUserInfo(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error("fetchUserInfo 에러", error);
    }
  };
  
  useEffect(() => {
    fetchUserInfo()
  }, [_accessToken]);
  // 유저 accessToken 변경 -> recoil 저장값 변경 -> useRecoilValue 변경 -> axiosInstance가 변경 -> 함수를 다시 실행


  // useEffect(() => {
  //   // refreshToken 전달해서, 새로운 accessToken 받고 -> 해당 토큰 valid 검사 -> PrivateRoute 전달
  //   refreshAuth(set_accessToken)
  //   // .then(validifyToken(_accessToken, setUserAccessTokenValid ));
  // }, [_accessToken]);
  //   // _accessToken 있을 때 검사해야 함 | 이걸 안 하면, 비회원도 인가페이지에 접근할 수 있게 됨 

  
  return (
    <div>
      <div>Main 페이지</div>

      <div className="p-3 bg-indigo-50">
        유저 프로필
        <p>name : {userInfo && userInfo != null && userInfo.name} </p>
        <p>email : {userInfo && userInfo != null && userInfo.email} </p>
      </div>

      <ButtonNavigateLogin />
    </div>
  );
};

export default Main;

// react query 로 빼기 전 코드
// useEffect(() => {
//   if (_accessToken) fetchUserInfo(_accessToken);
// }, [_accessToken]);

// const fetchUserInfo = async () => {

//   try {
//     await axios.get("http://localhost:3000/user/userinfo", {
//       headers: {
//         Authorization: `Bearer ${_accessToken}`,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// axios.interceptor 로 빼기 전 코드
// const {
//   data: userInfo,
//   // isLoading: isUserInfoLoading,
//   // error: isUserInfoError,
// } = useQuery("userInfo", () => fetchUserInfo(_accessToken), {
//   enabled: !!_accessToken, // accessToken 이 있을 때만, 쿼리 활성화
// });
