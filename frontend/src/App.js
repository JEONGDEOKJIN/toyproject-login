import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home";
import Main from "./pages/Main.jsx";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
        </Routes>

        {/* 새로고침 했을 때, 로그인 유지 테스트  */}
        {/* <GetNewTokenWrapper>
          <Routes>
            <Route path="/main" element={<Main />} />
          </Routes>
        </GetNewTokenWrapper> */}
      </RecoilRoot>
    </div>
  );
}

export default App;
