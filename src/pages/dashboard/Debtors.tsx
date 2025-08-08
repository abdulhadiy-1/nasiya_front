import { Dropdown, Input, Select, Space, type MenuProps } from "antd";
import {
  ActiveStarIcon,
  MoreIcon,
  SearchIcon,
  StarIcon,
} from "../../assets/icons";
import Heading from "../../components/Heading";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import type { DebtorAllType } from "../../@types/DebtorAllType";
import { formatNumber } from "../../hooks/formatNum";
import useDebounce from "../../hooks/useDebounce";

const Debtors = () => {
  const [search, setSearch] = useState<string>("");
  const queryClient = useQueryClient();

  const debounced = useDebounce(search, 1000);

  const { mutate: starMutate } = useMutation({
    mutationFn: (id: string) => instance.patch(`/debtor/star/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debtors"] });
    },
  });

  const { data, isLoading } = useQuery<Array<DebtorAllType>>({
    queryKey: ["debtors", debounced],
    queryFn: () =>
      instance
        .get(`/debtor`, {
          params: { search },
        })
        .then((res) => res.data.data),
    enabled: true,
  });
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="">
          <Select />
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
  ];

  return (
    <div className="containers ">
      <div className="sticky top-[0] !p-[14.5px] gap-[15px] flex bg-white">
        <Input
          className="!bg-[#F6F6F6] !py-[12px] !px-[16px] !rounded-[12px] !text-[16px] !font-medium"
          placeholder="Mijozlarni qidirish..."
          prefix={<SearchIcon />}
          allowClear
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="cursor-pointer">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreIcon />
              </Space>
            </a>
          </Dropdown>
        </button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="overflow-y-auto space-y-[16px] mt-[28px]">
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
                  className="cursor-pointer hover:scale-[1.2] duration-300"
                  onClick={() => starMutate(item.id)}
                >
                  {item.star ? <ActiveStarIcon /> : <StarIcon />}
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
      )}
    </div>
  );
};

export default Debtors;
