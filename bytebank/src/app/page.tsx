"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Monitora o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário logado: vai para a área restrita
        router.push("/home");
      } else {
        // Usuário deslogado: vai para a Landing Page
        router.push("/landingPage");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Enquanto verifica o status, podemos exibir uma tela de carregamento neutra
  return (
    <div className="min-h-screen bg-[#00474b] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-[#47a138] border-white/20 rounded-full animate-spin"></div>
        <p className="text-white font-bold">Carregando...</p>
      </div>
    </div>
  );
}