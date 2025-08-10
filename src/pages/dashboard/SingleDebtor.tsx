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
import { Button } from "antd";
import { paths } from "../../hooks/paths";
import { PlusOutlined } from "@ant-design/icons";

const SingleDebtor = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: singleDebtor } = useQuery<SingleDebtorType>({
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
  const navigate = useNavigate();
  function getPersent(item: DebtType) {
    if (!item.Payment.length) return 0;
    const paidCount = item.Payment.filter((p) => !p.isActive).length;
    return (paidCount / item.Payment.length) * 100;
  }

  return (
    <div className="containers !mt-[29px]">
      <div className="flex items-center justify-between">
        <div className="w-[50%] flex justify-between items-center">
          <button className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <Heading classList="!text-[18px]" tag="h2">
            {singleDebtor?.name}
          </Heading>
        </div>
        <div className="flex gap-[14px]">
          <button onClick={() => starMutate(singleDebtor?.id || "")}>
            {singleDebtor?.star ? <ActiveStarIcon /> : <StarIcon />}
          </button>
          <button>
            <MenuIcon />
          </button>
        </div>
      </div>
      <div className="py-[18.5px] px-[16px] bg-[#BBD2FC] rounded-[20px] space-y-[4px] mt-[20px]">
        <p className="text-[12px] font-medium">Umumiy nasiya:</p>
        <Heading tag="h1" classList="!text-[22px] !font-extrabold">
          {formatNumber(singleDebtor?.totalAmount || 0)}{" "}
          <span className="!font-semibold">so'm</span>
        </Heading>
      </div>
      <div className="mt-[24px]">
        <Heading tag="h2" classList="!mb-[16px]">
          Faol nasiyalar
        </Heading>
        <div>
          {singleDebtor?.Debt?.map((item) => (
            <div className="bg-[#F6F6F6] p-[16px] rounded-[16px]">
              <div className="flex items-center justify-between mb-[20px]">
                <p className="font-medium text-[14px]">Nov 1, 2024 14:51</p>
                <p className="text-[#3478F7] font-semibold text-[14px]">
                  {formatNumber(item.totalPayments)}{" "}
                  <span className="!font-medium">so'm</span>
                </p>
              </div>
              <p className="font-normal text-[12px]">
                Keyingi to‘lov: {item.nextPayment.date.split("T")[0]}
              </p>
              <Heading tag="h2" classList="!font-extrabold text-[#735CD8]">
                {item.nextPayment.amount}{" "}
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
          ))}
        </div>
      </div>
      <div className="fixed bottom-[80px] left-[calc(50%+45px)] z-50">
        <Button
          onClick={() => navigate(paths.debt_create)}
          type="primary"
          className="!w-[140px] !h-[48px] !rounded-[10px] !text-[16px] !font-medium"
        >
          <PlusOutlined /> Qo‘shish
        </Button>
      </div>
    </div>
  );
};

export default SingleDebtor;
