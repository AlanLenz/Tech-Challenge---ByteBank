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
import type { Transfer } from "@/types/transfer";
import type { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Início | Fluxo - Gestão Financeira',
  description: '...',
}
export default function Home() {
  const { bgGreen, bgGray } = useThemeColors();
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  // Carrega os dados do JSON apenas UMA VEZ na inicialização
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await fetch('http://localhost:4000/transfers');
        const data = await response.json();
        const arrayDeTransferencias = Array.isArray(data) ? data : data.transfers || [];

        setTransfers(arrayDeTransferencias);

      } catch (error) {
        console.error("Erro ao carregar:", error);
      }
    };
    fetchTransfers();
  }, []);

  const handleAddTransfer = (newTransfer: Transfer) => {
    // Atualiza o estado (a tela) adicionando o novo item no começo da lista
    setTransfers((currentTransfers) => [newTransfer, ...currentTransfers]);
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: bgGreen }}>
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
            <div className="w-[100%] rounded-lg p-8" style={{ backgroundColor: bgGray }}>
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