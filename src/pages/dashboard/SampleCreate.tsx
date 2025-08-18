import { Button, Input } from "antd";
import { BackIcon } from "../../assets/icons";
import Heading from "../../components/Heading";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import type { SampleType } from "../../@types/SampleType";
import toast from "react-hot-toast";

const SampleCreate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [text, setText] = useState<string>("");

  const { data } = useQuery<SampleType>({
    queryKey: ["single-sample", id],
    queryFn: () => instance.get(`/sample/${id}`).then((res) => res.data.data),
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.text) setText(data.text);
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (id) {
        return instance.patch(`/sample/${id}`, { text });
      } else {
        return instance.post("/sample", { text });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sample"] });
      queryClient.invalidateQueries({ queryKey: ["single-sample"] });
      toast.success(id ? "Namuna tahrirlandi" : "Namuna yaratildi");
      navigate(-1);
    },
  });

  return (
    <div className="containers">
      <div className="pb-[11px] mt-[30px] border-b border-[#ECECEC]">
        <div className="w-[65%] flex justify-between items-center">
          <button className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <Heading classList="!text-[18px]" tag="h2">
            Namuna {id ? "tahrirlash" : "yaratish"}
          </Heading>
        </div>
      </div>

      <div className="mt-[40px]">
        <p className="text-[13px] font-semibold mb-[8px]">Namuna</p>
        <Input.TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Matn yozish..."
          rows={4}
          className="!bg-[#F6F6F6]"
        />
      </div>

      <div className="fixed !bottom-[70px] z-50 max-w-[368px] w-full px-[16px] mx-auto !py-[10px] bg-white">
        <Button
          onClick={() => mutate()}
          loading={isPending}
          disabled={!text.trim()}
          type="primary"
          className="!w-full !h-[49px] !rounded-[10px]"
        >
          {id ? "Tahrirlash" : "Yaratish"}
        </Button>
      </div>
    </div>
  );
};

export default SampleCreate;
