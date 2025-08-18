import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import Heading from "./Heading";
import { getMonth } from "../hooks/getMonth";
import { Button, Checkbox, Input } from "antd";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../hooks/instance";
import type { SingleDebtType } from "../@types/DebtType";
import Success from "./Success";
import type { PaymentType } from "../@types/PaymentType";

export function formatNumber(num: number | string): string {
  const cleanNum = String(num).replace(/\D/g, "");
  return cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const PaymentModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: "one" | "any" | "many" | null;
  setOpenModal: Dispatch<SetStateAction<"one" | "any" | "many" | null>>;
}) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [checkedPays, setCheckedPays] = useState<PaymentType[]>([]);
  const { data: singleDebt } = useQuery<SingleDebtType>({
    queryKey: ["single-debt"],
    queryFn: () => instance.get(`/debt/${id}`).then((res) => res.data.data),
    enabled: !!id && !!openModal,
  });

  function formatDate(input: string): string {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    if (openModal) {
      setIsMounted(true);
    } else {
      const timeout = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [openModal]);

  const { mutate: oneMonthPay, isPending: oneMonthPending } = useMutation({
    mutationFn: () => instance.post("/debt/oneMonth", { debtId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["single-debtor"] });
      queryClient.invalidateQueries({ queryKey: ["single-debt"] });
      queryClient.invalidateQueries({ queryKey: ["get-seller"] });
      setIsOpen(true);
    },
  });

  const { mutate: anyCountityPay, isPending: anyCountityPending } = useMutation(
    {
      mutationFn: () =>
        instance.post("/debt/anyQuantity", { debtId: id, amount: +amount }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["single-debtor"] });
        queryClient.invalidateQueries({ queryKey: ["single-debt"] });
        queryClient.invalidateQueries({ queryKey: ["get-seller"] });

        setIsOpen(true);
      },
    }
  );

  const { mutate: manyMonthPay, isPending: manyMonthPending } = useMutation({
    mutationFn: () =>
      instance.post("/debt/manyMonth", {
        debtId: id,
        months: [...checkedPays.map((item) => item.month)],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["single-debtor"] });
      queryClient.invalidateQueries({ queryKey: ["single-debt"] });
      queryClient.invalidateQueries({ queryKey: ["get-seller"] });

      setIsOpen(true);
    },
  });

  function toggleCheck(payment: PaymentType) {
    const check = checkedPays.find((item) => item.id == payment.id);
    if (check) {
      setCheckedPays(checkedPays.filter((item) => item !== check));
    } else {
      setCheckedPays([...checkedPays, payment]);
    }
  }
  console.log(BigInt(amount));

  if (!isMounted) return null;
  return (
    <>
      <div
        className={`fixed inset-0 z-[99] backdrop-blur-[10px] bg-[#1A1A1A4D] transition-opacity duration-300 ${
          openModal ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpenModal(null)}
      >
        <div
          className={`absolute bottom-0 w-full bg-white rounded-t-[16px] pt-[20px] transition-transform duration-300 ${
            openModal ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setOpenModal(null)}
            className={`${
              openModal ? "opacity-100" : "opacity-0"
            } absolute bg-white px-[16px] py-[12px] text-[16px] top-[-60px] right-[16px] rounded-full`}
          >
            <CloseOutlined />
          </button>
          <div
            className={`${openModal ? "opacity-100" : "opacity-0"} containers`}
          >
            {openModal === "one" && (
              <div>
                <Heading tag="h1" classList="!text-[20px]">
                  1 oy uchun so‘ndirish
                </Heading>
                <div className="rounded-[16px] p-[16px] bg-[#DDE9FE] mt-[32px]">
                  <Heading
                    classList="!text-[#3478F7] !text-[24px] !mb-[4px]"
                    tag="h1"
                  >
                    {formatNumber(singleDebt?.Payment[0]?.amount || 0)} so'm
                  </Heading>
                  <p className="text-[14px] font-medium">
                    {getMonth(
                      Number(
                        singleDebt?.Payment[0]?.date
                          ?.split("T")[0]
                          .split("-")[1]
                      ) - 1
                    )}{" "}
                    oyi uchun so‘ndiriladi
                  </p>
                </div>
                <Button
                  onClick={() => oneMonthPay()}
                  loading={oneMonthPending}
                  type="primary"
                  className="!w-full !text-[14px] !font-medium !h-[42px] !rounded-[10px] mb-[16px] mt-[200px]"
                >
                  1 oylik uchun so‘ndirish
                </Button>
              </div>
            )}
            {openModal === "any" && (
              <div>
                <Heading tag="h1" classList="!text-[20px] mb-[32px]">
                  Har qanday miqdorda so‘ndirish
                </Heading>
                <p className="text-[13px] font-semibold mb-[8px]">
                  Miqdorni kiriting *
                </p>
                <Input
                  allowClear
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setAmount(val);
                    }
                  }}
                  type="text"
                  className="!h-[44px]"
                  placeholder="To‘lov miqdori"
                />
                <Button
                  onClick={() => anyCountityPay()}
                  loading={anyCountityPending}
                  disabled={!+amount}
                  type="primary"
                  className="!w-full !text-[14px] !font-medium !h-[42px] !rounded-[10px] mb-[16px] mt-[200px]"
                >
                  So‘ndirish
                </Button>
              </div>
            )}
            {openModal === "many" && (
              <div>
                <Heading tag="h1" classList="!text-[20px] mb-[22px]">
                  To‘lov muddatini tanlang
                </Heading>
                <div className="flex items-center justify-between mb-[20px]">
                  <div className="space-y-[4px]">
                    <p className="text-[14px] font-medium">So‘ndirish:</p>
                    <Heading classList="!font-bold text-[#3478F7]" tag="h2">
                      {checkedPays
                        .reduce((acc, p) => acc + p.amount, 0)
                        .toFixed(2)}{" "}
                      so‘m
                    </Heading>
                  </div>
                  <Button
                    onClick={() => {
                      if (singleDebt?.Payment?.length) {
                        setCheckedPays((prev) => {
                          if (prev.length === singleDebt.Payment.length) {
                            return [];
                          }
                          const newItems = singleDebt.Payment.filter(
                            (p) =>
                              !prev.some((existing) => existing.id === p.id)
                          );
                          return [...prev, ...newItems];
                        });
                      }
                    }}
                    type="link"
                    className="!text-[14px] !font-bold !text-[#3478F7]"
                  >
                    Hammasini tanlang
                  </Button>
                </div>
                <ul>
                  {singleDebt?.Payment?.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => toggleCheck(item)}
                      className="py-[16px] flex items-center justify-between border-y-[1px] border-[#ECECEC] cursor-pointer"
                    >
                      <div className="space-y-[4px]">
                        <p className="text-[12px] font-medium">
                          {item.month}-oy
                        </p>
                        <p className="text-[14px] font-semibold">
                          {formatDate(item.date)}
                        </p>
                      </div>
                      <div className="flex gap-[12px] items-center">
                        <Heading tag="h3" classList="!font-bold">
                          {formatNumber(item.amount)} so‘m
                        </Heading>
                        <Checkbox checked={checkedPays.includes(item)} />
                      </div>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => manyMonthPay()}
                  loading={manyMonthPending}
                  disabled={!checkedPays.length}
                  type="primary"
                  className="!w-full !text-[14px] !font-medium !h-[42px] !rounded-[10px] my-[16px]"
                >
                  So‘ndirish
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Success
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        debtorId={singleDebt?.Debtor.id}
      />
    </>
  );
};

export default PaymentModal;
