"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeClosed } from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useThemeColors } from "@/hooks/useThemeColors";

interface HeroProps {
  displayName?: string;
  balance?: string;
}

const Hero = ({ displayName, balance = 'R$ 2.500,00' }: HeroProps = {}) => {
  const { primary, white } = useThemeColors();
  const [showValue, setShowValue] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Usuário"); 

  const current = new Date().toLocaleDateString('en-GB');
  const dia = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });

  useEffect(() => {
    if (displayName !== undefined) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        const primeiroNome = user.displayName.split(' ')[0];
        setNomeUsuario(primeiroNome);
      } else {
        setNomeUsuario("Usuário");
      }
    });

    return () => unsubscribe();
  }, [displayName]);

  const resolvedName = displayName ?? nomeUsuario;

  return (
    <div className="relative w-[100%] rounded-lg p-8 h-[400px]" style={{ backgroundColor: primary }}>
      <p className="text-[24px] font-semibold mb-4" style={{ color: white }}>Olá, {resolvedName}! :)</p>
      <p className="text-[14px] font-normal capitalize" style={{ color: white }}>{dia}, {current}</p>
      
      <div className="w-[100%] flex justify-end pr-20">
        <div className="w-[190px]">
          <div className="flex gap-6 items-center">
            <p className="text-[20px] font-semibold" style={{ color: white }}>Saldo</p>
            {showValue ? (
              <Eye className="w-5 h-5 cursor-pointer" style={{ color: white }} onClick={() => setShowValue(false)} />
            ) : (
              <EyeClosed className="w-5 h-5 cursor-pointer" style={{ color: white }} onClick={() => setShowValue(true)} />
            )}
          </div>
          <div className="w-[100%] h-[1px] my-4" style={{ backgroundColor: white }} />
          <p className="text-[14px] font-normal" style={{ color: white }}>Conta Corrente</p>
          <p className="text-[32px] font-normal" style={{ color: white }}>{showValue ? balance : '****'}</p>
        </div>
      </div>
      
      <Image
        className="absolute bottom-6 left-8"
        src="/IllustrationHero.png"
        alt="Illustration"
        title="Illustration"
        width={280}
        height={220}
      />
      <Image
        className="absolute top-0 right-0"
        src="/PixelsHero1.png"
        alt="Pixels"
        title="Pixels"
        width={180}
        height={180}
      />
      <Image
        className="absolute bottom-0 left-0"
        src="/PixelsHero2.png"
        alt="Pixels"
        title="Pixels"
        width={180}
        height={180}
      />
    </div>
  );
};

export default Hero;