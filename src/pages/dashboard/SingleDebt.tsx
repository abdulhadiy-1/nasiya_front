import { BackIcon, CalendarIcon, EyeIcon, MenuIcon } from "../../assets/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  DatePicker,
  Image,
  Input,
  Modal,
  Popover,
  Skeleton,
} from "antd";
import Heading from "../../components/Heading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import { useState } from "react";
import type { SingleDebtType } from "../../@types/DebtType";
import dayjs from "dayjs";
import { API } from "../../hooks/getEnv";

const SingleDebt = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<SingleDebtType>({
    queryKey: ["single-debt", id],
    queryFn: () => instance.get(`/debt/${id}`).then((res) => res.data.data),
  });

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: () => instance.delete(`/debt/${id}`),
    onSuccess: () => {
      navigate(-1),
        queryClient.invalidateQueries({ queryKey: ["single-debtor"] });
    },
    onError: (err) => console.log(err),
  });

  const items = (
    <div className="w-[150px] h-[90px] px-[10px] py-[10px] flex flex-col justify-between items-start">
      <button
        className="cursor-pointer text-[14px] font-medium"
        onClick={() => navigate(`/debtor/update/${id}`)}
      >
        Tahrirlash
      </button>
      <div className="w-full h-[1px] bg-[#ECECEC]"></div>
      <button
        onClick={() => {
          setOpen(false), setIsOpenModal(true);
        }}
        className="cursor-pointer text-[14px] font-medium text-[#F94D4D]"
      >
        O‘chirish
      </button>
    </div>
  );
  return (
    <>
      <div className="containers !mt-[30px]">
        <div className="flex items-center justify-between">
          <button className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          {isLoading ? (
            <Skeleton.Node
              active
              className="!w-[200px] !h-[20px] ml-[30px] !rounded-[5px]"
            />
          ) : (
            <Heading classList="!text-[18px]" tag="h2">
              Batafsil
            </Heading>
          )}
          <button className="cursor-pointer">
            <Popover
              placement="bottomRight"
              content={items}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <button className="cursor-pointer">
                <MenuIcon />
              </button>
            </Popover>
          </button>
        </div>
        <div className="flex gap-[12px] mt-[28px]">
          <div className="space-y-[8px] !w-full">
            <Heading classList="!text-[13px]" tag="h3">
              Sana
            </Heading>
            <DatePicker
              style={{ color: "#000", WebkitTextFillColor: "#000" }}
              suffixIcon={<CalendarIcon />}
              value={dayjs(data?.date)}
              disabled
              className="!h-[44px] !w-full !bg-[#F6F6F6] !rounded-[8px]"
            />
          </div>
          <div className="space-y-[8px] w-[89px]">
            <Heading classList="!text-[13px]" tag="h3">
              Sana
            </Heading>
            <Input
              style={{ color: "#000", WebkitTextFillColor: "#000" }}
              disabled
              value={`${data?.date.split("T")[1].split(":")[0]}:${
                data?.date.split("T")[1].split(":")[1]
              }`}
              className="!w-[89px] !h-[44px] !bg-[#F6F6F6] !rounded-[8px]"
            />
          </div>
        </div>
        <div className="mt-[24px]">
          <Heading tag="h3" classList="!text-[13px] mb-[8px]">
            Muddat
          </Heading>
          <Input
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
            disabled
            value={`${data?.term} oy`}
            className="!h-[44px] !bg-[#F6F6F6] !font-normal !text-[13px]"
          />
        </div>
        <div className="mt-[24px] relative">
          <Heading tag="h3" classList="!text-[13px] mb-[8px]">
            Summa miqdori
          </Heading>
          <Input
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
            disabled
            value={data?.totalPayments}
            className="!h-[44px] !bg-[#F6F6F6] !font-normal !text-[13px]"
          />
          <Heading tag="h3" classList="absolute top-[40px] right-[16px]">
            so'm
          </Heading>
        </div>
        <div className="mt-[24px]">
          <Heading tag="h3" classList="!text-[13px] mb-[8px]">
            Eslatma
          </Heading>
          <Input.TextArea
            style={{ color: "#000", WebkitTextFillColor: "#000" }}
            disabled
            value={data?.note}
            className="!h-[44px] !bg-[#F6F6F6] !font-normal !text-[13px]"
          />
        </div>
        <div className="mt-[24px]">
          <Heading tag="h3" classList="!text-[13px] mb-[8px]">
            Rasmlar
          </Heading>
          <div className="flex flex-wrap justify-between">
            {data?.ImgOfDebt.map((item, idx) => (
              <div className="w-[48%] h-[112px] rounded-[16px] overflow-hidden">
                <Image
                  key={idx}
                  src={`${API}${item.name}`}
                  className="!w-[100%] !h-[112px] object-cover"
                  preview={{ mask: <EyeIcon />}}
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          type="primary"
          className="!w-full !h-[49px] !rounded-[10px] mt-[50px] text-[18px] font-medium"
          htmlType="button"
        >
          Nasiyani so‘ndirish
        </Button>
      </div>
      <Modal
        className="!mt-[170px]"
        width={315}
        loading={isPending}
        onOk={() => deleteMutate()}
        title="Aniq o'chirmiqchimisiz?"
        okText="Ochirish"
        cancelText="Bekor qilish"
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
      >
        Ochirilgandan song kayta tiklashning iloji yo'q
      </Modal>
    </>
  );
};

export default SingleDebt;
