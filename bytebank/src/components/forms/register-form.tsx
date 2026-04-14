"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
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
                    <RegisterForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Crie sua conta</DrawerTitle>
                    <DrawerDescription>
                        Preencha os campos abaixo para criar sua conta no Bytebank.
                    </DrawerDescription>
                </DrawerHeader>
                <RegisterForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <button
                            onClick={onClose}
                            className="w-full border border-gray-300 font-bold text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition">
                            Cancelar
                        </button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function RegisterForm({ className }: React.ComponentProps<"form">) {
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!aceitouTermos) return; 
        router.push('/home');
    };

    return (
        <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit}>
            <div className="grid gap-3">
                <Label htmlFor="email">Nome</Label>
                <Input type="nome" id="nome" placeholder="Seu nome completo" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="seu@email.com" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="password">Senha</Label>
                <Input type="password" id="password" placeholder="••••••••" />
            </div>
            <FieldGroup className="max-w-sm">
                <Field orientation="horizontal">
                    <Checkbox
                        id="terms-checkbox-2"
                        name="terms-checkbox-2"
                        checked={aceitouTermos} 
                        onCheckedChange={(checked) => setAceitouTermos(checked as boolean)}
                    />
                    <FieldContent>
                        <FieldLabel htmlFor="terms-checkbox-2">
                            Aceito os termos e condições
                        </FieldLabel>
                        <FieldDescription>
                            Declaro que li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade da plataforma.
                        </FieldDescription>
                    </FieldContent>
                </Field>
            </FieldGroup>
            
            <Button
                type="submit"
                disabled={!aceitouTermos} 
                className="bg-[#47a138] text-black font-bold hover:bg-opacity-90 w-full disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
            >
                Entrar
            </Button>
        </form>
    )
}