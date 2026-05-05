import './globals.css';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";


const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={cn("font-sans", inter.variable) + ' scroll-smooth'}>
      <body>
        {children}
      </body>
    </html>
  )
}