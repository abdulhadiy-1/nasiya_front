import { Toaster } from "react-hot-toast";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import { Button, Input } from "antd";
import { useState } from "react";
import { useFormik } from "formik";
import { PasswordSchema } from "../../validation/SendOtp";
import { logo } from "../../assets/images";
import { KeyIcon } from "../../assets/icons";
import { useParams } from "react-router-dom";
import { UpdatePassService } from "../../service/UpdatePass";
import { useQuery } from "@tanstack/react-query";
import instance from "../../hooks/instance";
import type { SellerType } from "../../@types/SellerType";

const UpdatePassword = () => {
  const { id } = useParams();
  useQuery<SellerType>({
    queryKey: ["get-seller", id],
    queryFn: () =>
      instance.get(`/seller/${id}`).then(res => res.data.data).catch((err) => {
        if(err.status == 400){
          location.pathname = "/"
        }
      })
  });  
  const [isPenning, setPenning] = useState(false);
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { password: "", repassword: "" },
      validationSchema: PasswordSchema,
      onSubmit: (data) => {
        setPenning(true);
        UpdatePassService({ password: data.password, id }, setPenning);
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
        <Text>Iltimos, yangi parolni kiriting</Text>
        <form onSubmit={handleSubmit} className="mt-[38px]" autoComplete="off">
          <label>
            <Input.Password
              className={`${
                errors.password && touched.password ? "!border-red-500" : ""
              } mt-[24px]`}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              prefix={
                <span
                  className={`${
                    errors.password && touched.password ? "!text-red-500" : ""
                  }`}
                >
                  <KeyIcon />
                </span>
              }
              allowClear
              name="password"
              type="password"
              size="large"
              placeholder="Parol"
            />
            {errors.password && touched.password && (
              <span className="text-[13px] text-red-500">
                {errors.password}
              </span>
            )}
          </label>
          <label>
            <Input.Password
              className={`${
                errors.repassword && touched.repassword ? "!border-red-500" : ""
              } mt-[24px]`}
              value={values.repassword}
              onChange={handleChange}
              onBlur={handleBlur}
              prefix={
                <span
                  className={`${
                    errors.repassword && touched.repassword
                      ? "!text-red-500"
                      : ""
                  }`}
                >
                  <KeyIcon />
                </span>
              }
              allowClear
              name="repassword"
              type="password"
              size="large"
              placeholder="Parolni qayta kiriting"
            />
            {errors.repassword && touched.repassword && (
              <span className="text-[13px] text-red-500">
                {errors.repassword}
              </span>
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
            Parolni yangilash
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

export default UpdatePassword;
