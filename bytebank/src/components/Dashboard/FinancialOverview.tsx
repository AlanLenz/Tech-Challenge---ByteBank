import Image from "next/image";
import { MetricCard } from "./MetricCard";
import { Transfer } from "@/types/transfer";

import ArrowDown from "../../../assets/icons/arrow-sm-down-svgrepo-com.svg";
import ArrowUp from "../../../assets/icons/arrow-sm-up-svgrepo-com.svg";
import GraphUp from "../../../assets/icons/graph-up-svgrepo-com.svg";
import PaymentMethod from "../../../assets/icons/payment-method-pay-svgrepo-com.svg";

interface FinancialOverviewProps {
  transfers: Transfer[];
}

export function FinancialOverview({
  transfers,
}: FinancialOverviewProps) {
  const totalEntradas = transfers
    .filter((t) => t.type === "Deposit")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalSaidas = transfers
    .filter((t) => t.type === "Transfer")
    .reduce((acc, t) => acc + t.amount, 0);

  const maiorDespesa = Math.max(
  ...transfers
    .filter((t) => t.type === "Transfer")
    .map((t) => t.amount),
  0
);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard
        title="Entradas"
        value={`R$ ${totalEntradas.toFixed(2)}`}
        icon={
          <Image
            src={ArrowUp}
            alt="Entradas"
            width={20}
            height={20}
          />
        }
      />

      <MetricCard
        title="Saídas"
        value={`R$ ${totalSaidas.toFixed(2)}`}
        icon={
          <Image
            src={ArrowDown}
            alt="Saídas"
            width={20}
            height={20}
          />
        }
      />

      <MetricCard
        title="Maior Despesa"
        value={`R$ ${maiorDespesa.toFixed(2)}`}
        icon={
          <Image
            src={GraphUp}
            alt="maiorDespesa"
            width={20}
            height={20}
          />
        }
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