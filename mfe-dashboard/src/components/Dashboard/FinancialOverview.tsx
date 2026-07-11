import Image from "next/image";
import { MetricCard } from "./MetricCard";
import { Transfer } from "@/types/transfer";
import { formatCurrency } from "@/utils/format";
import ArrowDown from "../../../assets/arrow-sm-down-svgrepo-com.svg";
import ArrowUp from "../../../assets/arrow-sm-up-svgrepo-com.svg";
import GraphUp from "../../../assets/graph-up-svgrepo-com.svg";
import PaymentMethod from "../../../assets/payment-method-pay-svgrepo-com.svg";

interface FinancialOverviewProps {
  transfers: Transfer[];
}

export function FinancialOverview({ transfers }: FinancialOverviewProps) {
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
        value={formatCurrency(totalEntradas)}
        icon={
          <Image
            src={ArrowUp}
            alt="Transações"
            width={20}
            height={20}
          />
        }
      />
      <MetricCard
        title="Saídas"
        value={formatCurrency(totalSaidas)}
        icon={
          <Image
            src={ArrowDown}
            alt="Transações"
            width={20}
            height={20}
          />
        }
      />
      <MetricCard
        title="Maior Despesa"
        value={formatCurrency(maiorDespesa)}
        icon={
          <Image
            src={GraphUp}
            alt="Transações"
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