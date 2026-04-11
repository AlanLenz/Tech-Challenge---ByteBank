'use client'

import { useState } from 'react'
import SelectInput from './SelectInput'
import TextInput from './TextInput'
import Button from './Button'
import Card from './Card'

export default function TransactionForm() {
  const [type, setType] = useState('')
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    console.log({
      type,
      value
    })
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Nova transação</h2>

        <SelectInput
          label="Tipo de transação"
          value={type}
          onChange={setType}/>

        <TextInput
          label="Valor"
          value={value}
          onChange={setValue}/>

        <Button type="submit">
          Concluir transação
        </Button>
      </form>
    </Card>
  )
}