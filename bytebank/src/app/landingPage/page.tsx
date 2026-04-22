// "use client";
// import { useRouter } from 'next/navigation';
import { Gift, Landmark, Star, Smartphone } from 'lucide-react';
import HeaderCustom from '@/components/Snippets/header';
import FooterCustom from '@/components/Footer';
import type { Metadata } from 'next';
import Image from 'next/image';
import { useThemeColors } from "@/hooks/useThemeColors";

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

export const metadata: Metadata = {
    title: 'Fluxo - Gestão Financeira',
    description: '...',
}

export default function BytebankTailwind() {
    // const router = useRouter();
    const { highlight, primary } = useThemeColors();

    return (
        <div className="min-h-screen font-sans selection:bg-green-200">
            <div style={{ background: `linear-gradient(to bottom, white, ${primary}, ${highlight})` }}>
                <HeaderCustom></HeaderCustom>
                <section id="sobre" className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Experimente mais liberdade no controle da sua vida financeira.
                            Crie sua conta com a gente!
                        </h1>
                    </div>
                    <div className="md:w-1/2 flex justify-center mt-12 md:mt-0">
                        <div className="relative w-full aspect-video backdrop-blur-sm flex items-center justify-center">
                            <Image src="/ilustracao-lp.png" alt="Logomarca" className='rounded-lg ' width={660} height={251} />
                        </div>
                    </div>
                </section>
            </div>

            <section id="servicos" className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-12" style={{ color: primary }}>Vantagens da nossa plataforma:</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <Feature
                        icon={<Gift className="w-12 h-12" style={{ color: highlight }} />}
                        title="Conta e cartão gratuitos"
                        desc="Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."
                    />
                    <Feature
                        icon={<Landmark className="w-12 h-12" style={{ color: highlight }} />}
                        title="Saques sem custo"
                        desc="Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h."
                    />
                    <Feature
                        icon={<Star className="w-12 h-12" style={{ color: highlight }} />}
                        title="Programa de pontos"
                        desc="Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"
                    />
                    <Feature
                        icon={<Smartphone className="w-12 h-12" style={{ color: highlight }} />}
                        title="Seguro Dispositivos"
                        desc="Seus dispositivos móveis protegidos por uma mensalidade simbólica."
                    />
                </div>
            </section>

            <FooterCustom/>

        </div>
    );
}

function Feature({ icon, title, desc }: FeatureProps) {
    const { primary } = useThemeColors();

    return (
        <div className="flex flex-col items-center">
            <div className="feature-icon mb-4">{icon}</div>
            <h3 className="font-bold text-[21px] mb-2" style={{ color: primary }}>{title}</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed">{desc}</p>
        </div>
    );
}