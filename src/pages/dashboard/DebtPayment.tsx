import { useNavigate } from "react-router-dom";
import { ArrowIcon, BackIcon } from "../../assets/icons";
import Heading from "../../components/Heading";
import { useState } from "react";
import PaymentModal from "../../components/PaymentModal";

const DebtPayment = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<"one" | "any" | "many" | null>(
    null
  );

  return (
    <>
      <div className="containers !mt-[30px]">
        <div className="w-[70%] flex justify-between items-center">
          <button className="cursor-pointer" onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <Heading classList="!text-[18px]" tag="h2">
            Nasiyani so‘ndirish
          </Heading>
        </div>
        <Heading classList="!my-[20px]" tag="h2">
          To‘lov
        </Heading>
        <ul className="font-normal text-[14px]">
          <li
            onClick={() => setOpenModal("one")}
            className="cursor-pointer py-[18px] flex items-center justify-between"
          >
            <span>1 oyga so‘ndirish</span>
            <ArrowIcon right currentColor />
          </li>
          <li
            onClick={() => setOpenModal("any")}
            className="cursor-pointer py-[18px] flex items-center justify-between border-y-[1px] border-[#EEEEEE]"
          >
            <span>Har qanday miqdorda so‘ndirish</span>
            <ArrowIcon right currentColor />
          </li>
          <li
            onClick={() => setOpenModal("many")}
            className="cursor-pointer py-[18px] flex items-center justify-between"
          >
            <span>To‘lov muddatini tanlash</span>
            <ArrowIcon right currentColor />
          </li>
        </ul>
      </div>

      <PaymentModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default DebtPayment;
