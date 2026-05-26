"use client";

import { useState, useEffect } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { Transfer, TransferType } from "@/types/transfer";
import { formatDate, formatCurrency } from "@/utils/format";
import { useThemeColors } from "@/hooks/useThemeColors";
import Button from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import InputText from "@/components/InputText";
import InputDate from "@/components/InputDate";
import InputSelect from "@/components/InputSelect";
import InputNumber from "@/components/InputNumber";

interface TransferItemProps {
  item: Transfer;
  isEditing: boolean;
  draft: Omit<Transfer, "id">;
  onDraftChange: (draft: Omit<Transfer, "id">) => void;
  onSave: (id: string | number) => void;
  onCancel: () => void;
  onEdit: (item: Transfer) => void;
  onDelete: (id: string | number) => void;
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
  const { green, red } = useThemeColors();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const formatInitialValue = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const [amountStr, setAmountStr] = useState(formatInitialValue(draft.amount));

  useEffect(() => {
    if (isEditing) {
      setAmountStr(formatInitialValue(draft.amount));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  // Fecha o dialog quando o pai confirma que a edição terminou
  useEffect(() => {
    if (!isEditing) setEditDialogOpen(false);
  }, [isEditing]);

  return (
    <article className="border border-gray-200 rounded-lg p-4">
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
          style={{ color: item.type === "Deposit" ? green : red }}
        >
          {item.type === "Transfer" ? "- " : ""}
          {formatCurrency(item.amount)}
        </p>
        <div className="flex md:justify-end gap-2">
          {/* Dialog de edição */}
          <Dialog
            open={editDialogOpen}
            onOpenChange={(open) => {
              if (!open) onCancel();
              setEditDialogOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <Button
                variant="neutral"
                size="sm"
                onClick={() => {
                  onEdit(item);
                  setEditDialogOpen(true);
                }}
              >
                <Pencil className="w-4 h-4" />
                Editar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg w-[calc(100%-2rem)] sm:w-full" onOpenAutoFocus={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Editar lançamento</DialogTitle>
                <DialogDescription>
                  Altere os campos abaixo e clique em Salvar para confirmar.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4 py-2">
                <InputText
                  label="Descrição"
                  value={draft.description}
                  onChange={(val) => onDraftChange({ ...draft, description: val })}
                  autoFocus={false}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputDate
                    label="Data"
                    value={draft.date}
                    onChange={(val) => onDraftChange({ ...draft, date: val })}
                  />
                  <InputSelect
                    label="Tipo"
                    value={draft.type}
                    onChange={(val) => onDraftChange({ ...draft, type: val as TransferType })}
                    options={[
                      { value: "Deposit", label: "Depósito" },
                      { value: "Transfer", label: "Transferência" },
                    ]}
                    size="lg"
                  />
                </div>
                <div>
                  <InputNumber
                    label="Valor"
                    value={amountStr}
                    onChange={(val) => {
                      setAmountStr(val);
                      const numericValue = val
                        ? Number(val.replace(/\./g, "").replace(",", "."))
                        : 0;
                      onDraftChange({ ...draft, amount: numericValue });
                    }}
                    min={0}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="neutral" size="sm" onClick={() => { onCancel(); setEditDialogOpen(false); }}>
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
                <Button variant="primary" size="sm" onClick={() => onSave(item.id)}>
                  <Check className="w-4 h-4" />
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog de exclusão */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4" />
                Excluir
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="max-w-64">
              <DialogHeader>
                <DialogTitle>Excluir lançamento</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja excluir este lançamento? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="neutral" size="sm">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
                    Excluir
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  );
};

export default TransferItem;