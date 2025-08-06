import { Button } from "antd"
import { human } from "../../assets/images"
import Heading from "../../components/Heading"
import { EyeIcon, KolendarIcon, PlusIcon, WalletIcon } from "../../assets/icons"
import { useState } from "react"

const Home = () => {
  const [show, setShow] = useState<boolean>(true)
  return (
    <div className="containers !pt-[29px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <img className="rounded-full" src={human} alt="human img" width={40} height={40}/>
          <Heading tag="h2">Testuchun</Heading>
        </div>
        <Button className="!bg-[#EDEDED] !py-[11px] !px-[5px]"><KolendarIcon /></Button>
      </div>
      <div className="bg-[#30AF49] text-white rounded-[20px] flex flex-col items-center justify-between py-[18px] relative mt-[38px]">
        <Heading classList="!text-[20px]" tag="h1">{show ? "135 214 200 so‘m" : "****"}</Heading>
        <Heading tag="h3" classList="!text-[#F6F6F6B2]">Umumiy nasiya:</Heading>
        <button className="absolute right-[20px] top-[37px] cursor-pointer" onClick={() => setShow(!show)}>
          <EyeIcon />
        </button>
      </div>
      <div className="flex gap-[8px] mt-[31px]">
        <div className="p-[16px] rounded-[16px] border-[1px] border-[#ECECEC] w-full h-[127px] pr-[30px] flex flex-col justify-between">
            <Heading tag="h3">Kechiktirilgan to‘lovlar</Heading>
            <Heading tag="h2" classList="!text-[18px] !text-[#F94D4D]">23</Heading>
        </div>
        <div className="p-[16px] rounded-[16px] border-[1px] border-[#ECECEC] w-full h-[127px] pr-[30px] flex flex-col justify-between">
            <Heading tag="h3">Mijozlar soni</Heading>
            <Heading tag="h2" classList="!text-[18px] !text-[#30AF49]">23</Heading>
        </div>
      </div>
      <div className="mt-[40px]">
        <Heading tag="h3" classList="!text-[18px] mb-[26px]">Hamyoningiz</Heading>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="w-[48px] h-[48px] flex bg-[#735CD81A] rounded-full justify-center items-center">
              <WalletIcon />
            </div>
            <div className="space-y-[4px]">
              <p className="text-[13px] font-medium">Hisobingizda</p>
              <Heading tag="h1" classList="!text-[18px]">300 000 so‘m</Heading>
            </div>
          </div>
          <Button type="primary" className="!px-[5px] !rounded-full"><PlusIcon /></Button>
        </div>
        <div className="flex justify-between mt-[28px]">
          <p className="text-[14px] font-medium">Bu oy uchun to‘lov:</p>
          <p className="text-[14px] font-semibold text-[#30AF49]">To‘lov qilingan</p>
        </div>
      </div>
    </div>
  )
}

export default Home