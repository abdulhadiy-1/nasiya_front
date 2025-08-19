import toast from "react-hot-toast";
import instance from "../hooks/instance";
import type { Dispatch, SetStateAction } from "react";

export const SendOtpService = (
  data: { email: string | undefined },
  setPenning: Dispatch<SetStateAction<boolean>>
) => {
  instance
    .post("/seller/sendOtp", data)
    .then(() => {
      if (location.pathname !== `/verify-otp/${data.email}`) {
        location.pathname = `/verify-otp/${data.email}`;
      }
      toast.success("Otp sended");
    })
    .catch((err) => {
      console.log(err);

      if (err.status == 400) {
        toast.error("wrong email");
      } else {
        toast.error("something went wrong");
      }
    })
    .finally(() => {
      setPenning(false);
    });
};
