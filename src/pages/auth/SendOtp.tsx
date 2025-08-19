import { Toaster } from "react-hot-toast";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import { Button, Input } from "antd";
import { useState } from "react";
import { useFormik } from "formik";
import { SendOtpService } from "../../service/SendOtp";
import { SendOtpSchema } from "../../validation/SendOtp";
import { logo } from "../../assets/images";
import { LoginIcon } from "../../assets/icons";

const SendOtp = () => {
  const [isPenning, setPenning] = useState(false);
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: ""},
      validationSchema: SendOtpSchema,
      onSubmit: (data) => {
        setPenning(true);
        SendOtpService(data, setPenning);
      },
    });
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
          Iltimos, parolni yangilash uchun email kiriting.
        </Text>
        <form onSubmit={handleSubmit} className="mt-[38px]" autoComplete="off">
          <label>
            <Input
              className={`${
                errors.email && touched.email ? "!border-red-500" : ""
              }`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              prefix={
                <span
                  className={`${
                    errors.email && touched.email ? "!text-red-500" : ""
                  }`}
                >
                  <LoginIcon />
                </span>
              }
              allowClear
              name="email"
              type="text"
              size="large"
              placeholder="email"
            />
            {errors.email && touched.email && (
              <span className="text-[13px] text-red-500">{errors.email}</span>
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
            Kodni yuborish
          </Button>
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

export default SendOtp;
