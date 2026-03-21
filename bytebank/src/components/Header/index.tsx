import { UserCircle } from "lucide-react";

const Header = () => {
  return(
    <header className="bg-[#004D61] text-white">
      <div className="container mx-auto flex items-center justify-between px-6 h-24">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#47a138] rounded-sm"></div>
          <span className="font-bold text-lg">Bytebank</span>
        </div>
        <div className="flex items-center gap-10">
          <p className="font-semibold text-[13px]">Joana da Silva Oliveira</p>
          <UserCircle className="w-6 h-6" />
        </div>
      </div>
    </header>
  )
}

export default Header;