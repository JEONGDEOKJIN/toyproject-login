import React, { useEffect, useState } from "react";
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
  const [emailFieldError, setEmailFieldError] = useState(false);
  const [passwordFieldError, setPasswordFieldError] = useState(false);

  const navigate = useNavigate();

  const formReset = () => {
    setPassword("");
    setEmail("");
  };

  const onSubmitLoginFetch = async (e) => {
    e.preventDefault();

    // 유효성 검사
    const { isEmailValid, isPasswordValid } = checkLoginValid(email, password);
    setEmailFieldError(!isEmailValid); // 유효성 정상이면 -> 1) valid 는 true 2) error 는 false 여야
    setPasswordFieldError(!isPasswordValid); // 유효성 정상이면 -> 1) valid 는 true 2) error 는 false 여야

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
          navigate("/main"); // refreshToken 테스트 위해 잠시 주석
        }
      } catch (error) {
        console.log("onSubmitLoginFetch 에러", error);
      } finally {
        setIsSubmitting(false); // isSubmitting 가 false 면 -> 버튼 활성화 -> 중복제출방지용
      }
    }
  };

  return (
    <div className="w-full  max-w-[416px]  flex flex-col gap-6 ">
      <div className="text-[14px]  text-neutral-500 justify-between flex-row flex max-w-[416px] w-full ">
        <ButtonHome />
        <ButtonNavigateMain />
        <ButtonLogout formReset={formReset} />
      </div>

      <h1 className="font-bold text-[24px]">Sign In to DJ</h1>

      <form onSubmit={onSubmitLoginFetch}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col w-full h-[98px] gap-1">
            <label className="text-[15px] font-semibold ml-1">Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // placeholder="ID"
              // className="h-[56px] py-[18px] px-[20px]"
              className={`${
                email && email !== "" ? "bg-neutral-50" : "bg-white"
              } 
              focus:outline-none focus:shadow-searchBox focus:border-searchBoxBorder 
              active:border-gray-50 hover:shadow-searchBox hover:border-black/[.10] 
              transition-all ease-in-out h-[56px] w-full py-[18px] px-[20px] rounded-[12px] border-[1px] border-gray-200`}
            />
            <p className="text-[#f2545b] mx-1 text-[14px]">
              {emailFieldError ? "이메일 형식에 맞게 입력해주세요" : ""}{" "}
            </p>
          </div>

          <div className="flex flex-col w-full h-[98px] gap-1">
            <label className="text-[15px] font-semibold ml-1"> Password </label>
            <input
              name="password"
              type="password"
              value={password}
              style={{ backgroundColor: "transparent" }}
              onChange={(e) => setPassword(e.target.value)}
              // placeholder="password"
              className={`${
                password && password !== "" ? "bg-neutral-50" : "bg-white"
              } 
              focus:outline-none focus:shadow-searchBox focus:border-searchBoxBorder 
              active:border-gray-50 hover:shadow-searchBox hover:border-black/[.10] 
              transition-all ease-in-out h-[56px] w-full py-[18px] px-[20px] rounded-[12px] border-[1px] border-gray-200`}
            />
            <p className="text-[#f2545b] mx-1 text-[14px]">
              {passwordFieldError ? "비밀번호를 입력해주세요" : ""}
            </p>
          </div>

          <div className="flex flex-col w-full h-[56px] gap-1">
            <input
              type="submit"
              value="Log In"
              className="rounded-[50px] text-[15px] cursor-pointer p-[18px] transition-all ease-in-out
                
              hover:border-black/[.10]   hover:bg-gray-500 bg-neutral-900 x-full text-neutral-50"
              disabled={isSubmitting} // isSubmitting 가 true 면 -> 버튼 비활성화 -> 중복제출방지
            />
          </div>
        </div>
      </form>

      <div className="flex justify-center x-full text-[14px] text-neutral-500">
        <p>
          Don't have an account?{" "}
          <a
            href="/register"
            className="underline transition-all hover:font-semibold "
          >
            Sign up
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
