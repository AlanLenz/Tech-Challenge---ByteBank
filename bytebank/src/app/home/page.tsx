import type { Metadata } from "next";
import type { Transfer } from "@/types/transfer";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "ByteBank - Início",
  description:
    "Gerencie suas finanças com o ByteBank. Visualize seu saldo e registre transferências.",
};

export default async function Home() {
  let initialTransfers: Transfer[] = [];

  try {
    // O fetch é executado no servidor a cada requisição,
    // garantindo que o HTML já chegue ao navegador com os dados preenchidos.
    const response = await fetch("http://localhost:4000/transfers", {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      initialTransfers = Array.isArray(data) ? data : data.transfers ?? [];
    }
  } catch {
    // Servidor de dados offline
    // A página renderiza normalmente; o cliente assume o controle após a hidratação.
  }

  return <HomeClient initialTransfers={initialTransfers} />;
}