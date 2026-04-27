"use client";

import { useMemo, useState } from "react";
import type { Transfer } from "@/types/transfer";
import { formatCurrency } from "@/utils/format";
import { useThemeColors } from "@/hooks/useThemeColors";
import TransferItem from "@/components/TransferItem";
import SummaryCard from "@/components/SummaryCard";

const initialTransfers: Transfer[] = [
  { id: "1", description: "Compra no Supermercado", amount: 150, date: "2025-08-18", type: "Deposit" },
  { id: "2", description: "Consulta Medica", amount: 100, date: "2025-10-21", type: "Deposit" },
  { id: "3", description: "Pix para Maria", amount: 50, date: "2025-11-02", type: "Deposit" },
  { id: "4", description: "Restaurante", amount: 500, date: "2025-11-21", type: "Transfer" },
  { id: "5", description: "Pagamento de Assinatura", amount: 69.9, date: "2025-12-03", type: "Transfer" },
  { id: "6", description: "Reembolso", amount: 120, date: "2025-12-12", type: "Deposit" },
];

const TransferList = () => {
  const { black, textMuted } = useThemeColors();
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Transfer, "id">>({
    description: "",
    amount: 0,
    date: "",
    type: "Deposit",
  });

  const totals = useMemo(() => {
    return transfers.reduce(
      (acc, item) => {
        if (item.type === "Deposit") {
          acc.deposits += item.amount;
        } else {
          acc.transfers += item.amount;
        }
        return acc;
      },
      { deposits: 0, transfers: 0 },
    );
  }, [transfers]);

  const startEdit = (item: Transfer) => {
    setEditingId(item.id);
    setDraft({
      description: item.description,
      amount: item.amount,
      date: item.date,
      type: item.type,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = (id: string) => {
    if (!draft.description.trim() || !draft.date || draft.amount <= 0) {
      return;
    }

    setTransfers((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              description: draft.description.trim(),
              amount: draft.amount,
              date: draft.date,
              type: draft.type,
            }
          : item,
      ),
    );

    setEditingId(null);
  };

  const deleteTransfer = (id: string) => {
    setTransfers((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <section className="w-full bg-white rounded-lg p-4 sm:p-6 lg:p-8 min-h-[478px]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-[28px] font-bold" style={{ color: black }}>Transferencias</h2>
          <p className="text-[14px]" style={{ color: textMuted }}>Gerencie, edite e exclua lancamentos do extrato.</p>
        </div>
        <div className="text-right">
          <p className="text-[13px]" style={{ color: textMuted }}>Saldo liquido</p>
          <p className="text-[20px] font-semibold" style={{ color: black }}>
            {formatCurrency(totals.deposits - totals.transfers)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard variant="deposit" label="Depositos" value={formatCurrency(totals.deposits)} />
        <SummaryCard variant="transfer" label="Transferencias" value={formatCurrency(totals.transfers)} />
        <SummaryCard variant="records" label="Registros" value={transfers.length} />
      </div>

      <div className="space-y-3">
        {transfers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-[16px] font-semibold" style={{ color: black }}>Nenhum lançamento encontrado</p>
            <p className="text-[14px]" style={{ color: textMuted }}>Suas transações aparecerão aqui assim que forem registradas.</p>
          </div>
        ) : (
          transfers.map((item) => (
            <TransferItem
              key={item.id}
              item={item}
              isEditing={editingId === item.id}
              draft={draft}
              onDraftChange={setDraft}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onEdit={startEdit}
              onDelete={deleteTransfer}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default TransferList;