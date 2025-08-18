import type { PhoneType } from "./PhooneType";

export interface HistoryType {
  id: string
  debtorId: string
  debtId: string
  paidAt: string
  amount: number;
  createdAt: string
  updatedAt: string
  Debtor: {
    id: string
    name: string;
    address: string
    sellerId: string
    note: null | string;
    star: boolean;
    createdAt: string
    updatedAt: string
    Phone: [PhoneType];
  };
}
