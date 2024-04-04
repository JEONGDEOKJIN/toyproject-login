import React, { useState } from "react";
import axios from "axios";
import { ButtonHome } from "../../components/ButtonHome";
import { useNavigate } from "react-router-dom";
import checkValid from "../../utils/checkValid";
import ButtonNavigateMain from "../../components/ButtonNavigateMain";
import ButtonLogout from "../../components/ButtonLogout";

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameFieldError, setNameFieldError] = useState(false);
  const [passwordFieldError, setPasswordFieldError] = useState(false);
  const [emailFieldError, setEmailFieldError] = useState(false);

  const navigate = useNavigate();

  const formReset = () => {
    setName("");
    setPassword("");
    setEmail("");
  };

  // onSubmit 이벤트 발생시 POST 요청 보내기
  const onSubmitRegister = async (e) => {
    e.preventDefault();

    // 유효성 검사 | ✅ 로직 보완
    const { isNameValid, isPasswordValid, isEmailValid } = checkValid(
      name,
      password,
      email
    );
    setNameFieldError(!isNameValid); // // 에러메시지 보여주기 위함 : isNameValid 가 true 면 -> Error 메시지 안 보임 (false)
    setPasswordFieldError(!isPasswordValid);
    setEmailFieldError(!isEmailValid);
    const isRegisterValid = isNameValid && isPasswordValid && isEmailValid;
    console.log("isRegisterValid", isRegisterValid);

    const userData = {
      email,
      password,
      name,
      type: "local",
    };

    if (isRegisterValid) {
      console.log(userData, "userData");

      setIsSubmitting(true); // isSubmitting 가 true 면 -> 버튼 비활성화 -> 중복제출방지

      try {
        const response = await axios.post(
          "http://localhost:3000/user/register",
          userData,
          {
            withCredentials: true,
          }
        );

        console.log("registerAPI 응답", response);

        // ✅ 회원가입이 성공이면 로그인 페이지로 이동
        // if(response && response.status === 200) navigate('/login')
        if (response) {
          formReset();
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
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
      </div>

      <h1 className="font-bold text-[24px]">Sign up to DJ </h1>

      <form onSubmit={onSubmitRegister}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full h-[98px] gap-1">
            <label className="text-[15px] font-semibold ml-1">Email</label>
            <input
              name="email"
              type="email"
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
          </div>

          <div className="flex flex-col w-full h-[98px] gap-1">
            <label className="text-[15px] font-semibold ml-1"> Name </label>
            <input
              name="name"
              type="name"
              value={name}
              style={{ backgroundColor: "transparent" }}
              onChange={(e) => setName(e.target.value)}
              // placeholder="password"
              className={`${name && name !== "" ? "bg-neutral-50" : "bg-white"} 
              focus:outline-none focus:shadow-searchBox focus:border-searchBoxBorder 
              active:border-gray-50 hover:shadow-searchBox hover:border-black/[.10] 
              transition-all ease-in-out h-[56px] w-full py-[18px] px-[20px] rounded-[12px] border-[1px] border-gray-200`}
            />
          </div>

          <div className="flex flex-col w-full h-[56px] gap-1">
            <input
              type="submit"
              value="Create Account"
              className="rounded-[50px] text-[15px] cursor-pointer p-[18px] transition-all ease-in-out
                
              hover:border-black/[.10]   hover:bg-gray-500 bg-neutral-900 x-full text-neutral-50"
              disabled={isSubmitting} // isSubmitting 가 true 면 -> 버튼 비활성화 -> 중복제출방지
            />
          </div>
        </div>
      </form>
    </div>

    // <div>
    //   Register
    //   <form onSubmit={onSubmitRegister}>

    // 1️⃣ 이메일
    //     <input
    //       name="email"
    //       type="email"
    //       placeholder="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     {/* ✅ 에러메시지보여주기 */}

    // 2️⃣ 비밀번호
    //     <input
    //       name="password"
    //       type="password"
    //       placeholder="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />

    // 3️⃣ 이름
    //     <input
    //       name="name"
    //       type="text"
    //       placeholder="name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />

    //     <input
    //       type="submit"
    //       value="submitRegister"
    //       disabled={isSubmitting} // isSubmitting 가 true 면 -> 버튼 비활성화 -> 중복제출방지
    //     />
    //   </form>
    //   <ButtonHome />
    // </div>
  );
};

export default RegisterForm;

// 유효성 검사
// const isNameValid = name != null && name.trim() != "";
// setNameFieldError(!isNameValid); // isNameValid 가 true 면 -> Error 메시지 안 보임 (false)
// const isPasswordValid = password != null && name.trim() != "";
// setPasswordFieldError(!isPasswordValid);

// const emailValidRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 비어있지 않고, 정규식 통과하면 true
// const isEmailValid =
//   email !== null &&
//   email.trim() !== "" &&
//   emailValidRegex.test(email.trim()); // 비어있지 않고, 정규식 통과하면 true
// setEmailFieldError(!isEmailValid);

// const isRegisterValid = isNameValid && isPasswordValid && isEmailValid;

// checkValid(
//   name,
//   password,
//   email,
//   setNameFieldError,
//   setPasswordFieldError,
//   setEmailFieldError,
//   setIsRegisterValid
// );

// formData.append("email", email); // input 의 name 속성으로 찾아옴
// formData.append("password", password);
// formData.append("name", name);
// formData.append("type", "local");

// for (let [key, value] of formData.entries()) {
//   console.log(key, value); // form 객체 확인 콘솔
// }
