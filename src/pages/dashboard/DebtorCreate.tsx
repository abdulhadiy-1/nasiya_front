import { BackIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/Heading";
import { Button, Input } from "antd";
import UploadImage from "../../components/UploadImage";
import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../hooks/instance";

const DebtorCreate = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<Array<string>>([]);
  const [phones, setPhones] = useState<Array<string>>([""]);
  const [addNote, setAddNote] = useState<boolean>(false);
  const queryClient = useQueryClient()

  const { mutate: createMutate, isPending } = useMutation({
    mutationFn: (data: { name: string; address: string; note?: string }) =>
      instance.post("debtor", data),
    onSuccess: (res) => {
      console.log(res.data);
      instance
        .post("phone-of-debtor", {
          phoneNumber: phones,
          debtorId: res.data.data.id,
        })
        .then(() => {
          if (images.length) {
            instance.post("img-of-debtor", {
              paths: images,
              debtorId: res.data.data.id,
            });
          }
          navigate(-1)
          queryClient.invalidateQueries({queryKey: ["debtors"]})
        });
    },
  });

  function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let data: { name: string; address: string; note?: string } = {
      name: (e.target as HTMLFormElement).createName.value,
      address: (e.target as HTMLFormElement).address.value,
    };
    if (
      (e.target as HTMLFormElement).note &&
      (e.target as HTMLFormElement).note.value
    ) {
      data.note = (e.target as HTMLFormElement).note.value;
    }
    createMutate(data);
  }

  return (
    <div className="containers !mt-[34px]">
      <div className="w-[50%] flex justify-between items-center">
        <button className="cursor-pointer" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <Heading classList="!text-[18px]" tag="h2">
          Mijoz yaratish
        </Heading>
      </div>
      <form onSubmit={handleCreate} className="mt-[24px]">
        <label>
          <Heading tag="h3" classList="!text-[13px] mb-[8px]">
            Ismi *
          </Heading>
          <Input
            required
            name="createName"
            className="!h-[44px] !bg-[#F6F6F6] !font-normal !text-[13px]"
            placeholder="Ismini kiriting"
          />
        </label>
        <div className="mt-[24px]">
          <Heading tag="h3" classList="!text-[13px]">
            Telefon raqami *
          </Heading>
          {phones.map((_, index) => (
            <Input
              required
              key={index}
              onChange={(e) => {
                const newPhones = [...phones];
                newPhones[index] = e.target.value;
                setPhones(newPhones);
              }}
              className="!h-[44px] !rounded-[8px] !my-[8px] !bg-[#F6F6F6] !font-normal !text-[13px]"
              placeholder="Telefon raqami"
            />
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setPhones([...phones, ""])}
              className="text-[#3478F7] text-[14px] font-medium cursor-pointer"
            >
              + Ko‘proq qo‘shish
            </button>
          </div>
        </div>
        <div className="my-[24px]">
          <label>
            <Heading tag="h3" classList="!text-[13px]">
              Yashash manzili
            </Heading>
            <Input
              required
              name="address"
              className="!h-[44px] !rounded-[8px] !my-[8px] !bg-[#F6F6F6] !font-normal !text-[13px]"
              placeholder="Yashash manzilini kiriting"
            />
          </label>
        </div>
        {addNote ? (
          <label>
            <Heading tag="h3" classList="!text-[13px]">
              Eslatma
            </Heading>
            <Input.TextArea
              name="note"
              className="!rounded-[8px] !my-[8px] !bg-[#F6F6F6] !font-normal !text-[13px]"
              placeholder="Eslatma kiriting"
            />
          </label>
        ) : (
          <Button
            onClick={() => setAddNote(true)}
            className="!w-full !h-[42px] !rounded-[8px]"
          >
            Eslatma qo‘shish
          </Button>
        )}
        <div className="mt-[24px]">
          <p className="text-[13px] font-normal mb-[8px]">Rasm biriktirish</p>
          <UploadImage images={images} setImages={setImages} />
        </div>
        <Button
          loading={isPending}
          type="primary"
          className="!w-full !h-[49px] !rounded-[10px] mt-[50px]"
          htmlType="submit"
        >
          Saqlash
        </Button>
      </form>
    </div>
  );
};

export default DebtorCreate;
