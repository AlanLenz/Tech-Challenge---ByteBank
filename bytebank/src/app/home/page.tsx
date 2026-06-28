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
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Transfer } from "@/types/transfer";
import { transferService } from "@/services/transfers";
import { auth } from "@/lib/firebase";


export default function Home() {
  const { bgGreen, bgGray } = useThemeColors();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(true);

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
        // Se não houver usuário, apenas paramos de carregar (talvez redirecionar pro login)
        setIsLoading(false);
      }
    });

    // 4. Cleanup the listener when the component unmounts
    return () => fetchAllTransfers();
  }, []);

  const handleAddTransfer = (newTransfer: Transfer) => {
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
            <Dashboard transfers={transfers} />
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