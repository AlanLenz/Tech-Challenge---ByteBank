import type { Transfer } from "@/types/transfer";

export const mockTransfers: Transfer[] = [
  { id: 1, description: "Salário", amount: 5000, date: "2026-07-01", type: "Deposit" },
  { id: 2, description: "Freelance", amount: 1200, date: "2026-07-09", type: "Deposit" },
  { id: 3, description: "Supermercado", amount: 450.32, date: "2026-07-02", type: "Transfer", categories_id: 1 },
  { id: 4, description: "Uber", amount: 89.9, date: "2026-07-03", type: "Transfer", categories_id: 2 },
  { id: 5, description: "Aluguel", amount: 1800, date: "2026-07-05", type: "Transfer", categories_id: 3 },
  { id: 6, description: "Farmácia", amount: 120.5, date: "2026-07-06", type: "Transfer", categories_id: 4 },
  { id: 7, description: "Curso Online", amount: 250, date: "2026-07-07", type: "Transfer", categories_id: 5 },
  { id: 8, description: "Cinema", amount: 60, date: "2026-07-08", type: "Transfer", categories_id: 6 },
];
