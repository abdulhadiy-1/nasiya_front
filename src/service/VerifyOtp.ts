import toast from "react-hot-toast";
import instance from "../hooks/instance";
import type { Dispatch, SetStateAction } from "react";

export const VerifyOtpService = (
  data: { otp: string, email: string | undefined },
  setPenning: Dispatch<SetStateAction<boolean>>
) => {
  instance
    .post("/seller/VerifyOtp", data)
    .then((res) => {
      location.pathname = `/update/password/${res.data.data.seller.id}`;
      toast.success("Otp verified");
    })
    .catch((err) => {
      if (err.status == 400) {
        toast.error("xato kod");
      } else {
        toast.error("something went wrong");
      }
    })
    .finally(() => {
      setPenning(false);
    });
};
