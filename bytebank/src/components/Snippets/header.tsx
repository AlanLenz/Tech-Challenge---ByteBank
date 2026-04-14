"use client"

import * as React from "react"
import { useState } from 'react';
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@custom-react-hooks/use-media-query"
import RegisterModal from '../forms/register-form';
import LoginModal from '../forms/login-form';
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function Header() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  if (isDesktop) {
    return (
      <header>
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#47a138] rounded-sm"></div>
              <span className="text-[#47a138] text-xl font-bold">Bytebank</span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#sobre" className="text-white hover:text-gray-200 transition">Sobre</a>
              <a href="#servicos" className="text-white hover:text-gray-200 transition">Serviços</a>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setIsRegisterModalOpen(true)} className="cursor-pointer bg-[#47a138] text-black font-bold px-6 py-2 rounded hover:bg-opacity-90 transition">
              Abrir minha conta
            </button>
            <button onClick={() => setIsLoginModalOpen(true)} className="cursor-pointer border-2 border-[#47a138] text-[#47a138] font-bold px-6 py-2 rounded hover:bg-[#47a138] hover:text-white transition">
              Já tenho conta
            </button>
          </div>
        </nav>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      </header>
    )
  } else {
    return (
      <header>
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#47a138] rounded-sm"></div>
              <span className="text-[#47a138] text-xl font-bold">Bytebank</span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#sobre" className="text-white hover:text-gray-200 transition">Sobre</a>
              <a href="#servicos" className="text-white hover:text-gray-200 transition">Serviços</a>
            </div>
          </div>

          <div className="flex gap-4">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button variant="outline" className="capitalize">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" fill="#000000"><path d="M80 96h352v32H80zm0 144h352v32H80zm0 144h352v32H80z" /></svg>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
                <DrawerHeader>
                  <Button onClick={() => setIsRegisterModalOpen(true)}>Abrir minha conta</Button>
                  <Button onClick={() => setIsLoginModalOpen(true)} variant="outline">Já tenho conta</Button>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </nav>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      </header>
    )
  }

}