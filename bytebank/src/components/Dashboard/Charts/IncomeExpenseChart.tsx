"use client";

import { Transfer } from "@/types/transfer";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IncomeExpenseChartProps {
  transfers: Transfer[];
}

export function IncomeExpenseChart({
  transfers,
}: IncomeExpenseChartProps) {
  const totalEntradas = transfers
    .filter((t) => t.type === "Deposit")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalSaidas = transfers
    .filter((t) => t.type === "Transfer")
    .reduce((acc, t) => acc + t.amount, 0);

  const data = [
    {
      name: "Entradas",
      valor: totalEntradas,
      fill: "var(--chart-income)",
    },
    {
      name: "Saídas",
      valor: totalSaidas,
      fill: "var(--chart-expense)",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="font-semibold mb-4">
        Entradas x Saídas
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar
  dataKey="valor"
  radius={[8, 8, 0, 0]}
>
  {data.map((entry, index) => (
    <Cell
      key={index}
      fill={entry.fill}
    />
  ))}
</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}