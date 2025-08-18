import { useNavigate } from "react-router-dom";
import { BackIcon, EditIcon } from "../../assets/icons";
import Heading from "../../components/Heading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import type { SellerType } from "../../@types/SellerType";
import { API } from "../../hooks/getEnv";
import { Input, Upload, type UploadProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useState } from "react";
import { UserImg } from "../../assets/images";

const Personal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useQuery<SellerType>({
    queryKey: ["me"],
    queryFn: () => instance.get("/seller/me").then((res) => res.data.data),
  });

  const { mutate } = useMutation({
    mutationFn: (img: string) => instance.patch(`/seller/${data?.id}`, { img }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["get-seller"] });
      toast.success("image updated");

      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      toast.error("something went wrong");
    },
  });

  const handleChange: UploadProps["onChange"] = ({ file }) => {
    setIsLoading(true);
    if (file.status == "done") {
      mutate(file.response.path);
    }
    if (file.status == "error") {
      toast.error("file is too large");
    }
  };
  return (
    <div className="containers !mt-[30px]">
      <div className="w-[70%] flex justify-between items-center">
        <button className="cursor-pointer" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <Heading classList="!text-[18px]" tag="h2">
          Shaxsiy ma’lumotlar
        </Heading>
      </div>
      <div className="flex items-center justify-center mt-[18px]">
        <label className="w-max relative cursor-pointer">
          <Upload
            action={`${API}/upload`}
            listType="picture-card"
            onChange={handleChange}
            showUploadList={false}
          />
          <img
            className={`w-[96px] h-[96px] rounded-full bg-[#E7E7E7]`}
            src={`${API}${data?.img}`}
            alt="seller image"
            width={96}
            height={96}
            onError={(e) => {
              e.currentTarget.src = UserImg;
            }}
          />
          <button className="absolute bottom-0 right-[3.5px] cursor-pointer">
            <EditIcon />
          </button>
          <span
            className={`text-white absolute top-[calc(50%-28px)] left-[calc(50%-15px)] text-3xl ${
              !isLoading && "hidden"
            }`}
          >
            <LoadingOutlined />
          </span>
        </label>
      </div>
      <div className="space-y-[32px] mt-[32px]">
        <div className="space-y-[8px]">
          <p className="text-[13px] font-semibold">Ismi familiya</p>
          <Input
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
            disabled
            value={data?.fullName}
            className="!h-[44px] !bg-[#F6F6F6] !font-normal !text-[13px] !rounded-[8px]"
          />
        </div>
        <div className="space-y-[8px]">
          <p className="text-[13px] font-semibold">Telefon raqam</p>
          <Input
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
            disabled
            value={data?.phoneNumber}
            className="!h-[44px] !bg-[#F6F6F6] !font-normal !text-[13px] !rounded-[8px]"
          />
        </div>
        <div className="space-y-[8px]">
          <p className="text-[13px] font-semibold">Elektron pochta</p>
          <Input
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
            disabled
            value={data?.email}
            className="!h-[44px] !bg-[#F6F6F6] !font-normal !text-[13px] !rounded-[8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Personal;
