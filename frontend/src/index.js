import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
);

reportWebVitals();
