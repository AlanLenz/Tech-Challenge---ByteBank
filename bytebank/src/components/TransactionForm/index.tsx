"use client";

import { useState } from "react";
import InputFile from "@/components/InputFile";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import InputNumber from "@/components/InputNumber";
import InputDate from "@/components/InputDate";
import Button from "../Button";
import Card from "./Card";
import FeedbackModal from "../FeedbackModal";
import { useThemeColors } from "@/hooks/useThemeColors";
import type { Transfer, CategoryId } from "@/types/transfer";
import { transferService } from "@/services/transfers"; 

type Props = {
  onAddTransfer: (transfer: Transfer) => void;
};

export default function TransactionForm({ onAddTransfer }: Props) {
  const [type, setType] = useState<"Deposit" | "Transfer" | "">("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">(""); // <-- Changed to store Numbers!
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [touched, setTouched] = useState({ type: false, value: false, description: false, date: false, category: false });
  const [receipt, setReceipt] = useState<File | null>(null);
  const { white } = useThemeColors();

  const numericValue = value ? Number(value.replace(/\./g, "").replace(",", ".")) : 0;

  const errors = {
    type: !type ? "Selecione o tipo de transação." : "",
    description: !description.trim() ? "Informe uma descrição." : "",
    value: !value || isNaN(numericValue) || numericValue <= 0
      ? "Informe um valor válido maior que zero."
      : "",
    date: !date ? "Selecione uma data." : "",
    category: !categoryId ? "Selecione uma categoria." : "",
  };

  const isFormValid = !errors.type && !errors.description && !errors.value && !errors.date && !errors.category;

  const handleBlur = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ type: true, value: true, description: true, date: true, category: true });
    if (!isFormValid) return;

    try {
      // --- 1. UPLOAD ATTACHMENT TO VERCEL BLOB FIRST ---
      let receiptUrl: string | undefined = undefined;

      if (receipt) {
        const uploadResponse = await fetch(
          `/api/upload?filename=${encodeURIComponent(receipt.name)}`,
          {
            method: 'POST',
            body: receipt,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Falha ao fazer o upload do anexo para a Vercel");
        }

        const blobResult = await uploadResponse.json();
        receiptUrl = blobResult.url; 
      }

      // --- 2. ASSEMBLE PAYLOAD FOR THE SERVICE ---
      // We don't generate an ID here; Postgres 'SERIAL' will create it!
      const transferPayload = {
        description: description.trim(),
        amount: numericValue,
        date: date,
        type: type as "Deposit" | "Transfer",
        categories_id: Number(categoryId) as CategoryId,
        receipt_url: receiptUrl, 
      };

      // --- 3. FIRE CLEAN SERVICE REQUEST ---
      const savedTransfer = await transferService.create(transferPayload);

      // Pass the fully constructed DB object (now equipped with its real Postgres ID) to the UI
      onAddTransfer(savedTransfer);

      setModalType("success");
      setModalMessage("Transação realizada com sucesso!");
      setModalOpen(true);

      // Reset form
      setType("");
      setValue("");
      setDescription("");
      setDate("");
      setCategoryId("");
      setReceipt(null);
      setTouched({ type: false, value: false, description: false, date: false, category: false });

    } catch (error: unknown) {
      console.error(error);
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

        <InputDate
          label="Data"
          value={date}
          onChange={setDate}
          bgColor={white}
          error={touched.date ? errors.date : ""}
          required
        />

        <InputSelect
          label="Categoria"
          value={categoryId === "" ? "" : String(categoryId)}
          onChange={(value) => { setCategoryId(Number(value)); handleBlur("category"); }}
          options={[
            { value: '1', label: 'Alimentação' },
            { value: '2', label: 'Transporte' },
            { value: '3', label: 'Moradia' },
            { value: '4', label: 'Saúde' },
            { value: '5', label: 'Educação' },
            { value: '6', label: 'Lazer' },
            { value: '7', label: 'Outros' },
          ]}
          bgColor={white}
          size="lg"
          error={touched.category ? errors.category : ""}
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