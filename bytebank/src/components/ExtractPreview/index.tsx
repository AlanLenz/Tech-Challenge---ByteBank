"use client";

import { useState, useEffect } from "react";
import type { Transfer } from "@/types/transfer";
import { formatDate, formatCurrency } from "@/utils/format";
import Link from "next/link";
import { useThemeColors } from "@/hooks/useThemeColors";

const ExtractPreview = () => {
  const { deposit, transfer, textMuted, black, white } = useThemeColors();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
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
    <section className="w-full rounded-lg p-4 sm:p-4 lg:p-4 min-h-[478px] flex flex-col justify-between" style={{ backgroundColor: white }}>
      <div>
        <h2 className="text-[24px] font-bold whitespace-nowrap mb-6" style={{ color: black }}>Últimas transações</h2>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <p className="font-medium" style={{ color: textMuted }}>Carregando dados...</p>
          </div>
        ) : transfers.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <p className="font-medium" style={{ color: textMuted }}>Nenhum lançamento encontrado.</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6 flex flex-col gap-4">
            {lastTransfers.map((item) => {
              return (
                <div key={item.id}>
                  <div className="w-full flex gap-2 justify-between items-center">
                    <p className="font-semibold text-[16px]" style={{ color: black }}>{item.description}</p>
                    <p className="text-[13px]" style={{ color: textMuted }}>{item.type === "Deposit" ? "Depósito" : "Transferência"}</p>
                  </div>
                  <div className="w-full flex gap-2 justify-between items-center">
                    <p className="text-[14px]" style={{ color: textMuted }}>{formatDate(item.date)}</p>
                    <p className="text-[15px] font-semibold text-wrap-mode-nowrap" style={{ color: item.type === "Deposit" ? deposit : transfer }}>
                      {item.type === "Transfer" ? "- " : ""}
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                  <div className="w-full border-t mt-2" style={{ borderColor: textMuted }}/>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="text-end w-full py-2">
        <Link
          href="/extract"
          style={{ color: black }}
          className="cursor-pointer font-bold text-[14px] decoration-solid underline decoration-current">
          Ver mais!
        </Link>
      </div>
    </section >
  );
};

export default ExtractPreview;