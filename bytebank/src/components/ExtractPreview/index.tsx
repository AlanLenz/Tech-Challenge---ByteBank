"use client";

import Link from "next/link";

type Transfer = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "Deposit" | "Transfer";
};

type Props = {
  transfers?: Transfer[];
};

const ExtractPreview = ({ transfers = [] }: Props) => {
  const lastTransfers = [...transfers]
  .sort((a, b) => new Date (b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);
  return (
    <div className="w-[100%] bg-white rounded-lg p-6 self-start">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-black font-bold text-[26px]">Extrato</h2>
        <Link
          href="/extract"
          className="text-black font-semibold underline text-[14px]">
          Ver mais!
        </Link>
      </div>

      <ul className="space-y-4">
      {lastTransfers.map((item) => (
        <li key={item.id} className="flex flex-col">
          <div className="border-b border-gray-300 pb-2">
            
           
            <div className="flex justify-between items-center">
              <p className="text-black text-[16px]">
                {item.type === "Deposit"
                  ? "Depósito"
                  : "Transferência"}
              </p>

              <p className="text-gray-500 text-[12px]">
                {new Date(item.date).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <p
              className={`text-[14px] font-semibold ${
                item.type === "Deposit"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              R$ {item.amount}
            </p>

          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default ExtractPreview;