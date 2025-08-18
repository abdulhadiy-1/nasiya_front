import { useState } from "react";
import { ArrowIcon } from "../../assets/icons";
import Heading from "../../components/Heading";
import LogoutModal from "../../components/LogoutModal";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const navigate = useNavigate()
  return (
    <>
    <div className="containers !mt-[30px]">
      <div className="px-[16px] pb-[16px] border-b border-[#ECECEC]">
        <Heading tag="h2" classList="!text-[20px]">
          Sozlamalar
        </Heading>
      </div>
      <div className="mt-[28px]">
        <p className="text-[16px] font-medium text-[#3478F7]">Asosiy</p>
        <ul>
          <li onClick={() => navigate("/personal")} className="cursor-pointer py-[18px] flex items-center justify-between">
            <span>Shaxsiy ma’lumotlar</span>
            <ArrowIcon right currentColor />
          </li>
          <li className="cursor-pointer py-[18px] flex items-center justify-between border-y border-[#ECECEC]">
            <span>Xavfsizlik</span>
            <ArrowIcon right currentColor />
          </li>
        </ul>
      </div>
      <div className="mt-[40px]">
        <p className="text-[16px] font-medium text-[#3478F7]">Boshqa</p>
        <ul>
          <li className="cursor-pointer py-[18px] flex items-center justify-between">
            <span>Yordam</span>
            <ArrowIcon right currentColor />
          </li>
          <li className="cursor-pointer py-[18px] flex items-center justify-between border-y border-[#ECECEC]">
            <span>Taklif va shikoyatlar</span>
            <ArrowIcon right currentColor />
          </li>
          <li className="cursor-pointer py-[18px] flex items-center justify-between">
            <span>Dastur haqida</span>
            <ArrowIcon right currentColor />
          </li>
          <li className="cursor-pointer py-[18px] flex items-center justify-between border-y border-[#ECECEC]">
            <span>Ommaviy oferta</span>
            <ArrowIcon right currentColor />
          </li>
          <li className="cursor-pointer py-[18px] flex items-center justify-between">
            <span>Maxfiylik siyosati</span>
            <ArrowIcon right currentColor />
          </li>
          <li onClick={() => setOpenModal(true)} className="cursor-pointer py-[18px] flex items-center justify-between border-y border-[#ECECEC] text-[#F94D4D]">
            <span>Chiqish</span>
            <span className="text-black">
              <ArrowIcon right currentColor />
            </span>
          </li>
        </ul>
      </div>
    </div>
    <LogoutModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Settings;
