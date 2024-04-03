import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { storedAccessToken } from "../stores";
import getRefreshTokenFromCookie from "../utils/getRefreshTokenFromCookie";
import { useNavigate } from "react-router-dom";

// accessToken 을 매개변수로 받아서 해보기

const useAxiosInterceptor = () => {
  // const _accessToken = useRecoilValue(storedAccessToken);
  const refreshToken = getRefreshTokenFromCookie("refreshToken");
  const [_accessToken, set_accessToken] = useRecoilState(storedAccessToken);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    // ✅https 로 통신해야, 쿠키값이 오갈 수 있을텐데 😔 | 아님, 설정을 바꾸거나 해야 하나
    // timeout: 1000, // 필요❓❓
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      // 요청이 전달되기 전 작업을 처리하는 콜백함수
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${_accessToken}`;

      return config;
    },
    function (error) {
      // 오류가 있는 경우를 처리하는 콜백함수
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      // 2xx 범위에 있는 상태코드가 트리거하는 함수 | 응답 데이터가 있는 작업 수행
      return response;
    },
    async function (error) {
      // '2xx 범위 이외' 에 있는 상태코드는 이 함수를 트리거 함. | 응답 오류가 있는 작업 수행

      // 토큰 기간 만료 -> refresh 토큰 제출, accessToken 발급, 해당 api 재요청
      if (
        error.response.data.status === 401 &&
        error.response.data.message === "token is expired" &&
        !error.config._retry
      ) {
        try {
          // 0. 추가 요청 방지 위한 설정 | '원래 요청'이 서버응답객체인 error.config 안에 있음
          error.config._retry = true;

          // 1. refresh token 넣어서, accessToken 발급받기 요청
          const response = await axios.post(
            "http://localhost:3000/auth/reissue",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          // 2. 새롭게 받은 accessToken 을 recoil 에 저장 -> 요청 헤더에 들어감
          set_accessToken(response.data.access_token); // recoil 에 accessToken 저장 | ✅ 이것도 intercept 차원에서 해야할지 고민

          // 3. '원래 요청' 의 header 에 새로운 accessToken 넣기 (갈아끼우기)
          error.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;

          // 4. '원래 요청' 재시도
          return axios(error.config);
        } catch (error) {
          console.log(
            "토큰만료(401) 에 따른 refreshToken 제출 통한 accessToken 발행 에러",
            error
          );
        }
      }

      // 로그인 안 하고 입장 시도 -> login 페이지 이동 | 
      // 새로고침하면 -> 401 & token is missing 이 뜸 -> 그래서 토큰 받는 함수로 대체
      if (
        error.response.data.status === 401 &&
        error.response.data.message === "token is missing" &&
        !error.config._retry
      ) {
        try {
          // 0. 추가 요청 방지 위한 설정 | '원래 요청'이 서버응답객체인 error.config 안에 있음
          error.config._retry = true;

          // 1. refresh token 넣어서, accessToken 발급받기 요청
          const response = await axios.post(
            "http://localhost:3000/auth/reissue",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          // 2. 새롭게 받은 accessToken 을 recoil 에 저장 -> 요청 헤더에 들어감
          set_accessToken(response.data.access_token); // recoil 에 accessToken 저장 | ✅ 이것도 intercept 차원에서 해야할지 고민

          // 3. '원래 요청' 의 header 에 새로운 accessToken 넣기 (갈아끼우기)
          error.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;

          // 4. '원래 요청' 재시도
          return axios(error.config);
        } catch (error) {
          console.log(
            "토큰만료(401) 에 따른 refreshToken 제출 통한 accessToken 발행 에러",
            error
          );
        }
      }


      // 토큰 변조 -> refresh 토큰 제출, accessToken 발급, 해당 api 재요청 
        // -> 1) accessToken 나오면 들여보내 2) accessToken 안 나오면, 다시 로그인해서 refreshToken 받으라 해 
      if (
        error.response.data.status === 403 &&
        error.response.data.message === "token is invalid" &&
        !error.config._retry
      ) {
        try {
          // 0. 추가 요청 방지 위한 설정 | '원래 요청'이 서버응답객체인 error.config 안에 있음
          error.config._retry = true;

          // 1. refresh token 넣어서, accessToken 발급받기 요청
          const response = await axios.post(
            "http://localhost:3000/auth/reissue",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          
          if(response.data.access_token && response.data.access_token != null){
            // 2. 새롭게 받은 accessToken 을 recoil 에 저장 -> 요청 헤더에 들어감
            set_accessToken(response.data.access_token); // recoil 에 accessToken 저장 | ✅ 이것도 intercept 차원에서 해야할지 고민
  
            // 3. '원래 요청' 의 header 에 새로운 accessToken 넣기 (갈아끼우기)
            error.config.headers[
              "Authorization"
            ] = `Bearer ${response.data.access_token}`;
  
            // 4. '원래 요청' 재시도
            return axios(error.config);
          }else{
            // accessToken 발급 안 된 경우, 로그인 페이지로 가서, 다시 로그인! 시킴
            navigate('/login')
          }

        } catch (error) {
          console.log(
            "토큰 변조(403) 에 따른 refreshToken 제출 통한 accessToken 발행 에러",
            error
          );
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInterceptor;
