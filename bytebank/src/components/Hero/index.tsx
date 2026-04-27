"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeClosed } from 'lucide-react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Importamos a sua função de formatação de moeda para manter o padrão
import { formatCurrency } from "@/utils/format";

// Definimos o tipo básico que precisamos para o cálculo
interface Transfer {
  amount: number;
  type: "Deposit" | "Transfer";
}

const Hero = () => {
  const [showValue, setShowValue] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  // Novo estado para guardar o valor do saldo calculado
  const [saldo, setSaldo] = useState<number>(0);

  const current = new Date().toLocaleDateString('en-GB');
  const dia = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });

  // 1. Efeito para buscar os dados do usuário no Firebase (Mantido)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        const primeiroNome = user.displayName.split(' ')[0];
        setNomeUsuario(primeiroNome);
      } else {
        setNomeUsuario("Usuário");
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Novo Efeito para buscar as transferências e calcular o saldo
  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        // Busca o mesmo arquivo JSON usado na lista
        const response = await fetch('http://localhost:4000/transfers');
        if (!response.ok) throw new Error('Erro ao buscar dados');

        const data: Transfer[] = await response.json();

        // Faz o cálculo: soma os depósitos e subtrai as transferências
        const saldoCalculado = data.reduce((acc, item) => {
          if (item.type === "Deposit") {
            return acc + item.amount;
          } else {
            return acc - item.amount;
          }
        }, 0);

        setSaldo(saldoCalculado);
      } catch (error) {
        console.error("Erro ao calcular saldo:", error);
      }
    };

    fetchSaldo();
  }, []);

  return (
    <div className="relative w-[100%] bg-[#004D61] rounded-lg p-8 h-[400px]">
      <p className="text-white text-[24px] font-semibold mb-4">Olá, {nomeUsuario}! :)</p>
      <p className="text-white text-[14px] font-normal capitalize">{dia}, {current}</p>

      <div className="w-[100%] flex justify-end pr-20 mobile-balance">
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

          {/* Aqui exibimos o saldo dinâmico usando a sua função de formatação */}
          <p className="text-white text-[32px] font-normal">
            {showValue ? formatCurrency(saldo) : '****'}
          </p>
        </div>
      </div>

      <Image
        className="absolute bottom-6 left-8 mobile-hidden"
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