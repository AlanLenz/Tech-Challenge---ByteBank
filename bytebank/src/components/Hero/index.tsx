"use client";

import { useState, useEffect } from 'react'; // Importamos o useEffect
import Image from 'next/image';
import { Eye, EyeClosed } from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useThemeColors } from "@/hooks/useThemeColors";

const Hero = () => {
  const { primary, white } = useThemeColors();
  const [showValue, setShowValue] = useState(false);
  // Novo estado para guardar o nome do usuário
  const [nomeUsuario, setNomeUsuario] = useState("Usuário"); 

  const current = new Date().toLocaleDateString('en-GB');
  const dia = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });

  // Efeito para buscar os dados do usuário no Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        // Pega apenas o primeiro nome da pessoa para a saudação
        const primeiroNome = user.displayName.split(' ')[0];
        setNomeUsuario(primeiroNome);
      } else {
        setNomeUsuario("Usuário");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative w-[100%] rounded-lg p-8 h-[400px]" style={{ backgroundColor: primary }}>
      {/* Aqui substituímos 'Joana' pela variável dinâmica */}
      <p className="text-white text-[24px] font-semibold mb-4">Olá, {nomeUsuario}! :)</p>
      <p className="text-white text-[14px] font-normal capitalize">{dia}, {current}</p>
      
      <div className="w-[100%] flex justify-end pr-20">
        <div className="w-[190px]">
          <div className="flex gap-6 items-center">
            <p className="text-white text-[20px] font-semibold">Saldo</p>
            {showValue ? (
              <Eye className="w-5 h-5 text-white cursor-pointer" onClick={() => setShowValue(false)} />
            ) : (
              <EyeClosed className="w-5 h-5 text-white cursor-pointer" onClick={() => setShowValue(true)} />
            )}
          </div>
          <div className="w-[100%] h-[1px] bg-white my-4" />
          <p className="text-white text-[14px] font-normal">Conta Corrente</p>
          <p className="text-white text-[32px] font-normal">{showValue ? 'R$ 2.500,00' : '****'}</p>
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