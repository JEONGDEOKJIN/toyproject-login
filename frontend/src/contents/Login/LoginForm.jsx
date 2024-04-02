import React, { useState } from "react";
import axios from "axios";
import { ButtonHome } from "../../components/ButtonHome";
import { useNavigate } from "react-router-dom";
import checkLoginValid from "../../utils/checkLoginValid";

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

  const navigate = useNavigate();

  const FormReset = () => {
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
            withCredentails: true,
          }
        );
        console.log("loginAPI 응답", response);
          // console.log("accessToken", response.data.access_token); // accessToken 받아짐 🔵 
          // console.log("refresh_token", response.data.refresh_token); // refreshToken 받아짐 🔵

        // 1. 우선, 여기에서 accesstoken 을 recoil 에 저장하고 
        

        // 2. refreshToken 은 cookies 에 저장하기 


        if (response) {
          FormReset();
          navigate("/main");
        }

        // response 받으면, accessToken 을 recoil 에 저장 -> 저장한 걸 axios 인터셉터 헤더에 넣기
      } catch (error) {
        console.log(error);
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
    </div>
  );
};

export default LoginForm;
