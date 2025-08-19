import { string, object, ref } from "yup";

export const SendOtpSchema = object({
  email: string()
    .email()
    .required("Emailni kiritish majburiy")
    .min(2, "Minimum 2 soz bo'lishi kerak"),
});

export const VerifyOtpSchema = object({
  otp: string()
    .required("Kodni kiritish majburiy")
    .min(5, "5 son bo'lishi kerak")
    .max(5, "5 son bo'lishi kerak"),
});


export const PasswordSchema = object({
  password: string()
    .required("Password kiritish majburiy")
    .min(6, "Minimum 6 harf bo'lishi kerak"),

  repassword: string()
    .required("Password kiritish majburiy")
    .min(6, "Minimum 6 harf bo'lishi kerak")
    .oneOf([ref("password")], "Parollar bir xil bo'lishi kerak"),
});
