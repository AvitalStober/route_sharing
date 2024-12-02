import { Types } from "mongoose";

export default interface IUser{
    fullName:string;
    password:string;
    email:string;
    age:number;
    address:string;
    historyRoutes:[Types.ObjectId];
}