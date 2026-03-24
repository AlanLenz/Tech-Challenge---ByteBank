import Image from "next/image";
import { Gift, Landmark, Star, Smartphone, Instagram, Youtube } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen font-sans selection:bg-green-200">
      {/* Fundo com Gradiente Conforme a Imagem */}
      <div className="bg-gradient-to-b from-[#00474b] via-[#00767c] to-white">
        
        {/* Navbar */}
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#47a138] rounded-sm"></div> {/* Logo Placeholder */}
              <span className="text-[#47a138] text-xl font-bold">Bytebank</span>
            </div>
            <div className="hidden md:flex gap-6">
              <a href="#" className="text-white hover:text-gray-200 transition">Sobre</a>
              <a href="#" className="text-white hover:text-gray-200 transition">Serviços</a>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="bg-[#47a138] text-black font-bold px-6 py-2 rounded hover:bg-opacity-90 transition">
              Abrir minha conta
            </button>
            <button className="border-2 border-[#47a138] text-[#47a138] font-bold px-6 py-2 rounded hover:bg-[#47a138] hover:text-white transition">
              Já tenho conta
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Experimente mais liberdade no controle da sua vida financeira. 
              Crie sua conta com a gente!
            </h1>
          </div>
          <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
            {/* Representação da ilustração da imagem */}
            <div className="relative w-full max-w-md aspect-video bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
               <p className="text-white/50 italic">[ Ilustração Financeira ]</p>
            </div>
          </div>
        </header>
      </div>

      {/* Seção de Vantagens */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Vantagens do nosso banco:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <Feature 
            icon={<Gift className="w-12 h-12 text-[#47a138]" />}
            title="Conta e cartão gratuitos"
            desc="Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."
          />
          <Feature 
            icon={<Landmark className="w-12 h-12 text-[#47a138]" />}
            title="Saques sem custo"
            desc="Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h."
          />
          <Feature 
            icon={<Star className="w-12 h-12 text-[#47a138]" />}
            title="Programa de pontos"
            desc="Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"
          />
          <Feature 
            icon={<Smartphone className="w-12 h-12 text-[#47a138]" />}
            title="Seguro Dispositivos"
            desc="Seus dispositivos móveis protegidos por uma mensalidade simbólica."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-bold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Conta corrente</li>
              <li>Conta PJ</li>
              <li>Cartão de crédito</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>0800 004 250 08</li>
              <li>meajuda@bytebank.com.br</li>
              <li>ouvidoria@bytebank.com.br</li>
            </ul>
          </div>

          <div className="md:text-right flex flex-col items-md-end">
            <p className="text-sm mb-4">Desenvolvido por Alura</p>
            <div className="flex items-center gap-2 mb-6 md:justify-end">
               <div className="w-6 h-6 bg-[#47a138] rounded-sm"></div>
               <span className="font-bold">Bytebank</span>
            </div>
            <div className="flex gap-4 md:justify-end">
              <Instagram className="w-6 h-6 cursor-pointer hover:text-[#47a138]" />
              <Youtube className="w-6 h-6 cursor-pointer hover:text-[#47a138]" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

// 2. Aplicamos a interface na desestruturação
function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-[#47a138] font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}