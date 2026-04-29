"use client";

import { useState, useEffect } from "react";
import type { Transfer } from "@/types/transfer";
import { formatDate, formatCurrency } from "@/utils/format";
import Link from "next/link";
import { useThemeColors } from "@/hooks/useThemeColors";

type Transfer = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "Deposit" | "Transfer";
};

type Props = {
  transfers?: Transfer[];
};

const ExtractPreview = ({ transfers = [] }: Props) => {
  const { deposit, transfer, textMuted, black, white } = useThemeColors();
  const [transfersTeste, setTransfers] = useState<Transfer[]>([]);
  const lastTransfers = [...transfers]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(true);

  // useEffect para buscar os dados do JSON quando o componente montar
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Busca o arquivo na pasta public/data
        const response = await fetch('http://localhost:4000/transfers');
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const data = await response.json();
        setTransfers(data);
      } catch (error) {
        console.error("Falha ao buscar transações:", error);
      } finally {
        // Independentemente de dar erro ou sucesso, o carregamento termina
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []); // Array de dependências vazio garante que rode apenas uma vez

  return (
    <section className="w-full bg-white rounded-lg p-4 sm:p-4 lg:p-4 min-h-[478px]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <div>
          <h2 className="text-black text-[23px] font-bold">Últimas transações</h2>
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
        <div className="space-y-3 mb-5">
          {lastTransfers.map((item) => {
            return (
              <article key={item.id} className="border border-gray-200 rounded-lg p-4">
                <p className="text-black font-semibold text-[16px]">{item.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-3 items-center">
                  <div className="lg:col-span-2">
                    <p className="text-[13px] text-gray-500">{item.type === "Deposit" ? "Depósito" : "Transferência"}</p>
                    <p className="text-[14px] text-gray-600">{formatDate(item.date)}</p>
                  </div>
                  <p className={`text-[15px] font-semibold text-wrap-mode-nowrap ${item.type === "Deposit" ? "text-[#1C7C30]" : "text-[#B42318]"}`}>
                    {item.type === "Transfer" ? "- " : ""}
                    {formatCurrency(item.amount)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <div className="text-center">
        <Link
          href="/extract"
          className="cursor-pointer bg-[#47a138] text-black font-bold px-6 py-2 rounded hover:bg-[#004D61] hover:text-white hover:bg-opacity-90 transition">
          Ver mais!
        </Link>
      </div>
    </section >
  );
};

export default ExtractPreview;