"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/utils/format";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function IncomeExpenseChart() {
  const transfers = useSelector((state: RootState) => state.transfers.list);

  const totalEntradas = transfers
    .filter((t) => t.type === "Deposit")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const totalSaidas = transfers
    .filter((t) => t.type === "Transfer")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const data = [
    {
      name: "Entradas",
      valor: Number(totalEntradas.toFixed(2)),
      fill: "var(--chart-income)",
    },
    {
      name: "Saídas",
      valor: Number(totalSaidas.toFixed(2)),
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
            <Tooltip 
              formatter={(value: any) => [formatCurrency(value), "Valor"]}
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
            />

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