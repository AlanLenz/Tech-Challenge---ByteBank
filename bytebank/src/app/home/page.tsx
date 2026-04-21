import ExtractPreview from "@/components/ExtractPreview";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";
import MobileMenu from "@/components/MobileMenu";
import TransactionForm from "@/components/TransactionForm";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <div className="bg-[#E4EDE3] flex flex-col min-h-screen">
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
            <div className="w-full mobile-only">
              <ExtractPreview />
            </div>
            <div className="w-[100%] bg-[#CBCBCB] rounded-lg p-8 h-[478px]">
              <TransactionForm />
            </div>
          </div>
          <div className="hidden md:flex md:flex-col">
            <ExtractPreview />
          </div>
        </div>
      </div>
    </div >
  );
}