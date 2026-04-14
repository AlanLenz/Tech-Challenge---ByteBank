"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { useMediaQuery } from "@custom-react-hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Acesse sua conta</DialogTitle>
            <DialogDescription>
              Insira seus dados abaixo para acessar o Bytebank.
            </DialogDescription>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Acesse sua conta</DrawerTitle>
          <DrawerDescription>
            Insira seus dados abaixo para acessar o Bytebank.
          </DrawerDescription>
        </DrawerHeader>
        <LoginForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <button
              onClick={onClose}
              className="w-full border border-gray-300 font-bold text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Cancelar
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function LoginForm({ className }: React.ComponentProps<"form">) {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login validado!");
    router.push('/home');
  };

  return (
    <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="seu@email.com" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="password">Senha</Label>
        <Input type="password" id="password" placeholder="••••••••" />
      </div>
      <Button
        type="submit"
        className="bg-[#47a138] text-black font-bold hover:bg-opacity-90 w-full"
        onClick={() => router.push('/home')}>
        Entrar
      </Button>
    </form>
  )
}