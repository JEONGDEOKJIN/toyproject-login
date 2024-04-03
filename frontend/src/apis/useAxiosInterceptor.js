import axios from "axios";
import { useRecoilValue } from "recoil";
import { storedAccessToken } from "../stores";

const useAxiosInterceptor = () => {
  const _accessToken = useRecoilValue(storedAccessToken);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    // ✅https 로 통신해야, 쿠키값이 오갈 수 있을텐데 😔 | 아님, 설정을 바꾸거나 해야 하나
    // timeout: 1000, // 필요❓❓
  });

  axiosInstance.interceptors.request.use(
    function (config) {
      // 요청이 전달되기 전 작업을 처리하는 콜백함수
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${_accessToken}`;

      return config;
    },
    function (error) {
      // 오류가 있는 경우를 처리하는 콜백함수
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInterceptor;
