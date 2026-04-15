"use client";
import Button from "../TransactionForm/Button";

type Props = {
  open: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
};

export default function FeedbackModal({ open, type, message, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] text-center">
        
        <h2 className="text-lg font-semibold mb-2">
          {type === "success" ? "Sucesso 🎉" : "Erro ❌"}
        </h2>

        <p className="mb-4">{message}</p>

        <Button
          onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
}