import React, { useState } from "react";
import axios from "axios";
import { ButtonHome } from "../../components/ButtonHome";
import { useNavigate } from "react-router-dom";
import checkValid from "../../utils/checkValid";

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameFieldError, setNameFieldError] = useState(false);
  const [passwordFieldError, setPasswordFieldError] = useState(false);
  const [emailFieldError, setEmailFieldError] = useState(false);

  const navigate = useNavigate();

  const FormReset = () => {
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
      type : "local"
    };

    if (isRegisterValid) {

      console.log(userData , "userData")

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
          FormReset();
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
    <div>
      Register
      <form onSubmit={onSubmitRegister}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* ✅ 에러메시지보여주기 */}

        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          name="name"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="submit"
          value="submitRegister"
          disabled={isSubmitting} // isSubmitting 가 true 면 -> 버튼 비활성화 -> 중복제출방지
        />
      </form>
      <ButtonHome />
    </div>
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