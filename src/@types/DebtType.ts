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
  Payment: Array<{
    id: string;
    debtId: string;
    amount: number;
    month: number;
    date: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  totalPayments: number;
  nextPayment: {
    id: string;
    debtId: string;
    amount: number;
    month: number;
    date: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
