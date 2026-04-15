"use client";

import { useTransfers } from "@/hooks/useTransfers";

import ExtractPreview from "@/components/ExtractPreview";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";
import TransactionForm from "@/components/TransactionForm";

export default function Home() {
  const { transfers, onAddTransfer } = useTransfers();

  return (
    <div className="min-h-screen font-sans">
      <div className="bg-[#E4EDE3] flex flex-col min-h-screen">
        <Header />

        <div className="container mx-auto flex gap-6 p-6 items-stretch flex-1">
          <SideMenu />

          <div className="w-[100%] flex flex-col gap-6">
            <Hero />

            <div className="w-[100%] bg-[#CBCBCB] rounded-lg p-8 h-[478px]">
              <TransactionForm onAddTransfer={onAddTransfer} />
            </div>
          </div>

          <ExtractPreview transfers={transfers} />
        </div>
      </div>
    </div>
  );
}