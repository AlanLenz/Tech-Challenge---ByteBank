"use client";

import { Transfer } from "@/types/transfer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
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
      categoria: "Financeiro",
      entradas: totalEntradas,
      saidas: totalSaidas,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Entradas x Saídas
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="categoria" />
            <YAxis />

            <Tooltip
              formatter={(value) =>
                Number(value ?? 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />

            <Legend />

            <Bar
              dataKey="entradas"
              name="Entradas"
              fill="#47A138"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="saidas"
              name="Saídas"
              fill="#FF5031"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}