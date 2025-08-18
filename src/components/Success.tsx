import type { Dispatch, SetStateAction } from "react"
import { successImg } from "../assets/images"
import Heading from "./Heading"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"


const Success = ({isOpen, setIsOpen, debtorId}:{isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, debtorId: string | undefined}) => {
  const navigate = useNavigate();

  if(!isOpen) return null
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[999] bg-white flex flex-col justify-center items-center">
        <img className="w-[200] h-[131] mb-[28px]" width={200} height={131} src={successImg} alt="success image" />
        <Heading tag="h1" classList="text-[#3478F7] mb-[12px]">Ajoyib!</Heading>
        <p className="font-medium text-[16px]">Muvaffaqiyatli so‘ndirildi</p>
        <div className=" w-full absolute bottom-[16px] max-w-[375px]">
            <Button onClick={() => {
                navigate(`/debtor/${debtorId}`)
                setIsOpen(false)
            }} type="primary" className="!w-full !h-[42px]">Ortga</Button>
        </div>
    </div>
  )
}

export default Success