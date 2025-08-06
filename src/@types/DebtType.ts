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
  Payment: Array<{ amount: number }>;
}
