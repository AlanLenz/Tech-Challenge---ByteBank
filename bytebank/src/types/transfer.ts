export type TransferType = "Deposit" | "Transfer";

// 1. Updated to match the exact primary keys of your 'categories' DB table
export type CategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Transfer = {
  id: string | number; 
  description: string;
  amount: number;
  date: string;
  type: TransferType;
  categories_id?: CategoryId; // <-- Perfectly matches the Postgres column name!
  receipt_url?: string;       // <-- Clean Vercel Blob URL
};

export type TransferFilters = {
  description: string;
  startDate: string;
  endDate: string;
  type: TransferType | "all";
  category: CategoryId | "all"; 
  hasReceipt: "all" | "yes" | "no";
};

export interface TransferListProps {
  filters?: TransferFilters;
}

// ==========================================
// 💡 UI HELPER: The Category Dictionary
// ==========================================
// Exporting this map here saves you from writing 50-line 
// switch/case statements inside your React components!

export const CATEGORIES_MAP: Record<CategoryId, string> = {
  1: "Alimentação",
  2: "Transporte",
  3: "Moradia",
  4: "Saúde",
  5: "Educação",
  6: "Lazer",
  7: "Outros",
};