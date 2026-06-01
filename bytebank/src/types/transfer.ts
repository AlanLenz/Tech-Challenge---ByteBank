export type TransferType = "Deposit" | "Transfer";

export type TransferCategory = "food" | "transport" | "housing" | "health" | "education" | "leisure" | "others";

export type Transfer = {
  id: string | number; 
  description: string;
  amount: number;
  date: string;
  type: TransferType;
  category?: TransferCategory;
  receiptName?: string;
  receiptType?: string;
};

export type TransferFilters = {
  description: string;
  startDate: string;
  endDate: string;
  type: TransferType | "all";
  category: TransferCategory | "all";
  hasReceipt: "all" | "yes" | "no";
};

export interface TransferListProps {
  filters?: TransferFilters;
}