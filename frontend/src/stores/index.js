import { atom } from "recoil";

export const storedAccessToken = atom({
    key : "storedAccessToken", 
    default : ""
}) 

// 안 쓸 가능성이 높음 📛📛📛 #삭제 예정
export const storedLoginData = atom({
    key : "storedLoginData", 
    default : ""
}) 
