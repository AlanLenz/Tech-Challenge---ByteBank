"use client";

import { Transfer, TransferCategory } from "@/types/transfer";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CATEGORY_NAMES: Record<TransferCategory, string> = {
  food: "Alimentação",
  transport: "Transporte",
  housing: "Moradia",
  health: "Saúde",
  education: "Educação",
  leisure: "Lazer",
  others: "Outros",
};

const COLORS = [
  "#00897B",
  "#26A69A",
  "#4DB6AC",
  "#80CBC4",
  "#A5D6A7",
  "#66BB6A",
  "#2E7D32",
];

interface ExpenseCategoryChartProps {
  transfers: Transfer[];
}

export function ExpenseCategoryChart({
  transfers,
}: ExpenseCategoryChartProps) {
  const chartData = Object.entries(
    transfers
      .filter(
        (transfer): transfer is Transfer & { category: TransferCategory } =>
          transfer.type === "Transfer" && !!transfer.category
      )
      .reduce((acc, transfer) => {
        acc[transfer.category] =
          (acc[transfer.category] ?? 0) + transfer.amount;

        return acc;
      }, {} as Record<TransferCategory, number>)
  ).map(([category, value]) => ({
    name: CATEGORY_NAMES[category as TransferCategory],
    value,
  }));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Gastos por Categoria
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}