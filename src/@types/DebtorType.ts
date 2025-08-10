import type { DebtType } from "./DebtType";

export interface DebtorType {
  id: string;
  name: string;
  address: string;
  sellerId: string;
  note: string;
  createdAt: string;
  updatedAt: string;
  star: false;
}

export interface SingleDebtorType extends DebtorType {
  Debt: DebtType[];
  ImgOfDebtor: { name: string }[];
  Phone: { phoneNumber: string }[];
  totalAmount: number;
}
