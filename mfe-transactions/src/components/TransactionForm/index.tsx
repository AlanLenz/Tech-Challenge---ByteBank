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

// 1. O formulário não importa mais o 'transferService'. Ele apenas define um contrato!
type Props = {
  onSubmitTransfer: (
    transferData: Omit<Transfer, 'id' | 'receipt_url'>, 
    receiptFile: File | null
  ) => Promise<void>;
};

export default function TransactionForm({ onSubmitTransfer }: Props) {
  const [type, setType] = useState<"Deposit" | "Transfer" | "">("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
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
      // 2. Monta apenas os dados puros. A URL do comprovante será resolvida pelo Shell.
      const transferPayload = {
        description: description.trim(),
        amount: numericValue,
        date: date,
        type: type as "Deposit" | "Transfer",
        categories_id: Number(categoryId) as CategoryId,
      };

      // 3. Dispara a função injetada pelo Host (bytebank) passando os dados e o arquivo físico
      await onSubmitTransfer(transferPayload, receipt);

      // Se a promise resolver, o Shell fez o upload e salvou no banco com sucesso!
      setModalType("success");
      setModalMessage("Transação realizada com sucesso!");
      setModalOpen(true);

      // Limpa o formulário
      setType("");
      setValue("");
      setDescription("");
      setDate("");
      setCategoryId("");
      setReceipt(null);
      setTouched({ type: false, value: false, description: false, date: false, category: false });

    } catch (error: unknown) {
      console.error(error);
      // Se a promise rejeitar (erro de Auth, erro no upload, etc), o MFE exibe o erro
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