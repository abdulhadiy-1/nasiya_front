import type { DebtType } from "./DebtType";
import type { PhoneType } from "./PhooneType";

export interface DebtorAllType {
  id: string;
  name: string;
  address: string;
  sellerId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  star: boolean
  Debt: Array<DebtType>;
  Seller: {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    img: string;
    wallet: number;
    login: string;
    password: string;
    status: string;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
  };
  Phone: Array<PhoneType>;
  totalDebt: number;
}
