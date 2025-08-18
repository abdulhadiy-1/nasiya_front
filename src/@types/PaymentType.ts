export interface PaymentType {
  id: string;
  debtId: string;
  amount: number;
  month: number;
  date: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
