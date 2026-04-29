"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
// Assumindo que você tem esses componentes importados corretamente
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import Button from "../Button";
import ValueInput from "./ValueInput"
import Card from "./Card";
import FeedbackModal from "../FeedbackModal";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!type || !value || isNaN(Number(value)) || !description) {
        throw new Error("Preencha corretamente todos os campos.");
      }

      const dataFormatadaParaBanco = new Date().toISOString().split('T')[0];
      const newTransfer = {
        id: uuidv4(), // json-server até gera ID sozinho, mas podemos mandar o nosso
        description: description,
        amount: Number(value),
        date: dataFormatadaParaBanco,
        type: type,
      };

      // 1. Dispara a requisição POST para a nossa Fake API
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

      const savedTransfer = await response.json(); // O servidor devolve o item salvo

      // 2. Atualiza a tela chamando a prop do componente pai
      onAddTransfer(savedTransfer);

      setModalType("success");
      setModalMessage("Transação realizada com sucesso!");
      setModalOpen(true);

      // Limpa o formulário
      setType("");
      setValue("");
      setDescription("");

    } catch (error: unknown) {
      // ... seu tratamento de erro continua igual
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Nova transação</h2>

        <SelectInput
          label="Tipo de transação"
          value={type}
          onChange={(value) => setType(value as "Deposit" | "Transfer")}
        />

        <TextInput
          label="Descrição"
          value={description}
          onChange={setDescription}
        />

        <ValueInput
          label="Valor"
          value={value}
          onChange={setValue}
        />

        <Button type="submit" size="lg">
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