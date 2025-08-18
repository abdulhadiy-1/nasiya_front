import Heading from "../../components/Heading";
import { SetIcon } from "../../assets/icons";
import { useState } from "react";
import Notification from "../../modules/Notification";
import PaymentHistory from "../../modules/PaymentHistory";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<"notif" | "pay">("notif");
  return (
    <div className="containers">
      <div className="mt-[30px] pb-[18px] border-b border-[#ECECEC] flex items-center justify-between">
        <Heading tag="h1" classList="!text-[20px]">
          Hisobot
        </Heading>
        <button className="cursor-pointer" onClick={() => navigate("/sample")}>
          <SetIcon />
        </button>
      </div>
      <div className="flex p-[4px] mt-[16px] bg-[#F6F6F6] rounded-[8px] relative">
        <div
          className="w-[50%] py-[8.5px] cursor-pointer flex items-center justify-center z-[2]"
          onClick={() => setActivePage("notif")}
        >
          <Heading
            tag="h3"
            classList={`${
              activePage === "notif" ? "!text-[#3478F7]" : "!font-medium"
            }`}
          >
            Xabarlar tarixi
          </Heading>
        </div>
        <div
          className="w-[50%] py-[8.5px] cursor-pointer flex items-center justify-center z-[2]"
          onClick={() => setActivePage("pay")}
        >
          <Heading
            tag="h3"
            classList={`${
              activePage === "pay" ? "!text-[#3478F7]" : "!font-medium"
            }`}
          >
            To‘lovlar tarixi
          </Heading>
        </div>
        <div
          className={`absolute w-[50%] h-[36px] bg-white rounded-[6px] shadow-md ${
            activePage == "pay" && "translate-x-[96%]"
          } duration-300`}
        ></div>
      </div>
      {activePage == "notif" ? <Notification /> : <PaymentHistory />}
    </div>
  );
};

export default Payments;
