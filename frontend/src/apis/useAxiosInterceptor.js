// import axios from "axios";
// // import { useRecoilValue } from "recoil";
// // import { storedAccessToken } from "../stores";

// const useAxiosInterceptor = () => {
//   //   const accessToken = useGetAccessToken();

//   const axiosInstance = axios.create({
//     baseURL: "https://localhost:3000",
//     // timeout: 1000, // 필요❓❓
//   });

//   axiosInstance.interceptors.request.use(
//     function (config) {
//       // 요청이 전달되기 전 작업을 처리하는 콜백함수

//       config.headers["Content-Type"] = "application/json";
//       config.headers["Authorization"] = `Bearer ${accessToken}`;

//       return config;
//     },
//     function (error) {
//       // 오류가 있는 경우를 처리하는 콜백함수
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default useAxiosInterceptor;
