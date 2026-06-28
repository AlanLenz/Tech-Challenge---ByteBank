"use client";

import { useMemo, useState, useEffect } from "react";
import type { Transfer, TransferListProps } from "@/types/transfer";
import { formatCurrency } from "@/utils/format";
import SummaryCard from "../SummaryCard";
import TransferItem from "../TransferItem";
import { useThemeColors } from "@/hooks/useThemeColors";
import Pagination from "../Pagination";
import { transferService } from "@/services/transfers";
import { auth } from "@/lib/firebase";

const PAGE_SIZE = 10;

const TransferList = ({ filters }: TransferListProps) => {
  const { black, textMuted } = useThemeColors();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isChangingPage, setIsChangingPage] = useState(false);

  const [editingId, setEditingId] = useState<string | number | null>(null);

  // 1. Atualizado para as novas chaves do banco de dados
  const [draft, setDraft] = useState<Omit<Transfer, "id">>({
    description: "",
    amount: 0,
    date: "",
    type: "Deposit",
    categories_id: undefined,
    receipt_url: undefined,
  });

  useEffect(() => {
    const fetchAllTransfers = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const data = await transferService.getAll();
          setTransfers(data);
        } catch (error) {
          console.error("Falha ao buscar transações:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });

    return () => fetchAllTransfers();
  }, []);

  const filteredTransfers = useMemo(() => {
    const filtered = filters 
      ? transfers.filter((item) => {
          if (filters.description && !item.description.toLowerCase().includes(filters.description.toLowerCase())) return false;
          if (filters.type && filters.type !== "all" && item.type !== filters.type) return false;
          
          // 2. Compara o ID numérico da categoria
          if (filters.category && filters.category !== "all" && item.categories_id !== Number(filters.category)) return false;
          
          // 3. Valida a existência do comprovante pela nova string da Vercel
          if (filters.hasReceipt && filters.hasReceipt !== "all") {
            const hasReceipt = !!item.receipt_url;
            if (filters.hasReceipt === "yes" && !hasReceipt) return false;
            if (filters.hasReceipt === "no" && hasReceipt) return false;
          }
          if (filters.startDate && item.date < filters.startDate) return false;
          if (filters.endDate && item.date > filters.endDate) return false;
          return true;
        })
      : transfers;
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; 
    });
  }, [transfers, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredTransfers.length / PAGE_SIZE));

  const paginatedTransfers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTransfers.slice(start, start + PAGE_SIZE);
  }, [filteredTransfers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const goToPage = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setIsChangingPage(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsChangingPage(false);
    }, 200);
  };

  const totals = useMemo(() => {
    return filteredTransfers.reduce(
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
  }, [filteredTransfers]);

  const startEdit = (item: Transfer) => {
    setEditingId(item.id);
    setDraft({
      description: item.description,
      amount: item.amount,
      date: item.date,
      type: item.type,
      categories_id: item.categories_id,
      receipt_url: item.receipt_url,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: string | number) => {
    if (!draft.description.trim() || !draft.date || draft.amount <= 0) {
      return;
    }

    const updatedTransfer: Transfer = {
      id: id,
      description: draft.description.trim(),
      amount: draft.amount,
      date: draft.date,
      type: draft.type,
      categories_id: draft.categories_id,
      receipt_url: draft.receipt_url,
    };

    try {
      await transferService.update(id, updatedTransfer);

      setTransfers((current) =>
        current.map((item) => (item.id === id ? updatedTransfer : item))
      );

      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar a edição.");
    }
  };

  const deleteTransfer = async (id: string | number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta transação?")) return;

    try {
      await transferService.delete(id);

      setTransfers((current) => current.filter((item) => item.id !== id));
      if (editingId === id) setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Não foi possível excluir a transação.");
    }
  };

  return (
    <section className="w-full rounded-lg p-4 sm:p-6 lg:p-8 min-h-[478px]" style={{ backgroundColor: "white" }}>
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
        <SummaryCard variant="records" label="Registros" value={filteredTransfers.length} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-gray-500 font-medium">Carregando dados...</p>
        </div>
      ) : filteredTransfers.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-gray-500 font-medium">Nenhum lançamento encontrado.</p>
        </div>
      ) : (
        <>
          {isChangingPage ? (
            <div className="flex justify-center items-center py-10">
              <p className="text-gray-500 font-medium">Carregando...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {paginatedTransfers.map((item) => (
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
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </>
      )}
    </section>
  );
};

export default TransferList;