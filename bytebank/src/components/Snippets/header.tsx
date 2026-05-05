"use client"

import { useState} from 'react';
import RegisterModal from '../forms/register-form';
import LoginModal from '../forms/login-form';
import Button from "@/components/Button";
import Image from 'next/image';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/Drawer"
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Header({ className }: { className?: string }) {
  const { primary } = useThemeColors();

  // Estados dos modais
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <header className={className}>
      <div className='hidden md:block'>
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logomarca" width={150} height={83} />
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#sobre" className="font-bold transition" style={{ color: primary }}>Sobre</a>
              <a href="#servicos" className="font-bold transition" style={{ color: primary }}>Serviços</a>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="primary" onClick={() => setIsRegisterModalOpen(true)}>
              Abrir minha conta
            </Button>
            <Button variant="secondary" onClick={() => setIsLoginModalOpen(true)}>
              Já tenho conta
            </Button>
          </div>
        </nav>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      </div>

      <div className='md:hidden'>
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logomarca" width={150} height={83} />
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#sobre" className="text-[#004D61] font-bold hover:text-[#47a138] transition">Sobre</a>
              <a href="#servicos" className="text-[#004D61] font-bold hover:text-[#47a138] transition">Serviços</a>
            </div>
          </div>

          <div className="flex gap-4">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button variant="outline" className="capitalize border-[#47a138]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" fill="#000000"><path d="M80 96h352v32H80zm0 144h352v32H80zm0 144h352v32H80z" /></svg>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
                <DrawerHeader className="flex flex-col gap-2">
                  <Button onClick={() => setIsRegisterModalOpen(true)} variant="primary" size="lg">Abrir minha conta</Button>
                  <Button onClick={() => setIsLoginModalOpen(true)} variant="secondary" size="lg">Já tenho conta</Button>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </nav>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      </div>
    </header>
  )
}