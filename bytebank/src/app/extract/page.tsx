import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import TransferList from "@/components/TransferList";

export default function Extract() {
  return (
    <div className="min-h-screen font-sans">
      <div className="bg-[#E4EDE3] flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex gap-6 p-6 items-stretch flex-1">
          <SideMenu />
          <div className="w-[100%]">
            <TransferList />
          </div>
        </div>
      </div>
    </div>
  );
}
