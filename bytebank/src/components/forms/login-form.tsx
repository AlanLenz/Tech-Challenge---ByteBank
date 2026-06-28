"use client"

import * as React from "react"
import { useState } from "react"
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
} from "@/components/Dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/Drawer"
import Button from "@/components/Button"
import InputText from "@/components/InputText"
import InputPassword from "@/components/InputPassword"
import useMediaQuery from "@/utils/useMediaQuery"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
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
    )
  }

  return (
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
    setError("");
    setIsLoading(true);

    try {
      // 1. Capture the returned UserCredential object
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 2. Extract the guaranteed user from that object
      const user = userCredential.user;

      // 3. Get the token safely (TypeScript knows 'user' exists here!)
      const token = await user.getIdToken();

      // 4. Sync the user with your PostgreSQL database
      await fetch('http://localhost:4000/sync-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Login validado com Firebase e sincronizado com o banco!");
      router.push('/home');

    } catch (err: any) {
      console.error(err);
      setError("Email ou senha inválidos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit}>

      <InputText
        id="email"
        label="Email"
        placeholder="seu@email.com"
        value={email}
        onChange={setEmail}
        required
      />

      <InputPassword
        id="password"
        label="Senha"
        value={password}
        onChange={setPassword}
        required
      />

      {/* Exibe a mensagem de erro, se houver */}
      {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

      <Button type="submit" variant="primary" size="sm" loading={isLoading}>
        Entrar
      </Button>
    </form>
  )
}