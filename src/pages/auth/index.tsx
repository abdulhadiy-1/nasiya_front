import { lazy } from "react";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import UpdatePassword from "./UpdatePassword";
const Login = lazy(() => import("./Login"))

export {Login, SendOtp, VerifyOtp, UpdatePassword}