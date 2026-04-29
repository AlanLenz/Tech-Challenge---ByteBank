"use client";

import { useState, useEffect } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import ExtractPreview from "@/components/ExtractPreview";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";
import MobileMenu from "@/components/MobileMenu";
import FooterCustom from '@/components/Footer';
import TransactionForm from "@/components/TransactionForm";

type Transfer = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "Deposit" | "Transfer";
};

export default function Home() {
  const { backgroundPage, backgroundCard } = useThemeColors();
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  // 1. Carrega os dados do JSON apenas UMA VEZ na inicialização
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        // Certifique-se de estar usando a URL correta (json-server ou arquivo local)
        const response = await fetch('http://localhost:4000/transfers');
        const data = await response.json();

        // Se a resposta for o objeto { transfers: [...] }, pegamos data.transfers
        // Se a resposta já for o array [...], usamos data direto
        const arrayDeTransferencias = Array.isArray(data) ? data : data.transfers || [];

        setTransfers(arrayDeTransferencias);

      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
    };
    fetchTransfers();
  }, []);

  // 2. A função mágica que é passada para o formulário
  const handleAddTransfer = (newTransfer: Transfer) => {
    // Atualiza o estado (a tela) adicionando o novo item no começo da lista
    setTransfers((currentTransfers) => [newTransfer, ...currentTransfers]);
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: backgroundPage }}>
        <Header />
        <div className="container mx-auto flex gap-6 p-6 items-stretch flex-1">
          <div className="hidden md:flex md:flex-col">
            <SideMenu />
          </div>
          <div className="w-[100%] flex flex-col gap-6">
            <div className="w-full md:hidden">
              <MobileMenu />
            </div>
            <Hero />
            <div className="w-[100%] rounded-lg p-8 h-[478px]" style={{ backgroundColor: backgroundCard }}>
              <TransactionForm onAddTransfer={handleAddTransfer} />
            </div>
            <div className="w-full md:hidden">
              <ExtractPreview />
            </div>
          </div>
          <div className="hidden md:flex md:flex-col">
            <ExtractPreview />
          </div>
        </div>
      </div>
      <FooterCustom />
    </div >
  );
}