'use client'

import { useState } from "react"
import { SelectInput } from "@/src/components/SelectInput"
import { TextInput } from "@/src/components/TextInput"
import { Button } from "@/src/components/Buttom"

export function TransactionForm() {
  const [type, setType] = useState("")
  const [amount, setAmount] = useState("")

  return (
    <div className="p-4 bg-light rounded">
      <h2 className="mb-3">Nova transação</h2>

      <SelectInput
        value={type}
        onChange={(e) => setType(e.target.value)}
        options={[
          { value: "deposit", label: "Depósito" },
          { value: "transfer", label: "Transferência" }
        ]}
      />

      <TextInput
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="00,00"
      />

      <Button>Concluir transação</Button>
    </div>
  )
}