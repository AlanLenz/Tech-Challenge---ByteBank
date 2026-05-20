"use client";

import Header from "@/components/Header";
import FooterCustom from '@/components/Footer';
import SideMenu from "@/components/SideMenu";
import TransferList from "@/components/TransferList";
import FilterTransferList, { type TransferFilters } from "@/components/FilterTransferList";
import MobileMenu from "@/components/MobileMenu";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";

export default function Extract() {
  const { bgGreen } = useThemeColors();
  const [filters, setFilters] = useState<TransferFilters | undefined>(undefined);

  return (
    <div className="min-h-screen font-sans">
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: bgGreen }}>
        <Header />
        <div className="container mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6 items-stretch flex-1">
          <div className="hidden md:flex md:flex-col">
            <SideMenu />
          </div>
          <div className="w-full">
            <MobileMenu />
            <div className="flex flex-col gap-6">
              <FilterTransferList onFilter={setFilters} />
              <TransferList filters={filters} />
            </div>
          </div>
        </div>
      </div>
      <FooterCustom/>
    </div>
  );
}
