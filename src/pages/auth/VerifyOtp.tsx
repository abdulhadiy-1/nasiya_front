import { Toaster } from "react-hot-toast";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import { Button, Input } from "antd";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { VerifyOtpSchema } from "../../validation/SendOtp";
import { logo } from "../../assets/images";
import { LoginIcon } from "../../assets/icons";
import { useParams } from "react-router-dom";
import { VerifyOtpService } from "../../service/VerifyOtp";
import { SendOtpService } from "../../service/SendOtp";

const VerifyOtp = () => {
  const { email } = useParams();
  const [isPenning, setPenning] = useState(false);

  const [timer, setTimer] = useState(30);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { otp: "", email },
      validationSchema: VerifyOtpSchema,
      onSubmit: (data) => {
        setPenning(true);
        VerifyOtpService(data, setPenning);
      },
    });

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (timer === 0) {
      SendOtpService({ email }, setPenning);
      setTimer(30);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="containers relative !pt-[90px] h-[100vh]">
        <img
          className="logo-icon mb-[32px]"
          src={logo}
          alt="Logo"
          width={40}
          height={40}
        />
        <Heading tag="h1" classList="!mb-[12px]">
          Parolni yangilash
        </Heading>
        <Text>
          Iltimos, parolni yangilash uchun emailingizga yubiorilgan kodni
          kiriting.
        </Text>
        <form onSubmit={handleSubmit} className="mt-[38px]" autoComplete="off">
          <label>
            <Input
              className={`${
                errors.otp && touched.otp ? "!border-red-500" : ""
              }`}
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              prefix={
                <span
                  className={`${
                    errors.otp && touched.otp ? "!text-red-500" : ""
                  }`}
                >
                  <LoginIcon />
                </span>
              }
              allowClear
              name="otp"
              type="text"
              size="large"
              placeholder="otp"
            />
            {errors.otp && touched.otp && (
              <span className="text-[13px] text-red-500">{errors.otp}</span>
            )}
          </label>

          <Button
            loading={isPenning}
            htmlType="submit"
            className={`w-full !h-[45px] !text-[18px] !font-medium !mt-[30px] ${
              isPenning ? "cursor-not-allowed" : ""
            }`}
            type="primary"
          >
            Submit
          </Button>

          <div className="flex justify-end">
            <Button
              onClick={handleResend}
              htmlType="button"
              disabled={timer > 0}
              className="text-[13px] !w-[200px] mb-[46px] text-[#3478F7] border-b-[1px] border-[#3478F7] ml-auto block text-end mt-[10px]"
            >
              {timer > 0
                ? `Qayta yuborish (${timer}s)`
                : "Kodni qayta yuborish"}
            </Button>
          </div>
        </form>
        <Text classList="bottom-text absolute bottom-0 !font-normal !pb-[10px]">
          Hisobingiz yo'q bo'lsa, tizimga kirish huquqini olish uchun{" "}
          <span className="text-[#3478F7]">do'kon administratori</span> bilan
          bog'laning.
        </Text>
      </div>
    </>
  );
};

export default VerifyOtp;
