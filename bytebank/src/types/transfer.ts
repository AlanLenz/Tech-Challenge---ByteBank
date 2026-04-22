export type TransferType = "Deposit" | "Transfer";

export type Transfer = {
  id: string; 
  description: string;
  amount: number;
  date: string;
  type: TransferType;
};