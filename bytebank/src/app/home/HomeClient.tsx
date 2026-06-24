"use client";

import { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import ExtractPreview from "@/components/ExtractPreview";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";
import MobileMenu from "@/components/MobileMenu";
import FooterCustom from "@/components/Footer";
import TransactionForm from "@/components/TransactionForm";
import type { Transfer } from "@/types/transfer";

interface HomeClientProps {
  initialTransfers: Transfer[];
}

export default function HomeClient({ initialTransfers }: HomeClientProps) {
  const { bgGreen, bgGray } = useThemeColors();
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);

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
            <div className="w-[100%] rounded-lg p-8" style={{ backgroundColor: bgGray }}>
              <TransactionForm onAddTransfer={handleAddTransfer} />
            </div>
            <div className="w-full md:hidden">
              <ExtractPreview initialTransfers={transfers} />
            </div>
          </div>
          <div className="hidden md:flex md:flex-col">
            <ExtractPreview initialTransfers={transfers} />
          </div>
        </div>
      </div>
      <FooterCustom />
    </div>
  );
}
