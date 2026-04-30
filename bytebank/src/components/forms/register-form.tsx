"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { auth } from "@/lib/firebase";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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
import Button from "@/components/Button"

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    return (
        <>
            <div className="hidden md:block">
                <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Crie sua conta</DialogTitle>
                            <DialogDescription>
                                Insira seus dados abaixo para acessar a Gestão Financeira.
                            </DialogDescription>
                        </DialogHeader>
                        <RegisterForm />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="md:hidden">
                <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Crie sua conta</DrawerTitle>
                            <DrawerDescription>
                                Preencha os campos abaixo para criar sua conta no Fluxo.
                            </DrawerDescription>
                        </DrawerHeader>
                        <RegisterForm className="px-4" />
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

export function RegisterForm({ className }: React.ComponentProps<"form">) {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aceitouTermos, setAceitouTermos] = useState(false);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!aceitouTermos) return;
        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Opcional: Atualiza o perfil do usuário recém-criado com o nome digitado
            await updateProfile(userCredential.user, {
                displayName: nome
            });

            console.log("Usuário criado com sucesso!");

            router.push('/home');

        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError("Este email já está cadastrado.");
            } else if (err.code === 'auth/invalid-email') {
                setError("Formato de email inválido.");
            } else {
                setError("Ocorreu um erro ao criar a conta. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit}>
            <div className="grid gap-3">
                <Label htmlFor="nome">Nome</Label>
                <Input
                    type="text"
                    id="nome"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
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
                            Declaro que li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na página de Política de Privacidade da plataforma.
                        </FieldDescription>
                    </FieldContent>
                </Field>
            </FieldGroup>

            {/* Exibe mensagem de erro se houver */}
            {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

            <Button type="submit" variant="primary" size="sm" loading={isLoading} disabled={!aceitouTermos}>
                Criar conta
            </Button>
        </form>
    )
}