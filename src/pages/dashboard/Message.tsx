import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../hooks/instance";
import type { SingleNotificationType } from "../../@types/NotificationType";
import { BackIcon, MenuIcon, SetIcon } from "../../assets/icons";
import Heading from "../../components/Heading";
import { Input, Modal, Popover } from "antd";
import { getMonth } from "../../hooks/getMonth";
import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import dayjs from "../../service/daysj";
import { Nodata } from "../../assets/images";
import type { AxiosError } from "axios";
import SampleModal from "../../components/SampleModal";
import toast from "react-hot-toast";

export const formatTashkent = (date: string) => dayjs(date).tz("Asia/Tashkent");
const Message = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data } = useQuery<SingleNotificationType>({
    queryKey: ["single-notification", id],
    queryFn: () =>
      instance
        .get(`/notification`, { params: { debtorId: id } })
        .then((res) => res.data.data),
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data?.notifications?.length]);

  const [newMessage, setNewMessage] = useState("");

  const { mutate } = useMutation({
    mutationFn: (message: string) =>
      instance.post("/notification", { message, debtorId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["single-notification"] });
      queryClient.invalidateQueries({ queryKey: ["notification"] });
      queryClient.invalidateQueries({ queryKey: ["all-notification"] });
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: () => instance.delete(`/notification/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["single-notification"] });
      queryClient.invalidateQueries({ queryKey: ["all-notification"] });
      queryClient.invalidateQueries({ queryKey: ["notification"] });
      setIsOpenModal(false)
      navigate(-1)
      toast.success("notification deleted");
    },
    onError: (err: AxiosError) => {
      console.log(err.response?.data);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      mutate(newMessage.trim());
      setNewMessage("");
    }
  };

  const getDate = (iso: string) => iso.split("T")[0];
  const items = (
    <div className="w-[150px] h-[30px] px-[10px] py-[5px] flex flex-col justify-between items-start">
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
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const isNewDate = (index: number) =>
    index === 0 ||
    getDate(data!.notifications[index - 1].createdAt) !==
      getDate(data!.notifications[index].createdAt);

  return (
    <>
      <div className="containers !mt-[30px] flex flex-col h-[calc(100vh-110px)] overflow-hidden">
        <div className="flex justify-between items-center pb-[11px] border-b border-[#ECECEC] shrink-0">
          <button className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <Heading tag="h2" classList="!text-[18px]">
            {data?.debtor?.name}
          </Heading>
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
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto flex flex-col items-end px-[10px]"
        >
          {data?.notifications.length ? (
            data.notifications.map((item, index) => {
              const dateTashkent = formatTashkent(item.createdAt);
              const day = dateTashkent.format("DD");
              const month = getMonth(+dateTashkent.format("MM") - 1);
              const time = dateTashkent.format("HH:mm");

              return (
                <Fragment key={item.id}>
                  {isNewDate(index) && (
                    <p className="text-[12px] font-medium text-[#323F49] self-center my-[16px]">
                      {day} {month}
                    </p>
                  )}
                  <div className="rounded-[16px] p-[16px] text-[13px] font-normal bg-[#F5F5F5] w-max max-w-full mb-[16px] break-words">
                    {item.message}
                    <div className="text-end">
                      <p className="text-[10px] text-[#535353]">{time}</p>
                    </div>
                  </div>
                </Fragment>
              );
            })
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
        </div>

        <div className="py-[8px] border-t border-[#ECECEC] flex gap-[8px] px-[16px]">
          <button className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <SetIcon />
          </button>
          <form className="w-full" onSubmit={handleSubmit}>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="!rounded-[50px] !font-normal !bg-[#F5F5F5] !text-[14px] !h-[42px]"
              placeholder="Xabar yuborish..."
            />
          </form>
        </div>
      </div>
      <SampleModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setNewMessage={setNewMessage}
      />
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

export default Message;
