import React, { useState } from "react";
import axios from "axios";
import { ButtonHome } from "../../components/ButtonHome";
export const formData = new FormData();

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitRegisterFetch = async (e) => {
    e.preventDefault();
    console.log("onSubmitRegisterFetch 실행");

    formData.append("email", e.target.email.value); // input 의 name 속성으로 찾아옴
    formData.append("password", e.target.password.value);
    formData.append("name", e.target.name.value);

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // form 객체 확인 콘솔
    }

    setIsSubmitting(true); // 중복 제출 방지 위한 상태관리

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        formData,
        {
          withCredentails: true,
        }
      );

      console.log("registerAPI 응답", response);

      if (response) setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Register
      <form onSubmit={onSubmitRegisterFetch}>

        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input name="name" type="text" placeholder="name" />
        {/* 'name 속성' 과 'e.target.email' 이 일치해야 함  */}

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
