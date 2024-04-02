import React, { useState } from "react";
import axios from "axios";
import { ButtonHome } from "../../components/ButtonHome";
export const formData = new FormData();

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitLoginFetch = async (e) => {
    e.preventDefault();
    console.log("onSubmitLoginFetch 실행");

    // ✅DB 에 저장된 필드 key 이름 수정
    formData.append("name", e.target.name.value);
    formData.append("password", e.target.password.value);

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // form 객체 확인 콘솔
    }
  
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/login/kakao ",
        formData,
        {
          withCredentails: true,
        }
      );

      console.log("loginAPI 응답", response);
      
      // response 받으면, accessToken 을 recoil 에 저장 -> 저장한 걸 axios 인터셉터 헤더에 넣기


    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      로그인
      <form onSubmit={onSubmitLoginFetch}>
        <input
          name="name" // ✅DB 에 저장된 필드 보고 수정 | name 속성보고 찾아감 : e.target.name.value
          type="text"
          placeholder="ID"
        />

        <input name="password" type="password" placeholder="password" />

        <input
          type="submit"
          value="카카오 로그인 버튼"
          className="bg-gray-300"
          disabled={isSubmitting} // isSubmitting 가 true 면 -> 버튼 비활성화 -> 중복제출방지
        />
      </form>

      <ButtonHome />


    </div>
  );
};

export default LoginForm;
