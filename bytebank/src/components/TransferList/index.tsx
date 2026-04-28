"use client";

import { useMemo, useState, useEffect } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import type { Transfer, TransferType } from "@/types/transfer";
import { formatDate, formatCurrency } from "@/utils/format";

const TransferList = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  
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
    <section className="w-full bg-white rounded-lg p-4 sm:p-6 lg:p-8 min-h-[478px]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-black text-[28px] font-bold">Transferências</h2>
          <p className="text-gray-500 text-[14px]">Gerencie, edite e exclua lançamentos do extrato.</p>
        </div>
        <div className="text-right">
          <p className="text-[13px] text-gray-500">Saldo líquido</p>
          <p className="text-[20px] font-semibold text-black">
            {formatCurrency(totals.deposits - totals.transfers)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#E4EDE3] rounded-md p-3">
          <p className="text-[12px] text-gray-600">Depósitos</p>
          <p className="text-[18px] font-semibold text-[#1C7C30]">{formatCurrency(totals.deposits)}</p>
        </div>
        <div className="bg-[#F7ECEC] rounded-md p-3">
          <p className="text-[12px] text-gray-600">Transferências</p>
          <p className="text-[18px] font-semibold text-[#B42318]">{formatCurrency(totals.transfers)}</p>
        </div>
        <div className="bg-[#EEF2FF] rounded-md p-3">
          <p className="text-[12px] text-gray-600">Registros</p>
          <p className="text-[18px] font-semibold text-black">{transfers.length}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
           <p className="text-gray-500 font-medium">Carregando dados...</p>
        </div>
      ) : transfers.length === 0 ? (
        <div className="flex justify-center items-center py-10">
           <p className="text-gray-500 font-medium">Nenhum lançamento encontrado.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transfers.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <article key={item.id} className="border border-gray-200 rounded-lg p-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
                    <label className="lg:col-span-2">
                      <span className="text-[12px] text-gray-500">Descrição</span>
                      <input
                        value={draft.description}
                        onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
                        className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
                      />
                    </label>
                    <label>
                      <span className="text-[12px] text-gray-500">Data</span>
                      <input
                        type="date"
                        value={draft.date}
                        onChange={(event) => setDraft((prev) => ({ ...prev, date: event.target.value }))}
                        className="text-black cursor-pointer w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
                      />
                    </label>
                    <label>
                      <span className="text-[12px] text-gray-500">Tipo</span>
                      <select
                        value={draft.type}
                        onChange={(event) =>
                          setDraft((prev) => ({
                            ...prev,
                            type: event.target.value as TransferType,
                          }))
                        }
                        className="text-black cursor-pointer w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
                      >
                        <option value="Deposit">Depósito</option>
                        <option value="Transfer">Transferência</option>
                      </select>
                    </label>
                    <label>
                      <span className="text-[12px] text-gray-500">Valor</span>
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={draft.amount}
                        onChange={(event) =>
                          setDraft((prev) => ({
                            ...prev,
                            amount: Number(event.target.value),
                          }))
                        }
                        className="text-black w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
                      />
                    </label>
                    <div className="flex gap-2 md:col-span-2 lg:col-span-1">
                      <button
                        type="button"
                        onClick={() => saveEdit(item.id)}
                        className="cursor-pointer inline-flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-[#47A138] text-white text-[13px] font-semibold"
                      >
                        <Check className="w-4 h-4" />
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="text-black cursor-pointer inline-flex items-center justify-center gap-1 px-3 py-2 rounded-md border border-black text-[13px]"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] lg:grid-cols-5 gap-3 items-center">
                    <div className="lg:col-span-2">
                      <p className="text-black font-semibold text-[16px]">{item.description}</p>
                      <p className="text-[13px] text-gray-500">{item.type === "Deposit" ? "Depósito" : "Transferência"}</p>
                    </div>
                    <p className="text-[14px] text-gray-600">{formatDate(item.date)}</p>
                    <p className={`text-[15px] font-semibold ${item.type === "Deposit" ? "text-[#1C7C30]" : "text-[#B42318]"}`}>
                      {item.type === "Transfer" ? "- " : ""}
                      {formatCurrency(item.amount)}
                    </p>
                    <div className="flex md:justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="cursor-pointer text-black inline-flex items-center gap-1 px-3 py-2 rounded-md border border-black text-[13px]"
                      >
                        <Pencil className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTransfer(item.id)}
                        className="cursor-pointer inline-flex items-center gap-1 px-3 py-2 rounded-md bg-[#B42318] text-white text-[13px]"
                      >
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TransferList;