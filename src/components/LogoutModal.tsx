import { type Dispatch, type SetStateAction } from "react";
import { Logout } from "../assets/images";
import Heading from "./Heading";
import { Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../hooks/instance";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [, , delCookie] = useCookies(["accessToken", "refreshToken"]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => instance.post("/seller/logout"),
    onSuccess: () => {
      delCookie("accessToken", { path: "/" });
      delCookie("refreshToken", { path: "/" });
      queryClient.removeQueries();
      toast.success("Logged out");
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <div
      className={`fixed inset-0 z-[99] backdrop-blur-[10px] bg-[#1A1A1A4D] transition-opacity duration-300 ${
        openModal ? "flex" : "hidden"
      }`}
      onClick={() => setOpenModal(false)}
    >
      <div
        className={`absolute bottom-0 w-full bg-white rounded-t-[16px] pt-[27px] transition-transform duration-300 flex flex-col items-center justify-center ${
          openModal ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img className="w-[60px] h-[60px] mb-[16px]" src={Logout} alt="logout" />
        <Heading tag="h2" classList="!text-[18px] !font-bold !mb-[8px]">
          Hisobdan chiqish
        </Heading>
        <p className="font-normal text-[14px]">Siz haqiqatan hisobdan chiqmoqchimisiz?</p>
        <div className="flex gap-[16px] px-[16px] w-full mt-[49px] mb-[20px]">
          <Button
            loading={isPending}
            onClick={() => mutate()}
            className="!h-[42px] !w-full !rounded-[10px] !text-[#3478F7]"
          >
            Ha, chiqish
          </Button>
          <Button
            disabled={isPending}
            onClick={() => setOpenModal(false)}
            className="!h-[42px] !w-full !rounded-[10px] !bg-[#F94D4D] !text-white"
          >
            Bekor qilish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
