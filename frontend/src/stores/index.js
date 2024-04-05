import { atom } from "recoil";

export const storedAccessToken = atom({
    key : "storedAccessToken", 
    default : ""
}) 

export const storedLoginData = atom({
    key : "storedLoginData", 
    default : ""
}) 
