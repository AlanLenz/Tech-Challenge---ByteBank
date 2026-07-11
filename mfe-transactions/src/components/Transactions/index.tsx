"use client";

import type { Transfer } from "@/types/transfer";
import ExtractPreview from "../ExtractPreview"; // Ajuste o caminho se a sua pasta tiver outro nome
import TransactionForm from "../TransactionForm"; // Ajuste o caminho do seu form

export interface TransactionsMfeProps {
  transfers: Transfer[];
  isLoading?: boolean;
  onSubmitTransfer: (transferData: Omit<Transfer, 'id' | 'receipt_url'>, receiptFile: File | null) => Promise<void>;
}

export default function Transactions({ transfers, isLoading, onSubmitTransfer }: TransactionsMfeProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      
      {/* O Formulário ocupa 2 colunas */}
      <div className="lg:col-span-2">
        <TransactionForm onSubmitTransfer={onSubmitTransfer} />
      </div>
      
      {/* A Lista ocupa 1 coluna */}
      <div className="lg:col-span-1">
        <ExtractPreview transfers={transfers} isLoading={isLoading} />
      </div>
      
    </div>
  );
}