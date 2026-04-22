"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCircle, LogOut } from "lucide-react";
import Image from 'next/image';
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useThemeColors } from "@/hooks/useThemeColors";

const Header = () => {
  const { primary } = useThemeColors();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <header className="text-white" style={{ backgroundColor: primary }}>
      <div className="container mx-auto flex items-center justify-between px-6 h-24">
        <Link href="/home" className="flex items-center gap-2 cursor-pointer">
          <Image className="white-logo" src="/logo.png" alt="Logomarca" width={110} height={61} />
        </Link>

        <div className="flex items-center gap-6 md:gap-10">
          {isLoading ? (
            <div className="h-4 w-32 animate-pulse rounded" style={{ backgroundColor: primary }}></div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-[13px] hidden sm:block">
                  {user?.displayName || "Usuário"}
                </p>
                <UserCircle className="w-6 h-6" />
              </div>

              {/* AlertDialog de confirmação de logout */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className="cursor-pointer flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors"
                    title="Sair da conta"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Sair</span>
                  </button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você será desconectado da sua conta e redirecionado para a página inicial.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Sair
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;