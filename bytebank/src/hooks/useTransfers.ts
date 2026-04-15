"use client";

import { useState } from "react";
import { Transfer } from "@/types/transfer";

export function useTransfers() {
  const [transfers, setTransfers] = useState<Transfer[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("transfers");
    return stored ? JSON.parse(stored) : [];
  });

  function addTransfer(transfer: Transfer) {
    const updated = [...transfers, transfer];
    setTransfers(updated);
    localStorage.setItem("transfers", JSON.stringify(updated));
  }

  return { transfers, addTransfer };
}