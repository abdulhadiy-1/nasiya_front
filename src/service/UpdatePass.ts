import toast from "react-hot-toast";
import instance from "../hooks/instance";
import type { Dispatch, SetStateAction } from "react";
import { paths } from "../hooks/paths";

export const UpdatePassService = (
  data: { password: string, id: string | undefined },
  setPenning: Dispatch<SetStateAction<boolean>>
) => {
  instance
    .patch(`/seller/password/${data.id}`, {newPassword: data.password})
    .then(() => {
      location.pathname = paths.login;
      toast.success("Password updated");
    })
    .catch((err) => {
      if (err.status == 400) {
        toast.error("xato parol");
      } else {
        console.log(err);
        
        toast.error("something went wrong");
      }
    })
    .finally(() => {
      setPenning(false);
    });
};
