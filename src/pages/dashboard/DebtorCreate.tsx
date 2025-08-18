import { BackIcon } from "../../assets/icons";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../components/Heading";
import { Button, Input } from "antd";
import UploadImage from "../../components/UploadImage";
import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import type { SingleDebtorType } from "../../@types/DebtorType";
import toast from "react-hot-toast";

const DebtorCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState<Array<string>>([]);
  const [phones, setPhones] = useState<Array<string>>([""]);
  const [addNote, setAddNote] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [createName, setCreateName] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: debtor } = useQuery<SingleDebtorType>({
    queryKey: ["debtor", id],
    queryFn: () => instance.get(`/debtor/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });

  useEffect(() => {
    if (id) {
      if (debtor) {
        setCreateName(debtor.name);
        setAddress(debtor.address);
        setPhones(
          debtor.Phone.length
            ? debtor.Phone.map((item) => item.phoneNumber)
            : [""]
        );
        setImages(debtor.ImgOfDebtor.map((item) => item.name) || []);
        debtor.note && setNote(debtor.note || ""), setAddNote(true);
      }
    }
  }, [debtor]);

  const { mutate: saveMutate, isPending } = useMutation({
    mutationFn: (data: { name: string; address: string; note?: string }) => {
      if (id) {
        return instance.patch(`/debtor/${id}`, data);
      }
      return instance.post("/debtor", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debtors"] });
      queryClient.invalidateQueries({ queryKey: ["single-debtor"] });
      queryClient.invalidateQueries({ queryKey: ["debtor"] });
      toast.success(`mijoz ${id ? "tahrirlandi" : "yaratildi"}!`);
      navigate(-1);
    },
  });

  function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: {
      name: string;
      address: string;
      note?: string;
      phones?: Array<string>;
      images?: Array<string>;
    } = {
      name: createName,
      address,
      phones,
      images,
    };
    if (note) {
      data.note = note;
    }

    saveMutate(data);
  }

  return (
    <div className="containers !mt-[34px]">
      <div className="w-[50%] flex justify-between items-center">
        <button className="cursor-pointer" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <Heading classList="!text-[18px]" tag="h2">
          Mijoz {id ? "tahrirlash" : "yaratish"}
        </Heading>
      </div>
      <form onSubmit={handleCreate} className="mt-[24px]">
        <label>
          <Heading tag="h3" classList="!text-[13px] mb-[8px]">
            Ismi *
          </Heading>
          <Input
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
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
          {phones.map((item, index) => (
            <Input
              required
              value={item}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
          disabled={!createName || !address}
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
