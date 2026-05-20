export type TransferType = "Deposit" | "Transfer";

export type Transfer = {
  id: string | number; 
  description: string;
  amount: number;
  date: string;
  type: TransferType;
};

export type TransferFilters = {
  description: string;
  startDate: string;
  endDate: string;
  type: TransferType | "all";
};

export interface TransferListProps {
  filters?: TransferFilters;
}