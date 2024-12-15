import { IAuth } from "@/app/types/auth";
import mongoose, { Model, Schema } from "mongoose";

const authSchema = new Schema<IAuth>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String, default: null },
    otpExpiration: { type: Date, default: null },
  });

const Auth: Model<IAuth> =
mongoose.models.routes || mongoose.model("Auth", authSchema);

export default Auth;
