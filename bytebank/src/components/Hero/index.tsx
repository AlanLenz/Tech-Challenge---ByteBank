import Image from 'next/image';
import { Eye } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-[100%] bg-[#004D61] rounded-lg p-8 h-[400px]">
      <p className="text-white text-[24px] font-semibold mb-4">Olá, Joana! :)</p>
      <p className="text-white text-[14px] font-normal">Quinta-feira, 08/09/2024</p>
      <div className="w-[100%] flex justify-end pr-20">
        <div className="w-[190px]">
          <div className="flex gap-6 items-center">
            <p className="text-white text-[20px] font-semibold">Saldo</p>
            <Eye className="w-5 h-5 text-white cursor-pointer" />
          </div>
          <div className="w-[100%] h-[1px] bg-white my-4" />
          <p className="text-white text-[14px] font-normal">Conta Corrente</p>
          <p className="text-white text-[32px] font-normal">R$ 2.500,00</p>
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