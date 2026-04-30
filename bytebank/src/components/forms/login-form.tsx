"use client"

import * as React from "react"
import { useState } from "react" // Importação necessária para gerenciar estado
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'

// Importações do Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
// IMPORTANTE: Ajuste o caminho abaixo para onde o seu arquivo de configuração do Firebase está localizado
import { auth } from "@/lib/firebase";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Button from "@/components/Button"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <>
      <div className="hidden md:block">
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Acesse sua conta</DialogTitle>
              <DialogDescription>
                Insira seus dados abaixo para acessar a Gestão Financeira.
              </DialogDescription>
            </DialogHeader>
            <LoginForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Acesse sua conta</DrawerTitle>
              <DrawerDescription>
                Insira seus dados abaixo para acessar a Gestão Financeira.
              </DrawerDescription>
            </DrawerHeader>
            <LoginForm className="px-4" />
            <DrawerFooter className="pt-2">
              <Button variant="neutral" size="sm" onClick={onClose}>
                Cancelar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export function LoginForm({ className }: React.ComponentProps<"form">) {
  const router = useRouter();

  // Estados para capturar os inputs e tratar carregamento/erros
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpa erros antigos ao tentar novamente
    setIsLoading(true); // Desabilita o botão enquanto carrega

    try {
      // Chama a autenticação do Firebase
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Login validado com Firebase!");
      router.push('/home'); // Redireciona em caso de sucesso
    } catch (err: any) {
      console.error(err);
      // Tratamento básico de erro (você pode customizar a mensagem baseada no err.code)
      setError("Email ou senha inválidos. Tente novamente.");
    } finally {
      setIsLoading(false); // Reabilita o botão
    }
  };

  return (
    <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit}>

      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Exibe a mensagem de erro, se houver */}
      {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

      <Button type="submit" variant="primary" size="sm" loading={isLoading}>
        Entrar
      </Button>
    </form>
  )
}