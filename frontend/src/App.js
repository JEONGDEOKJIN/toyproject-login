import "./App.css";
import { Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Main from "./pages/Main.jsx";
import { useEffect, useState } from "react";
import { loggedInState, storedAccessToken } from "./stores/index.js";
import { useRecoilState } from "recoil";
import PrivateRoute from "./components/PrivateRoute.jsx";
import validifyToken from "./utils/validifyToken.js";
import refreshAuth from "./utils/refreshAuth.js";

function App() {
  const [userAccessTokenValid, setUserAccessTokenValid] = useState(false)
  const [_accessToken, set_accessToken] = useRecoilState(storedAccessToken);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);

  useEffect(() => {
    // refreshToken 전달해서, 새로운 accessToken 받고 -> 해당 토큰 valid 검사 -> PrivateRoute 전달
    refreshAuth(set_accessToken).then(validifyToken(_accessToken, setUserAccessTokenValid )).then(setIsLoggedIn(true))
  }, [_accessToken]);
    // _accessToken 있을 때 검사해야 함 | 이걸 안 하면, 비회원도 인가페이지에 접근할 수 있게 됨 
  
  console.log(userAccessTokenValid , "✍✍ userAccessTokenValid") 
  console.log(isLoggedIn , "✍✍ isLoggedIn") 
  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
    
          <Route 
            path="/main"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn} userAccessTokenValid={userAccessTokenValid}>  
              <Main />
            </PrivateRoute>              
            }
            />
        </Routes>
    </div>
  );
}

export default App;