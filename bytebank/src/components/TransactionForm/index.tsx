"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import InputFile from "@/components/InputFile";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import InputNumber from "@/components/InputNumber";
import Button from "../Button";
import Card from "./Card";
import FeedbackModal from "../FeedbackModal";
import { useThemeColors } from "@/hooks/useThemeColors";

type Transfer = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "Deposit" | "Transfer";
};

type Props = {
  onAddTransfer: (transfer: Transfer) => void;
};

export default function TransactionForm({ onAddTransfer }: Props) {
  const [type, setType] = useState<"Deposit" | "Transfer" | "">("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [touched, setTouched] = useState({ type: false, value: false, description: false });
  const [receipt, setReceipt] = useState<File | null>(null);
  const { white } = useThemeColors();

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // 1. Criamos a variável que converte a string formatada em número puro
  const numericValue = value ? Number(value.replace(/\./g, "").replace(",", ".")) : 0;

  // 2. Usamos a variável na validação para o código ficar mais limpo
  const errors = {
    type: !type ? "Selecione o tipo de transação." : "",
    description: !description.trim() ? "Informe uma descrição." : "",
    value: !value || isNaN(numericValue) || numericValue <= 0
      ? "Informe um valor válido maior que zero."
      : "",
  };

  const isFormValid = !errors.type && !errors.description && !errors.value;

  const handleBlur = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ type: true, value: true, description: true });
    if (!isFormValid) return;

    try {
      const dataFormatadaParaBanco = new Date().toISOString().split('T')[0];
      const newTransfer: Record<string, unknown> = {
        id: uuidv4(),
        description: description,
        amount: numericValue,
        date: dataFormatadaParaBanco,
        type: type as "Deposit" | "Transfer",
      };

      if (receipt) {
        newTransfer.receiptName = receipt.name;
        newTransfer.receiptType = receipt.type;
        newTransfer.receiptData = await fileToBase64(receipt);
      }

      const response = await fetch('http://localhost:4000/transfers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransfer),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar no servidor.");
      }

      const savedTransfer = await response.json(); 

      onAddTransfer(savedTransfer);

      setModalType("success");
      setModalMessage("Transação realizada com sucesso!");
      setModalOpen(true);

      setType("");
      setValue("");
      setDescription("");
      setReceipt(null);
      setTouched({ type: false, value: false, description: false });

    } catch {
      setModalType("error");
      setModalMessage("Erro ao tentar salvar a transação.");
      setModalOpen(true);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Nova transação</h2>

        <InputSelect
          label="Tipo de transação"
          value={type}
          onChange={(value) => { setType(value as "Deposit" | "Transfer"); handleBlur("type"); }}
          options={[
            { value: 'Deposit', label: 'Depósito' },
            { value: 'Transfer', label: 'Transferência' },
          ]}
          bgColor={white}
          size="lg"
          error={touched.type ? errors.type : ""}
          required
        />

        <InputText
          label="Descrição"
          placeholder="Descreva aqui"
          value={description}
          onChange={setDescription}
          bgColor={white}
          error={touched.description ? errors.description : ""}
          onBlur={() => handleBlur("description")}
          required
        />

        <InputNumber
          label="Valor"
          value={value}
          onChange={setValue}
          bgColor={white}
          error={touched.value ? errors.value : ""}
          onBlur={() => handleBlur("value")}
          required
        />

        <InputFile value={receipt} onChange={setReceipt} />

        <Button type="submit" size="lg" disabled={!isFormValid}>
          Concluir transação
        </Button>

        <FeedbackModal
          open={modalOpen}
          type={modalType}
          message={modalMessage}
          onClose={() => setModalOpen(false)}
        />
      </form>
    </Card>
  );
}