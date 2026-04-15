"use client";

import { useState } from "react";

export type Transfer = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "Deposit" | "Transfer";
};

export function useTransfers() {
  const [transfers, setTransfers] = useState<Transfer[]>(() => {
    try {
      const stored = localStorage.getItem("transfers");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const onAddTransfer = (transfer: Transfer) => {
    setTransfers((prev) => {
      const updated = [...prev, transfer];
      localStorage.setItem("transfers", JSON.stringify(updated));
      return updated;
    });
  };

  return { transfers, onAddTransfer };
}