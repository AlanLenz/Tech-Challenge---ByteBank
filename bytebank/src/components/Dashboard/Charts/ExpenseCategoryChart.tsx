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
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const COLORS = [
  "#00897B", // Alimentação
  "#26A69A", // Transporte
  "#4DB6AC", // Moradia
  "#80CBC4", // Saúde
  "#B2DFDB", // Educação
  "#00796B", // Lazer
  "#004D40", // Outros
];

export function ExpenseCategoryChart() {
  const transfers = useSelector((state: RootState) => state.transfers.list);
  
  const chartData = Object.entries(
    transfers
      // Filtramos apenas os gastos/saídas
      .filter((t) => t.type === "Transfer")
      // Agrupamos e somamos por categoria
      .reduce((acc, t) => {
        const catId = t.categories_id || 7; // Fallback para 7 (Outros) caso venha nulo
        const categoryName = CATEGORIES_MAP[catId] || "Outros";
        const numericAmount = Number(t.amount); // Forçamos conversão contra a string do Postgres

        if (!acc[categoryName]) {
          acc[categoryName] = 0;
        }
        acc[categoryName] += numericAmount;
        return acc;
      }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name,
    // Arredondamos o valor para evitar dízimas periódicas flutuantes no gráfico
    value: Number(value.toFixed(2)), 
  }));

  // Se o usuário não tiver nenhum gasto registrado ainda, exibe um estado amigável
  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-center items-center h-[388px]">
        <h2 className="text-lg font-semibold mb-4 self-start">Gastos por Categoria</h2>
        <p className="text-gray-400 text-sm font-medium">Nenhum gasto registrado neste período.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Gastos por Categoria
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData} // <-- Dados dinâmicos injetados aqui
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              labelLine={false}
              // Formata o rótulo que fica em cima das fatias do gráfico
              label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* 3. Customização do Tooltip para exibir em Reais (BRL) usando sua função utilitária */}
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