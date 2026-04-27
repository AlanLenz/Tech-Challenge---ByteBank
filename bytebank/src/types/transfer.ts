export type TransferType = "Deposit" | "Transfer";

export type Transfer = {
  id: string | number; 
  description: string;
  amount: number;
  date: string;
  type: TransferType;
};