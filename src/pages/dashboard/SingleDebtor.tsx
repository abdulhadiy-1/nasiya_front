import { useNavigate, useParams } from "react-router-dom";
import {
  ActiveStarIcon,
  BackIcon,
  MenuIcon,
  StarIcon,
} from "../../assets/icons";
import Heading from "../../components/Heading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import type { SingleDebtorType } from "../../@types/DebtorType";
import { formatNumber } from "../../hooks/formatNum";
import type { DebtType } from "../../@types/DebtType";
import { Button, Modal, Popover, Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import toast from "react-hot-toast";

const SingleDebtor = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data: singleDebtor, isLoading } = useQuery<SingleDebtorType>({
    queryKey: ["single-debtor", id],
    queryFn: () => instance.get(`/debtor/${id}`).then((res) => res.data.data),
  });
  const { mutate: starMutate } = useMutation({
    mutationFn: (id: string) => instance.patch(`/debtor/star/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["single-debtor", id] });
      queryClient.invalidateQueries({ queryKey: ["debtors"] });
    },
  });

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: () => instance.delete(`/debtor/${id}`),
    onSuccess: () => {
      toast.success("mijoz ochirildi");
      queryClient.invalidateQueries({ queryKey: ["debtors"] });
      navigate(-1);
    },
    onError: (err) => console.log(err),
  });

  function getPersent(item: DebtType) {
    if (!item?.Payment?.length) return 0;
    const paidCount = item?.Payment?.filter((p) => !p.isActive).length;
    return (paidCount / item?.Payment?.length) * 100;
  }
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

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
      <div className="containers !mt-[29px]">
        <div className="flex items-center justify-between">
          <div className="w-[50%] flex justify-between items-center">
            <button className="cursor-pointer" onClick={() => navigate(-1)}>
              <BackIcon />
            </button>
            {isLoading ? (
              <Skeleton.Node
                active
                className="!w-[170px] !h-[20px] ml-[30px] !rounded-[5px]"
              />
            ) : (
              <Heading classList="!text-[18px]" tag="h2">
                {singleDebtor?.name}
              </Heading>
            )}
          </div>
          <div className="flex gap-[14px]">
            <button
              className="cursor-pointer"
              onClick={() => starMutate(singleDebtor?.id || "")}
            >
              {singleDebtor?.star ? <ActiveStarIcon /> : <StarIcon />}
            </button>
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
        </div>
        <div className="py-[18.5px] px-[16px] bg-[#BBD2FC] rounded-[20px] space-y-[4px] mt-[20px]">
          <p className="text-[12px] font-medium">Umumiy nasiya:</p>
          <Heading tag="h1" classList="!text-[22px] !font-extrabold">
            {isLoading ? (
              <Skeleton.Node active className="!w-[100px] !h-[30px]" />
            ) : (
              <>
                {formatNumber(singleDebtor?.totalAmount || 0)}{" "}
                <span className="!font-semibold">so'm</span>
              </>
            )}
          </Heading>
        </div>
        <div className="mt-[24px]">
          <Heading tag="h2" classList="!mb-[16px]">
            Faol nasiyalar
          </Heading>
          <div className="space-y-[16px]">
            {isLoading ? (
              <>
                <Skeleton.Node
                  active
                  className="!w-full !h-[143px] !rounded-[16px]"
                />
                <Skeleton.Node
                  active
                  className="!w-full !h-[143px] !rounded-[16px]"
                />
                <Skeleton.Node
                  active
                  className="!w-full !h-[143px] !rounded-[16px]"
                />
              </>
            ) : singleDebtor?.Debt.length ? (
              singleDebtor?.Debt?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/debt/${item?.id}`)}
                  className="bg-[#F6F6F6] p-[16px] rounded-[16px] cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-[20px]">
                    <p className="font-medium text-[14px]">Nov 1, 2024 14:51</p>
                    <p className="text-[#3478F7] font-semibold text-[14px]">
                      {formatNumber(item?.totalPayments)}{" "}
                      <span className="!font-medium">so'm</span>
                    </p>
                  </div>
                  <p className="font-normal text-[12px]">
                    Keyingi to‘lov: {item?.nextPayment?.date.split("T")[0]}
                  </p>
                  <Heading tag="h2" classList="!font-extrabold text-[#735CD8]">
                    {formatNumber(item?.nextPayment?.amount || 0)}{" "}
                    <span className="!text-[12px] !font-normal !text-[#726C6C]">
                      so'm
                    </span>
                  </Heading>
                  <div className="my-[16px] h-[8px] bg-[#CCCCCC] rounded-[50px] overflow-hidden">
                    <div
                      className="h-full bg-[#30AF49]"
                      style={{ width: `${getPersent(item)}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-[8px] max-w-[248px] mx-auto mt-[30%] text-center">
                <Heading tag="h2" classList="!font-bold">
                  Mijozda hali nasiya mavjud emas
                </Heading>
                <p className="font-normal text-[14px]">
                  Nasiya yaratish uchun pastdagi “+” tugmasini bosing
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-[80px] left-[calc(50%+45px)] z-50">
          <Button
            onClick={() => navigate(`/debt/create/${singleDebtor?.id}`)}
            type="primary"
            className="!w-[140px] !h-[48px] !rounded-[10px] !text-[16px] !font-medium"
          >
            <PlusOutlined /> Qo‘shish
          </Button>
        </div>
      </div>
      <Modal
        className="!mt-[170px]"
        width={315}
        okButtonProps={{ loading: isPending }}
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

export default SingleDebtor;
