import React, { Children, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getNewAccessToken from "../apis/getNewAccessToken";

const GetNewTokenWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 페이지 변경 감지

  useEffect(() => {
    const checkTokenAndRefresh = async () => {
      try {
        await getNewAccessToken();
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    checkTokenAndRefresh();
  }, [navigate, location]); // location 이 변경될 때 마다 실행
  /*  location 객체에는 pathname ex) /logn | 쿼리스트링 '?name = john' 등의 프로퍼티가 있음. 
  실제 사용자의 움직임으로 페이지가 이동하면 - 하위 프로퍼티 값이 변경되어서 - wrapper 가 실행됨
    */

  return <> {children}</>;
};

export default GetNewTokenWrapper;
