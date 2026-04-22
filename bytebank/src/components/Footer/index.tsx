"use client";
import Image from 'next/image';
import { Instagram, Youtube } from 'lucide-react';
import { useThemeColors } from "@/hooks/useThemeColors";

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

const FooterCustom = () => {
    const { primary } = useThemeColors();

    return (
        <footer className="text-white py-16" style={{ backgroundColor: primary }}>
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
                        <li>meajuda@fluxogestao.com.br</li>
                        <li>ouvidoria@fluxogestao.com.br</li>
                    </ul>
                </div>

                <div className="md:text-right flex flex-col items-md-end">
                    <div className="flex items-center gap-2 mb-6 md:justify-end">
                        <Image src="/logo.png" alt="Logomarca" width={150} height={83} />
                    </div>
                    <div className="flex gap-4 md:justify-end">
                        <Instagram className="w-6 h-6 cursor-pointer hover:text-[#47a138]" />
                        <Youtube className="w-6 h-6 cursor-pointer hover:text-[#47a138]" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterCustom;