"use client";

import { useTransfers } from "@/hooks/useTransfers";
import { useThemeColors } from "@/hooks/useThemeColors";

import ExtractPreview from "@/components/ExtractPreview";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";
import MobileMenu from "@/components/MobileMenu";
import TransactionForm from "@/components/TransactionForm";

export default function Home() {
  const { transfers, onAddTransfer } = useTransfers();
  const { backgroundPage, backgroundCard } = useThemeColors();

  return (
    <div className="min-h-screen font-sans">
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: backgroundPage }}>
        <Header />

        <div className="container mx-auto flex gap-6 p-6 items-stretch flex-1">
          <div className="hidden md:flex md:flex-col">
            <SideMenu />

          </div>
          <div className="w-[100%] flex flex-col gap-6">
            <div className="w-full">
              <MobileMenu />
            </div>
            <Hero />

            <div className="w-[100%] rounded-lg p-8 h-[478px]" style={{ backgroundColor: backgroundCard }}>
              <TransactionForm onAddTransfer={onAddTransfer} />
            </div>
          </div>
          <div className="hidden md:flex md:flex-col">
  
          {transfers.length > 0 && (
            <ExtractPreview transfers={transfers} />
          )}
          </div>
        </div>
      </div>
    </div >
  );
}