export interface UnPaidType {
  id: string;
  debtId: string;
  amount: number;
  month: number;
  date: string;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  Debt: {
    id: string;
    productName: string;
    date: string;
    term: number;
    note: string;
    amount: 123423;
    debtorId: string;
    sellerId: string;
    createdAt: string;
    updatedAt: string;
    Debtor: {
      id: string;
      name: string;
      address: string;
      sellerId: string;
      note: string;
      star: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}
