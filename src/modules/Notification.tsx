import { useQuery } from "@tanstack/react-query";
import instance from "../hooks/instance";
import type { NotificationType } from "../@types/NotificationType";
import Heading from "../components/Heading";
import { getMonth } from "../hooks/getMonth";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { MessageIcon } from "../assets/icons";
import { useState } from "react";
import { formatTashkent } from "../pages/dashboard/Message";
import { Nodata } from "../assets/images";
import { LoadingOutlined } from "@ant-design/icons";

const formatShortDate = (date: string) => {
  const dateTashkent = formatTashkent(date);
  const day = dateTashkent.format("DD");
  const month = getMonth(+dateTashkent.format("MM") - 1);
  const shortMonth = month.length > 3 ? month.slice(0, 3) : month;
  return `${day} ${shortMonth}`;
};

const Notification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading } = useQuery<NotificationType>({
    queryKey: ["notification"],
    queryFn: () =>
      instance
        .get("/notification", { params: { get: "Sended" } })
        .then((res) => res.data.data),
  });
  const { data: AllNotif, isLoading: AllLoading } = useQuery<NotificationType>({
    queryKey: ["all-notification"],
    queryFn: () =>
      instance
        .get("/notification", { params: { get: "All" } })
        .then((res) => res.data.data),
  });

  const navigate = useNavigate();
  return (
    <>
      <div className="mt-[16px]">
        <ul>
          {isLoading ? (
            <div className="text-3xl mt-[30%] flex items-center justify-center">
              <LoadingOutlined />
            </div>
          ) : data?.notifications.length ? (
            data?.notifications.map((item) => (
              <li
                onClick={() => navigate(item.id)}
                key={item.id}
                className="border-b border-[#ECECEC] py-[16px] flex items-center justify-between cursor-pointer"
              >
                <div className="space-y-[8px]">
                  <Heading tag="h3" classList="!font-bold">
                    {item.name}
                  </Heading>
                  <p className="font-semibold text-[13px] text-[#000000B2]">
                    {item.Phone?.[0] ? item.Phone?.[0]?.phoneNumber : "Unknown"}
                  </p>
                </div>
                <p className="font-semibold text-[12px] text-[#00000092]">
                  {formatShortDate(item.Notification[0].createdAt)}
                </p>
              </li>
            ))
          ) : (
            <div className="h-[100%] w-full flex flex-col mt-[30%] items-center justify-center">
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
        <div className="fixed bottom-[104px] right-[calc(50%-180px)]">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="!px-[16px] !py-[28px] !rounded-full"
            type="primary"
          >
            <MessageIcon />
          </Button>
        </div>
      </div>
      <Modal
        className="!mt-[-50px]"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        okButtonProps={{ hidden: true }}
      >
        <ul className="mt-[20px]">
          {AllLoading ? (
            <div className="text-3xl mt-[30%] flex items-center justify-center">
              <LoadingOutlined />
            </div>
          ) : AllNotif?.notifications.length ? (
            AllNotif?.notifications.map((item) => (
              <li
                onClick={() => navigate(item.id)}
                key={item.id}
                className="border-b border-[#ECECEC] py-[16px] flex items-center justify-between cursor-pointer hover:bg-[#80808040] rounded-[20px] px-[20px]"
              >
                <div className="space-y-[8px]">
                  <Heading tag="h3" classList="!font-bold">
                    {item.name}
                  </Heading>
                  <p className="font-semibold text-[13px] text-[#000000B2]">
                    {item.Phone?.[0] ? item.Phone?.[0]?.phoneNumber : "Unknown"}
                  </p>
                </div>
                <p className="font-semibold text-[12px] text-[#00000092]">
                  {item?.Notification?.[0]
                    ? formatShortDate(item?.Notification?.[0]?.createdAt)
                    : "---"}
                </p>
              </li>
            ))
          ) : (
            <div className="h-[100%] w-full flex flex-col items-center justify-center">
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
      </Modal>
    </>
  );
};

export default Notification;
