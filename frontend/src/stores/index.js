import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();


export const storedAccessToken = atom({
    key : "storedAccessToken", 
    default : "",
    effects_UNSTABLE: [persistAtom] // recoil-persist를 사용하여 로컬 스토리지에 저장

}) 
export const loggedInState = atom({
    key : "loggedInState", 
    default : false,
    effects_UNSTABLE: [persistAtom] // recoil-persist를 사용하여 로컬 스토리지에 저장

}) 

// 안 쓸 가능성이 높음 📛📛📛 #삭제 예정
export const storedLoginData = atom({
    key : "storedLoginData", 
    default : ""
}) 
