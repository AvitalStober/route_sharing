import { Types } from "mongoose";

export interface IAuth{
    email:string,
    password:string,
    otp:string,
    otpExpiration:Date,
}