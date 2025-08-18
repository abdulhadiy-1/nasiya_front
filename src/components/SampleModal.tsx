import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Switch } from "antd";
import { useState, type Dispatch, type SetStateAction } from "react";
import instance from "../hooks/instance";
import type { SampleType } from "../@types/SampleType";
import Heading from "./Heading";

const SampleModal = ({
  setNewMessage,
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setNewMessage: Dispatch<SetStateAction<string>>;
}) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data } = useQuery<SampleType[]>({
    queryKey: ["sample"],
    queryFn: () => instance.get("/sample").then((res) => res.data.data),
  });

  const changeActiveMutation = useMutation({
    mutationFn: (data: { isActive: boolean; id: string }) => {
      setLoadingId(data.id);
      return instance.patch(`/sample/${data.id}`, data);
    },
    onSettled: () => setLoadingId(null),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sample"] }),
  });
  return (
    <Modal
      okButtonProps={{ hidden: true }}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <div className="w-full">
        {data?.length ? (
          <div className="mt-[28px] space-y-[16px]">
            {data.map((item) => (
              <div
                onClick={() => {setNewMessage(item.text), setIsOpen(false)}}
                key={item.id}
                className="p-[16px] rounded-[16px] cursor-pointer space-y-[4px] bg-[#F5F5F5] break-words"
              >
                <div onClick={(e) => e.stopPropagation()} className="w-max">
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
                </div>
                <p className="text-[14px] font-normal">{item.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col mt-[10%] h-full items-center justify-center">
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
    </Modal>
  );
};

export default SampleModal;
