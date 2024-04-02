import useAxiosInterceptor from "./useAxiosInterceptor";

const fetchUserInfo = async (_accessToken) => {
  // const axiosInstance = useAxiosInterceptor()

  try {
    const response = await useAxiosInterceptor.get("/user/userinfo");

    if (response) return response.data; // axios 설계상, 실제 응답 본문을 data 에 담기 때문 | response.data 으로 '응답 본문'에 접근하면, 바로 받을 수 있어.
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserInfo;

// 기존 axios 코드
// const fetchUserInfo = async (_accessToken) => {
//   try {
//     const response = await axios.get("http://localhost:3000/user/userinfo", {
//       headers: {
//         Authorization: `Bearer ${_accessToken}`,
//       },
//     });

//     if (response) return response.data; // axios 설계상, 실제 응답 본문을 data 에 담기 때문 | response.data 으로 '응답 본문'에 접근하면, 바로 받을 수 있어.
//   } catch (error) {
//     console.log(error);
//   }
// };
