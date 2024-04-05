import getNewAccessToken from "../apis/getNewAccessToken";
import getRefreshTokenFromCookie from "./getRefreshTokenFromCookie";

const refreshAuth = async (set_accessToken) => {
    const _refreshToken = getRefreshTokenFromCookie("refreshToken");

    if(_refreshToken){
        try {
          const newAccessToken = await getNewAccessToken(_refreshToken)
          set_accessToken(newAccessToken)
        } catch (error) {
          console.log("getTestNewToken" , error)
        }
      }

}

export default refreshAuth