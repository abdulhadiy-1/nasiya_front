import { useQuery } from "@tanstack/react-query";
import instance from "../hooks/instance";
import type { HistoryType } from "../@types/HistoryType";
import Heading from "../components/Heading";
import { formatNumber } from "../components/PaymentModal";
import { Nodata } from "../assets/images";
import { LoadingOutlined } from "@ant-design/icons";

const PaymentHistory = () => {
  const { data, isLoading } = useQuery<HistoryType[]>({
    queryKey: ["payment-history"],
    queryFn: () =>
      instance.get("/debt/paymant-history").then((res) => res.data.data),
  });
  const getDate = (iso: string) => iso.split("T")[0];
  function formatDateString(dateStr: string): string {
    const [year, month, day] = dateStr.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
  }

  return (
    <div className="mt-[24px]">
      <ul>
        {isLoading ? (
          <div className="text-3xl mt-[30%] flex items-center justify-center">
            <LoadingOutlined />
          </div>
        ) : data?.length ? (
          data?.map((item, index) => (
            <li key={index}>
              <p
                className={`text-[12px] font-semibold text-[#3478F7] justify-center items-center self-center my-[20px] hidden ${
                  index === 0 ||
                  getDate(data[index - 1].paidAt) !== getDate(item.paidAt)
                    ? "!flex"
                    : ""
                }`}
              >
                {formatDateString(item.paidAt)}
              </p>
              <div className="border-b border-[#ECECEC] py-[16px] flex items-center justify-between">
                <div className="space-y-[8px]">
                  <Heading tag="h3" classList="!font-bold">
                    {item.Debtor.name}
                  </Heading>
                  <p className="font-semibold text-[13px] text-[#000000B2]">
                    {item.Debtor.Phone?.[0]?.phoneNumber}
                  </p>
                </div>
                <p className="font-medium text-[16px]">
                  -{formatNumber(item.amount)}
                </p>
              </div>
            </li>
          ))
        ) : (
          <div className="h-[100%] mt-[30%] w-full flex flex-col items-center justify-center">
            <img
              className="w-[160px] h-[160px]"
              src={Nodata}
              width={160}
              height={160}
              alt="no data img"
            />
            <Heading tag="h2" classList="!text-[18px] mt-[28px]">
              Ma’lumot yo‘q
            </Heading>
          </div>
        )}
      </ul>
    </div>
  );
};

export default PaymentHistory;
