"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Transfer } from "@/types/transfer";
import { CATEGORIES_MAP } from "@/types/transfer";
import { formatCurrency } from "@/utils/format";

const COLORS = [
  "#00897B", "#26A69A", "#4DB6AC", "#80CBC4",
  "#B2DFDB", "#00796B", "#004D40",
];

interface ExpenseCategoryChartProps {
  transfers: Transfer[];
}

export function ExpenseCategoryChart({ transfers }: ExpenseCategoryChartProps) {
  const chartData = Object.entries(
    transfers
      .filter((t) => t.type === "Transfer")
      .reduce((acc, t) => {
        const catId = t.categories_id || 7;
        const categoryName = CATEGORIES_MAP[catId] || "Outros";
        const numericAmount = Number(t.amount);

        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }
        acc[categoryName] += numericAmount;
        return acc;
      }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-center items-center h-[388px]">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Gastos por Categoria</h2>
        <p className="text-gray-400 text-sm font-medium">Nenhum gasto registrado neste período.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Gastos por Categoria</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              labelLine={false}
              label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [formatCurrency(value), "Total Gasto"]}
              contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}