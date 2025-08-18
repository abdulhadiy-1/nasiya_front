import toast from "react-hot-toast";
import instance from "../hooks/instance";
import type { Dispatch, SetStateAction } from "react";

export const LoginService = (
  data: { login: string; password: string },
  setCookies: any,
  setPenning: Dispatch<SetStateAction<boolean>>
) => {
  instance.post("/seller/login", data).then((res) => {
    setCookies("accessToken", res.data.data.accessToken);
    setCookies("refreshToken", res.data.data.refreshToken);
    location.pathname ="/"
    toast.success("logged in")
  }).catch(err => {
    if(err.status == 400){
      toast.error("wrong login or password")
    }else{
      toast.error("something went wrong")
      
    }
  }).finally(() => {
    setPenning(false)
  })
};
