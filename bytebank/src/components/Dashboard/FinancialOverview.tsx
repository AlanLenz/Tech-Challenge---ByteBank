import Image from "next/image";
import { MetricCard } from "./MetricCard";
import { Transfer } from "@/types/transfer";
import { formatCurrency } from "@/utils/format";

import ArrowDown from "../../../assets/icons/arrow-sm-down-svgrepo-com.svg";
import ArrowUp from "../../../assets/icons/arrow-sm-up-svgrepo-com.svg";
import GraphUp from "../../../assets/icons/graph-up-svgrepo-com.svg";
import PaymentMethod from "../../../assets/icons/payment-method-pay-svgrepo-com.svg";

interface FinancialOverviewProps {
  transfers: Transfer[];
}

export function FinancialOverview({ transfers }: FinancialOverviewProps) {
  // 2. Garanta que estamos somando números, não concatenando strings
  const totalEntradas = transfers
    .filter((t) => t.type === "Deposit")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalSaidas = transfers
    .filter((t) => t.type === "Transfer")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const maiorDespesa = Math.max(
    ...transfers
      .filter((t) => t.type === "Transfer")
      .map((t) => Number(t.amount)),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard
        title="Entradas"
        value={formatCurrency(totalEntradas)} // 3. USO DA FUNÇÃO SEGURA
      />
      <MetricCard
        title="Saídas"
        value={formatCurrency(totalSaidas)} // 3. USO DA FUNÇÃO SEGURA
      />
      <MetricCard
        title="Maior Despesa"
        value={formatCurrency(maiorDespesa)} // 3. USO DA FUNÇÃO SEGURA
      />

      <MetricCard
        title="Transações"
        value={transfers.length.toString()}
        icon={
          <Image
            src={PaymentMethod}
            alt="Transações"
            width={20}
            height={20}
          />
        }
      />
    </div>
  );
}