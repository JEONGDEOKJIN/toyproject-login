import axios from "axios";
import getRefreshTokenFromCookie from "../utils/getRefreshTokenFromCookie";
import { storedAccessToken } from "../stores";
import { useRecoilState } from "recoil";

const getNewAccessToken = async (refreshToken) => {
  // const refreshToken = getRefreshTokenFromCookie("refreshToken");

  try {
    const response = await axios.post(
      "http://localhost:3000/auth/reissue",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const newAccessToken = response.data.access_token
    console.log("getNewAccessToken" , newAccessToken)

    return newAccessToken;
  } catch (error) {
    console.log("getNewAccessToken 에러", error);
  }

};

export default getNewAccessToken;
