import React, { useState } from "react";
import axios from "axios";
import { ButtonHome } from "../../components/ButtonHome";
import { useNavigate } from "react-router-dom";
import checkLoginValid from "../../utils/checkLoginValid";
import { useRecoilState } from "recoil";
import { storedAccessToken } from "../../stores";
import ButtonNavigateMain from "../../components/ButtonNavigateMain";
import ButtonLogout from "../../components/ButtonLogout";

/* 
  [test 계정]
  good@naver.com 
  ID : good 
  비번 : good
*/

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, set_accessToken] = useRecoilState(storedAccessToken);

  const navigate = useNavigate();

  const formReset = () => {
    setPassword("");
    setEmail("");
  };

  const onSubmitLoginFetch = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const { isEmailValid, isPasswordValid } = checkLoginValid(email, password);

    // ✅ 에러메시지 코드 추가 예정

    const isRegisterValid = isEmailValid && isPasswordValid;

    const loginData = {
      email,
      password,
      type: "local",
    };
    console.log("loginData", loginData);
    console.log("isRegisterValid", isRegisterValid);

    if (isRegisterValid) {
      setIsSubmitting(true); // '제출중' 이라는 의미 -> 버튼 비활성화
      console.log("isRegisterValid 통과, axios 보내기");
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/local",
          loginData,
          {
            withCredentials: true,
          }
        );
        console.log("loginAPI 응답", response);

        // 1. accessToken recoil 저장
        set_accessToken(response.data.access_token); // recoil 에 accessToken 저장 | ✅ 이것도 intercept 차원에서 해야할지 고민

        // 2. refreshToken 은 cookies 에 저장하기
        const refreshToken = response.data.refresh_token;
        const inSevenDays = new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24 * 7
        );
        document.cookie = `refreshToken=${refreshToken};expires=${inSevenDays.toUTCString()};path=/`;
        // ;HttpOnly : js 로 접근 못 함. 웹서버로만 접근할 수 있음. | ;Secure : 이건 현재 http 로 통신하기 때문에 뺌.

        if (response) {
          formReset();

          // navigate("/main"); // refreshToken 테스트 위해 잠시 주석
        }
      } catch (error) {
        console.log("onSubmitLoginFetch 에러", error);
      } finally {
        setIsSubmitting(false); // isSubmitting 가 false 면 -> 버튼 활성화 -> 중복제출방지용
      }
    }
  };

  return (
    <div>
      로그인
      <form onSubmit={onSubmitLoginFetch}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ID"
        />

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <input
          type="submit"
          value="카카오 로그인 버튼"
          className="bg-gray-300 cursor-pointer"
          disabled={isSubmitting} // isSubmitting 가 true 면 -> 버튼 비활성화 -> 중복제출방지
        />
      </form>
      <ButtonHome />
      <ButtonNavigateMain />
      <ButtonLogout formReset={formReset} />
      

    </div>
  );
};

export default LoginForm;
