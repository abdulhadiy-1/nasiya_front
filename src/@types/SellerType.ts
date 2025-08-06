import type { DebtorType } from "./DebtorType";
import type { DebtType } from "./DebtType";

export interface SellerType {
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
  Debt: Array<DebtType>
  Debtor: Array<DebtorType>
  totalDebt: number;
  overdueDebts: number;
  debtors: number;
}
