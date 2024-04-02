import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



  // onSubmit 이벤트 발생시 POST 요청 보내기
  const useSubmitRegister = async (e) => {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const FormReset = () => {
        setName("");
        setPassword("");
        setEmail("");
      };


    const formData = new FormData();
    e.preventDefault();
    console.log("onSubmitRegister 실행");

    // ✅ 유효성
    formData.append("email", e.target.email.value); // input 의 name 속성으로 찾아옴
    formData.append("password", e.target.password.value);
    formData.append("name", e.target.name.value);

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // form 객체 확인 콘솔
    }

    setIsSubmitting(true); // isSubmitting 가 true 면 -> 버튼 비활성화 -> 중복제출방지

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        formData,
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
  };




export default useSubmitRegister;
