import { Input } from "antd";
import {
  ActiveStarIcon,
  MoreIcon,
  SearchIcon,
  StarIcon,
} from "../../assets/icons";
import Heading from "../../components/Heading";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import { useCookies } from "react-cookie";
import type { DebtorAllType } from "../../@types/DebtorAllType";
import { formatNumber } from "../../hooks/formatNum";

const Debtors = () => {
  const [active, setActive] = useState<boolean>(false);
  const [cookie] = useCookies(["accessToken"]);
  const [search, setSearch] = useState<string>("");
  const { data } = useQuery<Array<DebtorAllType>>({
    queryKey: ["debtors", search],
    queryFn: () =>
      instance
        .get(`/debtor`, {
          headers: { Authorization: `Bearer ${cookie.accessToken}` },
          params: { search },
        })
        .then((res) => res.data.data),
    enabled: true,
  });

  return (
    <div className="containers !pt-[29px] overflow-hidden">
      <div className="flex gap-[15px]">
        <Input
          className="!bg-[#F6F6F6] !py-[12px] !px-[16px] !rounded-[12px] !text-[16px] !font-medium"
          placeholder="Mijozlarni qidirish..."
          prefix={<SearchIcon />}
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="cursor-pointer">
          <MoreIcon />
        </button>
      </div>
      <div className="overflow-y-auto space-y-[16px] mt-[28px] h-[75vh]">
        {data?.map((item) => (
          <div
            key={item.id}
            className="rounded-[16px] border-[1px] border-[#ECECEC] bg-[#F6F6F6] p-[16px] w-full h-[143px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-[4px]">
                <Heading tag="h2">{item.name}</Heading>
                <p className="font-medium text-[14px] text-[#1A1A1A]">
                  {item?.Phone?.[0]?.phoneNumber || "Unknown"}
                </p>
              </div>
              <button
                className="cursor-pointer"
                onClick={() => setActive(!active)}
              >
                {active ? <ActiveStarIcon /> : <StarIcon />}
              </button>
            </div>
            <div className="space-y-[4px]">
              <p className="font-medium text-[12px] text-[#1A1A1A]">
                Jami nasiya
              </p>
              <Heading tag="h2" classList="text-[#F94D4D]">
                {item?.totalDebt == 0
                  ? `${formatNumber(item?.totalDebt || 0)} so‘m`
                  : `-${formatNumber(item?.totalDebt || 0)} so‘m`}
              </Heading>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Debtors;
