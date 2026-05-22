"use client";

import { useMemo, useState, useEffect } from "react";
import type { Transfer, TransferListProps } from "@/types/transfer";
import { formatCurrency } from "@/utils/format";
import SummaryCard from "../SummaryCard";
import TransferItem from "../TransferItem";
import { useThemeColors } from "@/hooks/useThemeColors";
import Pagination from "../Pagination";

const PAGE_SIZE = 10;

const TransferList = ({ filters }: TransferListProps) => {
  const { black, textMuted } = useThemeColors();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isChangingPage, setIsChangingPage] = useState(false);

  // Como o ID agora pode ser a string gerada pelo uuidv4(), mudamos o tipo aqui
  const [editingId, setEditingId] = useState<string | number | null>(null);
  
  const [draft, setDraft] = useState<Omit<Transfer, "id">>({
    description: "",
    amount: 0,
    date: "",
    type: "Deposit",
  });

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await fetch('http://localhost:4000/transfers');
        if (!response.ok) throw new Error('Erro ao carregar os dados');
        
        const data = await response.json();
        // Mesma proteção que aplicamos antes para garantir que é um Array
        const arrayDeTransferencias = Array.isArray(data) ? data : data.transfers || [];
        setTransfers(arrayDeTransferencias);
        
      } catch (error) {
        console.error("Falha ao buscar transações:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  const filteredTransfers = useMemo(() => {
    if (!filters) return transfers;
    return transfers.filter((item) => {
      if (filters.description && !item.description.toLowerCase().includes(filters.description.toLowerCase())) return false;
      if (filters.type && filters.type !== "all" && item.type !== filters.type) return false;
      if (filters.startDate && item.date < filters.startDate) return false;
      if (filters.endDate && item.date > filters.endDate) return false;
      return true;
    });
  }, [transfers, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredTransfers.length / PAGE_SIZE));

  const paginatedTransfers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTransfers.slice(start, start + PAGE_SIZE);
  }, [filteredTransfers, currentPage]);

  // Reseta para a primeira página sempre que os filtros mudarem
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
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  // --- LÓGICA DE EDIÇÃO ATUALIZADA (PUT) ---
  const saveEdit = async (id: string | number) => {
    if (!draft.description.trim() || !draft.date || draft.amount <= 0) {
      return;
    }

    const updatedTransfer = {
      id: id,
      description: draft.description.trim(),
      amount: draft.amount,
      date: draft.date,
      type: draft.type,
    };

    try {
      // Faz o PUT na URL com o ID específico
      const response = await fetch(`http://localhost:4000/transfers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransfer),
      });

      if (!response.ok) throw new Error("Erro ao atualizar transação no servidor");

      // Se o servidor confirmou, atualizamos a tela
      setTransfers((current) =>
        current.map((item) => (item.id === id ? updatedTransfer : item))
      );
      
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Não foi possível salvar a edição.");
    }
  };

  // --- LÓGICA DE EXCLUSÃO ATUALIZADA (DELETE) ---
  const deleteTransfer = async (id: string | number) => {
    // É uma boa prática pedir confirmação antes de apagar do banco
    if (!window.confirm("Tem certeza que deseja excluir esta transação?")) return;

    try {
      // Faz o DELETE na URL com o ID específico
      const response = await fetch(`http://localhost:4000/transfers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Erro ao deletar transação no servidor");

      // Se o servidor confirmou a exclusão, removemos da tela
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