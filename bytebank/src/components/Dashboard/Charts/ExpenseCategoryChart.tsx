"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "Alimentação",
    value: 800,
  },
  {
    name: "Transporte",
    value: 400,
  },
  {
    name: "Moradia",
    value: 1200,
  },
  {
    name: "Lazer",
    value: 300,
  },
];

const COLORS = [
  "#00897B",
  "#26A69A",
  "#4DB6AC",
  "#80CBC4",
];

export function ExpenseCategoryChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Gastos por Categoria
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {data.map((entry, index) => (
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