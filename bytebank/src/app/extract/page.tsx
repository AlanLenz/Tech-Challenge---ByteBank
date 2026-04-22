import Header from "@/components/Header";
import FooterCustom from '@/components/Footer';
import SideMenu from "@/components/SideMenu";
import TransferList from "@/components/TransferList";
import MobileMenu from "@/components/MobileMenu";
import type { Metadata } from 'next';
import { colors } from "@/hooks/useThemeColors";

export const metadata: Metadata = {
  title: 'Extrato | Fluxo - Gestão Financeira',
  description: '...',
}

export default function Extract() {
  return (
    <div className="min-h-screen font-sans">
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.backgroundPage }}>
        <Header />
        <div className="container mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6 items-stretch flex-1">
          <div className="hidden md:flex md:flex-col">
            <SideMenu />
          </div>
          <div className="w-full">
            <MobileMenu />
            <TransferList />
          </div>
        </div>
      </div>
      <FooterCustom/>
    </div>
  );
}
