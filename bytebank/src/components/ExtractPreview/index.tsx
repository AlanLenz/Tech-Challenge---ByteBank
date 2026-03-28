import Link from "next/link";

const ExtractPreview = () => {

  const extractData = [
    {
      id: 1,
      title: "Compra no Supermercado",
      amount: "R$ 150,00",
      date: "18/08/2025",
      type: "Deposit",
    },
    {
      id: 2,
      title: "Consulta Médica",
      amount: "R$ 100,00",
      date: "21/10/2025",
      type: "Deposit",
    },
    {
      id: 3,
      title: "Pix para Maria",
      amount: "R$ 50,00",
      date: "02/11/2025",
      type: "Deposit",
    },
    {
      id: 4,
      title: "Restaurante",
      amount: "- R$ 500,00",
      date: "21/11/2025",
      type: "Transfer",
    },
  ];

  return (
    <div className="max-w-[282px] w-[100%] bg-white rounded-lg p-6 self-start">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-black font-bold text-[26px]">Extrato</h2>
        <Link href="/extract" className="text-black font-semibold decoration-1 underline text-[14px] cursor-pointer">Ver mais!</Link>
      </div>
      <ul className="space-y-4">
        {extractData.map((item) => (
          <li key={item.id} className="flex flex-col">
            <div className="border-b-[1px] border-gray-300 border-gray-500 pb-2">
              <p className="text-gray-500 text-[14px] font-semibold">Novembro</p>
              <div className="flex justify-between items-center my-1">
                <p className="text-black text-[16px]">{item.type === "Deposit" ? "Depósito" : "Transferência"}</p>
                <p className="text-gray-500 text-[12px]">{item.date}</p>
              </div>
              <p className={`text-[14px] ${item.type === "Deposit" ? "text-green-500" : "text-red-500"} font-semibold`}>{item.amount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExtractPreview;