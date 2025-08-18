import { Button, Modal, Popover, Switch } from "antd";
import { BackIcon, MenuIcon } from "../../assets/icons";
import Heading from "../../components/Heading";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import type { SampleType } from "../../@types/SampleType";
import { useState } from "react";
import toast from "react-hot-toast";

const Sample = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const { data } = useQuery<SampleType[]>({
    queryKey: ["sample"],
    queryFn: () => instance.get("/sample").then((res) => res.data.data),
  });

  const handleOpenChange = (id: string, newOpen: boolean) => {
    setOpenId(newOpen ? id : null);
  };

  const changeActiveMutation = useMutation({
    mutationFn: (data: { isActive: boolean; id: string }) => {
      setLoadingId(data.id);
      return instance.patch(`/sample/${data.id}`, data);
    },
    onSettled: () => setLoadingId(null),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sample"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => instance.delete(`/sample/${id}`),
    onSuccess: () => {
      toast.success("O‘chirildi");
      queryClient.invalidateQueries({ queryKey: ["sample"] });
      setIsOpenModal(false);
    },
  });

  const getPopoverContent = (id: string) => (
    <div className="w-[150px] h-[90px] px-[10px] py-[10px] flex flex-col justify-between items-start">
      <button
        className="cursor-pointer text-[14px] font-medium"
        onClick={() => navigate(`create/${id}`)}
      >
        Tahrirlash
      </button>
      <div className="w-full h-[1px] bg-[#ECECEC]"></div>
      <button
        onClick={() => {
          setDeleteId(id);
          setIsOpenModal(true);
          setOpenId(null);
        }}
        className="cursor-pointer text-[14px] font-medium text-[#F94D4D]"
      >
        O‘chirish
      </button>
    </div>
  );

  return (
    <>
      <div className="containers">
        <div className="pb-[11px] mt-[30px] border-b border-[#ECECEC]">
          <div className="w-[65%] flex justify-between items-center">
            <button className="cursor-pointer" onClick={() => navigate(-1)}>
              <BackIcon />
            </button>
            <Heading classList="!text-[18px]" tag="h2">
              Namunalar
            </Heading>
          </div>
        </div>

        <div className="w-full">
          {data?.length ? (
            <div className="mt-[28px] space-y-[16px]">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="p-[16px] rounded-[16px] space-y-[4px] bg-[#F5F5F5] break-words"
                >
                  <div className="flex items-center justify-between">
                    <Switch
                      loading={loadingId === item.id}
                      checked={item.isActive}
                      onChange={(e) =>
                        changeActiveMutation.mutate({
                          isActive: e.valueOf(),
                          id: item.id,
                        })
                      }
                    />
                    <Popover
                      placement="bottomRight"
                      content={() => getPopoverContent(item.id)}
                      trigger="click"
                      open={openId === item.id}
                      onOpenChange={(open) => handleOpenChange(item.id, open)}
                    >
                      <button className="cursor-pointer">
                        <MenuIcon />
                      </button>
                    </Popover>
                  </div>
                  <p className="text-[14px] font-normal">{item.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col mt-[60%] h-full items-center justify-center">
              <Heading classList="mb-[8px]" tag="h2">
                Mavjud namunalar yo‘q
              </Heading>
              <p className="text-[13px] font-semibold">
                “Qo‘shish”{" "}
                <span className="!font-normal">
                  tugmasi orqali namuna yarating
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="fixed !bottom-[70px] z-50 max-w-[368px] w-full px-[16px] mx-auto !py-[10px] bg-white">
          <Button
            onClick={() => navigate("create")}
            type="primary"
            className="!w-full !h-[49px] !rounded-[10px]"
          >
            <PlusOutlined /> Qo‘shish
          </Button>
        </div>
      </div>

      <Modal
        className="!mt-[170px]"
        width={315}
        confirmLoading={deleteMutation.isPending}
        onOk={() => deleteId && deleteMutation.mutate(deleteId)}
        title="Aniq o'chirmiqchimisiz?"
        okText="O‘chirish"
        cancelText="Bekor qilish"
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
      >
        Ochirilgandan song kayta tiklashning iloji yo'q
      </Modal>
    </>
  );
};

export default Sample;
