import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home";
import Main from "./pages/Main.jsx";
import useCheckAccessTokenValid from "./utils/useCheckAccessTokenValid.js";
import { useEffect, useState } from "react";
import getNewAccessToken from "./apis/getNewAccessToken.js";
import { storedAccessToken } from "./stores/index.js";
import { useRecoilState } from "recoil";

function App() {
  // const userAccessTokenValid = useCheckAccessTokenValid();
  const navigate = useNavigate();
  const [userAccessTokenValid, setUserAccessTokenValid] = useState(false)
  const [_accessToken, set_accessToken] = useRecoilState(storedAccessToken);

    
  const getTestNewToken = async () => {
    const newAccessToken = await getNewAccessToken()
    
    try {
      if(typeof newAccessToken === 'string' && newAccessToken.split('.').length === 3){
        set_accessToken(newAccessToken) // 갈아끼우기
        setUserAccessTokenValid(true)  // 입장하게 하기
      }

      
      else{
        navigate('/login')
      }
    } catch (error) {
      console.log("getTestNewToken" , error)
    } 
  }
  
  useEffect(() => {
    getTestNewToken() 
  }, []);
  
  console.log(userAccessTokenValid , "✍✍ userAccessTokenValid")
  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {userAccessTokenValid === true ? <Route path="/main" element={<Main />} /> : ""}
        </Routes>
    </div>
  );
}

export default App;
