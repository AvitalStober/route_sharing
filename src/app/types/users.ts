import { Types } from "mongoose";

export default interface IUser {
  fullName: string;
  password: string;
  email: string;
  address: string;
  googleUser: boolean;
  historyRoutes: [Types.ObjectId];
}
