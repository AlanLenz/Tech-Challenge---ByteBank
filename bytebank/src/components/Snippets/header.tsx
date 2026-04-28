"use client"

import { useState, useEffect } from 'react'; // Adicionado useEffect
import { useRouter } from 'next/navigation'; // Adicionado useRouter para redirecionar no logout
import RegisterModal from '../forms/register-form';
import LoginModal from '../forms/login-form';
import Button from "@/components/Button";
import Image from 'next/image';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"

// --- Importações do Firebase ---
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Header({className}: {className?: string}) {
  const router = useRouter();
  const { primary } = useThemeColors();
  
  // Estados dos modais
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // --- Novos estados para Autenticação ---
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Evita que os botões "pisquem" na tela

  // Efeito para monitorar se o usuário está logado ou não
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoadingAuth(false); // Terminou de checar
    });

    // Limpa o ouvinte quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  // Função de Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redireciona para a página inicial após sair
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return (
    <header className={className}>
      <div className='hidden md:block'>
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logomarca" width={150} height={83}/>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#sobre" className="font-bold transition" style={{ color: primary }}>Sobre</a>
              <a href="#servicos" className="font-bold transition" style={{ color: primary }}>Serviços</a>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Renderização Condicional com base no estado do usuário */}
            {isLoadingAuth ? (
               // Placeholder invisível enquanto o Firebase verifica o login (evita piscar botões)
               <div className="w-32 h-10"></div> 
            ) : user ? (
               // Se logado: Mostra saudação e botão Sair
               <div className="flex items-center gap-4">
                 <span className="text-white font-medium hidden lg:block">
                   Olá, {user.displayName || "Usuário"}
                 </span>
                 <Button variant="destructive" onClick={handleLogout}>
                   Sair
                 </Button>
               </div>
            ) : (
               // Se NÃO logado: Mostra botões de Cadastro e Login
               <>
                 <Button variant="primary" onClick={() => setIsRegisterModalOpen(true)}>
                   Abrir minha conta
                 </Button>
                 <Button variant="secondary" onClick={() => setIsLoginModalOpen(true)}>
                   Já tenho conta
                 </Button>
               </>
            )}
          </div>
        </nav>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      </div>
    
      <div className='md:hidden'>
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#47a138] rounded-sm"></div>
              <Image src="/logo.png" alt="Logomarca" width={150} height={83}/>
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
                <DrawerHeader className="flex flex-col gap-2">
                  {/* Renderização Condicional Mobile */}
                  {isLoadingAuth ? (
                     <p className="text-center text-sm text-gray-500">Carregando...</p>
                  ) : user ? (
                     <>
                       <p className="text-center font-bold mb-4">Olá, {user.displayName || "Usuário"}</p>
                       <Button onClick={handleLogout} variant="destructive" size="lg">Sair da conta</Button>
                     </>
                  ) : (
                     <>
                       <Button onClick={() => setIsRegisterModalOpen(true)} variant="primary" size="lg">Abrir minha conta</Button>
                       <Button onClick={() => setIsLoginModalOpen(true)} variant="secondary" size="lg">Já tenho conta</Button>
                     </>
                  )}
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