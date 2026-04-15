"use client";

import { useTransfers } from "@/hooks/useTransfers";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import Button from "./Button";
import Card from "./Card";
import FeedbackModal from "../FeedbackModal";

export default function TransactionForm() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalMessage, setModalMessage] = useState("");

  const { addTransfer } = useTransfers();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!type || !value || isNaN(Number(value))) {
        throw new Error("Preencha corretamente os campos");
      }

      addTransfer({
        id: uuidv4(),
        description: "Transação",
        amount: Number(value),
        date: new Date().toISOString(),
        type: type as "Deposit" | "Transfer",
      });

      setModalType("success");
      setModalMessage("Transação realizada com sucesso!");
      setModalOpen(true);

      setType("");
      setValue("");

    } catch (error: unknown) {
      setModalType("error");

      if (error instanceof Error) {
        setModalMessage(error.message);
      } else {
        setModalMessage("Erro inesperado");
      }

      setModalOpen(true);
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Nova transação</h2>

        <SelectInput
          label="Tipo de transação"
          value={type}
          onChange={setType}
        />

        <TextInput
          label="Valor"
          value={value}
          onChange={setValue}
        />

        <Button type="submit">
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