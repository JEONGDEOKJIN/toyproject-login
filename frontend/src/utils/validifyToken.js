import { jwtDecode } from "jwt-decode";

const validifyToken = (_accessToken, setUserAccessTokenValid) => {

    const currentTime = Date.now() / 1000; // 초단위로 반환
    
    try {
      const decodedNeWAccessToken = jwtDecode(_accessToken)
      if(decodedNeWAccessToken.exp > currentTime){
        setUserAccessTokenValid(true)
      }else{
        setUserAccessTokenValid(false)
      }
    } catch (error) {
      setUserAccessTokenValid(false) // 뭔가 변조되었을 가능성
      console.log(error, "getTestNewToken 에러")
    }


}

export default validifyToken