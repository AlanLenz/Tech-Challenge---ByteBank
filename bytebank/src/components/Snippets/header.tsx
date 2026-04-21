"use client"

import { useState, useEffect } from 'react'; // Adicionado useEffect
import { useRouter } from 'next/navigation'; // Adicionado useRouter para redirecionar no logout
import { useMediaQuery } from "@custom-react-hooks/use-media-query"
import RegisterModal from '../forms/register-form';
import LoginModal from '../forms/login-form';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"

// --- Importações do Firebase ---
import { auth } from "@/lib/firebase"; // Ajuste o caminho se necessário
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function Header() {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
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

  if (isDesktop) {
    return (
      <header>
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-20">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logomarca" width={150} height={83}/>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#sobre" className="text-[#004D61] font-bold hover:text-[#47a138] transition">Sobre</a>
              <a href="#servicos" className="text-[#004D61] font-bold hover:text-[#47a138] transition">Serviços</a>
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
                 <button 
                   onClick={handleLogout} 
                   className="cursor-pointer border-2 border-red-500 text-red-500 font-bold px-6 py-2 rounded hover:bg-red-500 hover:text-white transition"
                 >
                   Sair
                 </button>
               </div>
            ) : (
               // Se NÃO logado: Mostra botões de Cadastro e Login
               <>
                 <button onClick={() => setIsRegisterModalOpen(true)} className="cursor-pointer bg-[#47a138] text-black font-bold px-6 py-2 rounded hover:bg-[#004D61] hover:text-white hover:bg-opacity-90 transition">
                   Abrir minha conta
                 </button>
                 <button onClick={() => setIsLoginModalOpen(true)} className="cursor-pointer border-2 border-[#004D61] text-[#004D61] font-bold px-6 py-2 rounded hover:bg-[#47a138] hover:border-[#47a138] hover:text-white transition">
                   Já tenho conta
                 </button>
               </>
            )}
          </div>
        </nav>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
      </header>
    )
  } else {
    // VERSÃO MOBILE
    return (
      <header>
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
                       <Button onClick={handleLogout} variant="destructive">Sair da conta</Button>
                     </>
                  ) : (
                     <>
                       <Button onClick={() => setIsRegisterModalOpen(true)}>Abrir minha conta</Button>
                       <Button onClick={() => setIsLoginModalOpen(true)} variant="outline">Já tenho conta</Button>
                     </>
                  )}
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