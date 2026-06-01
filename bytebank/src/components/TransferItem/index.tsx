"use client";

import { useState, useEffect } from "react";
import { Check, Pencil, Trash2, X, Paperclip } from "lucide-react";
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
import InputFile from "@/components/InputFile";
import { fileToBase64, saveReceipt, deleteReceipt, getReceipt } from "@/utils/receipt";

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
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [shouldSaveAfterDraftUpdate, setShouldSaveAfterDraftUpdate] = useState(false);

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

  useEffect(() => {
    if (!isEditing) {
      setEditDialogOpen(false);
      setReceiptFile(null);
      setReceiptPreview(null);
    }
  }, [isEditing]);

  // Carrega o preview do anexo existente quando o dialog abre
  useEffect(() => {
    if (editDialogOpen && draft.receiptName && !receiptFile) {
      const base64Data = getReceipt(item.id);
      setReceiptPreview(base64Data);
    } else if (!editDialogOpen) {
      setReceiptPreview(null);
    }
  }, [editDialogOpen, draft.receiptName, item.id, receiptFile]);

  // Quando o draft é atualizado com os metadados do anexo, salva
  useEffect(() => {
    if (shouldSaveAfterDraftUpdate && draft.receiptName) {
      console.log("Salvando após atualização do draft com anexo:", draft.receiptName);
      setShouldSaveAfterDraftUpdate(false);
      onSave(item.id);
    }
  }, [shouldSaveAfterDraftUpdate, draft.receiptName, onSave, item.id]);

  const handleRemoveReceipt = () => {
    // Limpa o arquivo novo se existir
    setReceiptFile(null);
    setReceiptPreview(null);
    // Remove do draft e do localStorage se for anexo existente
    if (draft.receiptName) {
      deleteReceipt(item.id);
      onDraftChange({
        ...draft,
        receiptName: undefined,
        receiptType: undefined,
      });
    }
  };

  const handleSave = async () => {
    // Se um novo arquivo foi selecionado, salva no localStorage
    if (receiptFile) {
      try {
        const receiptData = await fileToBase64(receiptFile);
        saveReceipt(item.id, receiptData);
        console.log("Anexo salvo no localStorage:", receiptFile.name);
        
        // Atualiza o draft com os metadados do arquivo
        onDraftChange({
          ...draft,
          receiptName: receiptFile.name,
          receiptType: receiptFile.type,
        });
        console.log("Draft atualizado com metadados do anexo");

        // Marca que deve salvar após o draft ser atualizado
        setShouldSaveAfterDraftUpdate(true);
      } catch (error) {
        console.error("Erro ao salvar anexo:", error);
        return;
      }
    } else {
      // Se não há arquivo novo, salva diretamente
      onSave(item.id);
    }
  };

  const currentReceipt = receiptFile ? receiptFile.name : draft.receiptName;

  return (
    <article className="border border-gray-200 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] lg:grid-cols-5 gap-3 items-center">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-black font-semibold text-[16px]">{item.description}</p>
              <p className="text-[13px] text-gray-500">
                {item.type === "Deposit" ? "Deposito" : "Transferencia"}
              </p>
            </div>
            {item.receiptName && (
              <span
                className="text-xs text-gray-400 flex items-center gap-1"
                title={`Anexo: ${item.receiptName}`}
              >
                <Paperclip className="w-3 h-3" />
              </span>
            )}
          </div>
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
            <DialogContent 
              className="max-w-2xl w-[calc(100%-2rem)] sm:w-full max-h-[90vh] flex flex-col" 
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Editar lançamento</DialogTitle>
                <DialogDescription>
                  Altere os campos abaixo e clique em Salvar para confirmar.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4 py-2 overflow-x-hidden overflow-y-auto flex-1">
                <InputText
                  label="Descrição"
                  value={draft.description}
                  onChange={(val) => onDraftChange({ ...draft, description: val })}
                  autoFocus={false}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {currentReceipt ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Comprovante
                      </span>
                      <button
                        type="button"
                        aria-label="Remover anexo"
                        onClick={handleRemoveReceipt}
                        className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Remover
                      </button>
                    </div>
                    
                    <div className="bg-white rounded-lg border-2 border-gray-300 p-3">
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 shrink-0 text-gray-500" />
                        <span className="truncate text-sm text-gray-700">{currentReceipt}</span>
                      </div>
                      
                      {receiptPreview && (
                        <div className="mt-3 rounded-lg overflow-hidden bg-gray-50">
                          {draft.receiptType?.startsWith('image/') ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={receiptPreview} 
                              alt={currentReceipt}
                              className="w-full h-auto max-h-80 object-contain"
                            />
                          ) : draft.receiptType === 'application/pdf' ? (
                            <iframe
                              src={receiptPreview}
                              title={currentReceipt}
                              className="w-full h-80 border-0"
                            />
                          ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                              Preview não disponível para este tipo de arquivo
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <InputFile
                    value={receiptFile}
                    onChange={setReceiptFile}
                  />
                )}
              </div>

              <DialogFooter className="mt-auto pt-4 border-t">
                <Button variant="neutral" size="sm"
                  onClick={() => {
                    onCancel();
                    setEditDialogOpen(false);
                    setReceiptFile(null);
                    setReceiptPreview(null);
                  }}
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave}>
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