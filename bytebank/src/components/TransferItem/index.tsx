"use client";

import { Check, Pencil, Trash2, X } from "lucide-react";
import type { Transfer, TransferType } from "@/types/transfer";
import { formatDate, formatCurrency } from "@/utils/format";
import { useThemeColors } from "@/hooks/useThemeColors";
import Button from "@/components/Button";

interface TransferItemProps {
  item: Transfer;
  isEditing: boolean;
  draft: Omit<Transfer, "id">;
  onDraftChange: (draft: Omit<Transfer, "id">) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  onEdit: (item: Transfer) => void;
  onDelete: (id: string) => void;
}

const TransferItem = ({
  item,
  isEditing,
  draft,
  onDraftChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}: TransferItemProps) => {
  const { deposit, transfer } = useThemeColors();

  return (
    <article className="border border-gray-200 rounded-lg p-4">
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
          <label className="lg:col-span-2">
            <span className="text-[12px] text-gray-500">Descricao</span>
            <input
              value={draft.description}
              onChange={(e) => onDraftChange({ ...draft, description: e.target.value })}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
            />
          </label>
          <label>
            <span className="text-[12px] text-gray-500">Data</span>
            <input
              type="date"
              value={draft.date}
              onChange={(e) => onDraftChange({ ...draft, date: e.target.value })}
              className="text-black cursor-pointer w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
            />
          </label>
          <label>
            <span className="text-[12px] text-gray-500">Tipo</span>
            <select
              value={draft.type}
              onChange={(e) => onDraftChange({ ...draft, type: e.target.value as TransferType })}
              className="text-black cursor-pointer w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
            >
              <option value="Deposit">Deposito</option>
              <option value="Transfer">Transferencia</option>
            </select>
          </label>
          <label>
            <span className="text-[12px] text-gray-500">Valor</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={draft.amount}
              onChange={(e) => onDraftChange({ ...draft, amount: Number(e.target.value) })}
              className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
            />
          </label>
          <div className="flex gap-2 col-span-full">
            <Button variant="primary" size="sm" onClick={() => onSave(item.id)}>
              <Check className="w-4 h-4" />
              Salvar
            </Button>
            <Button variant="neutral" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] lg:grid-cols-5 gap-3 items-center">
          <div className="lg:col-span-2">
            <p className="text-black font-semibold text-[16px]">{item.description}</p>
            <p className="text-[13px] text-gray-500">
              {item.type === "Deposit" ? "Deposito" : "Transferencia"}
            </p>
          </div>
          <p className="text-[14px] text-gray-600">{formatDate(item.date)}</p>
          <p
            className="text-[15px] font-semibold"
            style={{ color: item.type === "Deposit" ? deposit : transfer }}
          >
            {item.type === "Transfer" ? "- " : ""}
            {formatCurrency(item.amount)}
          </p>
          <div className="flex md:justify-end gap-2">
            <Button variant="neutral" size="sm" onClick={() => onEdit(item)}>
              <Pencil className="w-4 h-4" />
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
              <Trash2 className="w-4 h-4" />
              Excluir
            </Button>
          </div>
        </div>
      )}
    </article>
  );
};

export default TransferItem;
