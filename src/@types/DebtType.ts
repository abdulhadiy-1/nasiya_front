import type { DebtorType } from "./DebtorType";
import type { PaymentType } from "./PaymentType";

export interface DebtType {
  id: string;
  productName: string;
  date: string;
  term: number;
  note: string;
  amount: number;
  debtorId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  Payment: Array<PaymentType>;
  totalPayments: number;
  nextPayment: PaymentType;
}

export interface SingleDebtType extends DebtType {
  Debtor: DebtorType;
  ImgOfDebt: Array<{
    id: string;
    name: string;
    debtId: string;
    createdAt: string;
    updatedAt: string;
  }>;

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
}
