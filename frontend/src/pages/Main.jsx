import React, { useEffect } from "react";
import ButtonNavigateLogin from "../components/ButtonNavigateLogin";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { storedAccessToken } from "../stores";
import fetchUserInfo from "../apis/fetchUserInfo";
import { useQuery } from "react-query";

const Main = () => {
  const _accessToken = useRecoilValue(storedAccessToken);

  const {
    data: userInfo,
    // isLoading: isUserInfoLoading,
    // error: isUserInfoError,
  } = useQuery("userInfo", () => fetchUserInfo(_accessToken), {
    enabled: !!_accessToken, // accessToken 이 있을 때만, 쿼리 활성화
  });

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
