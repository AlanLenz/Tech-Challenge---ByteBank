"use client";

import { useState, useEffect } from "react";
import { Check, Pencil, Trash2, X, Paperclip, ExternalLink } from "lucide-react";
import type { Transfer, TransferType, CategoryId } from "@/types/transfer";
import { CATEGORIES_MAP } from "@/types/transfer"; 
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
    }
  }, [isEditing]);

  // Quando o draft é atualizado com a nova URL do Vercel Blob, dispara o salvamento
  useEffect(() => {
    if (shouldSaveAfterDraftUpdate) {
      setShouldSaveAfterDraftUpdate(false);
      onSave(item.id);
    }
  }, [shouldSaveAfterDraftUpdate, onSave, item.id]);

  const handleRemoveReceipt = () => {
    setReceiptFile(null);
    if (draft.receipt_url) {
      onDraftChange({
        ...draft,
        receipt_url: undefined,
      });
    }
  };

  const handleSave = async () => {
    // Se o usuário selecionou um arquivo novo no input de edição
    if (receiptFile) {
      try {
        const uploadResponse = await fetch(
          `/api/upload?filename=${encodeURIComponent(receiptFile.name)}`,
          {
            method: 'POST',
            body: receiptFile,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Falha ao fazer o upload do anexo para a Vercel");
        }

        const blobResult = await uploadResponse.json();

        // Atualiza o draft com a URL pública gerada na nuvem
        onDraftChange({
          ...draft,
          receipt_url: blobResult.url,
        });

        setShouldSaveAfterDraftUpdate(true);
      } catch (error) {
        console.error("Erro ao fazer upload do anexo:", error);
        alert("Não foi possível fazer o upload do novo comprovante.");
        return;
      }
    } else {
      // Se não mudou o anexo, salva as alterações de texto diretamente
      onSave(item.id);
    }
  };

  // Define a URL de visualização (arquivo local recém-escolhido ou URL pública do Blob)
  const previewUrl = draft.receipt_url ? `/api/receipt?url=${encodeURIComponent(draft.receipt_url)}` : undefined;
  const isPdf = receiptFile ? receiptFile.type === 'application/pdf' : draft.receipt_url?.toLowerCase().endsWith('.pdf');

  return (
    <article className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] lg:grid-cols-5 gap-3 items-center">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-black font-semibold text-[16px]">{item.description}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-[13px] text-gray-500 font-medium">
                  {item.type === "Deposit" ? "Depósito" : "Transferência"}
                </p>
                {item.categories_id && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                      {CATEGORIES_MAP[item.categories_id]}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Link direto para abrir o comprovante da Vercel */}
            {item.receipt_url && (
              <a
                href={item.receipt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-2 rounded-full transition-colors flex items-center gap-1 shrink-0"
                title="Ver comprovante anexado"
              >
                <Paperclip className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-[14px] text-gray-600 font-medium">{formatDate(item.date)}</p>
        
        <p
          className="text-[15px] font-bold"
          style={{ color: item.type === "Deposit" ? green : red }}
        >
          {item.type === "Transfer" ? "- " : ""}
          {formatCurrency(item.amount)}
        </p>

        <div className="flex md:justify-end gap-2">
          {/* Dialog de Edição */}
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

                <InputSelect
                  label="Categoria"
                  value={draft.categories_id ? String(draft.categories_id) : ""}
                  onChange={(val) => onDraftChange({ ...draft, categories_id: Number(val) as CategoryId })}
                  options={[
                    { value: '1', label: 'Alimentação' },
                    { value: '2', label: 'Transporte' },
                    { value: '3', label: 'Moradia' },
                    { value: '4', label: 'Saúde' },
                    { value: '5', label: 'Educação' },
                    { value: '6', label: 'Lazer' },
                    { value: '7', label: 'Outros' },
                  ]}
                  size="lg"
                />

                {/* Seção de Gestão do Comprovante na Nuvem */}
                {(previewUrl || receiptFile) ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Comprovante Anexado</span>
                      <button
                        type="button"
                        onClick={handleRemoveReceipt}
                        className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Remover anexo
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <Paperclip className="w-4 h-4 shrink-0 text-blue-600" />
                          <span className="truncate text-sm text-gray-700 font-medium">
                            {receiptFile ? receiptFile.name : "Documento armazenado no Vercel Blob"}
                          </span>
                        </div>
                        {draft.receipt_url && !receiptFile && (
                          <a
                            href={`/api/receipt?url=${encodeURIComponent(draft.receipt_url)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-1 shrink-0 font-semibold"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Abrir original
                          </a>
                        )}
                      </div>

                      {previewUrl && (
                        <div className="rounded-lg overflow-hidden bg-white border border-gray-200 flex justify-center items-center p-2">
                          {isPdf ? (
                            <iframe
                              src={previewUrl}
                              title="Comprovante PDF"
                              className="w-full h-64 border-0"
                            />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={previewUrl}
                              alt="Comprovante"
                              className="max-h-64 w-auto object-contain rounded"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <span className="text-sm font-semibold text-gray-700 block mb-1">Anexar Comprovante</span>
                    <InputFile value={receiptFile} onChange={setReceiptFile} />
                  </div>
                )}
              </div>

              <DialogFooter className="mt-auto pt-4 border-t">
                <Button variant="neutral" size="sm"
                  onClick={() => {
                    onCancel();
                    setEditDialogOpen(false);
                    setReceiptFile(null);
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

          {/* Dialog de Exclusão */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4" />
                Excluir
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className="max-w-xs">
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