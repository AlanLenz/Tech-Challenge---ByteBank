type Props = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function SelectInput({ label, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">{label}</label>

     <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white border border-gray-300 rounded-md p-3 outline-none focus:border-[#004D61]">
        <option value="">Selecione</option>
        <option value="deposito">Depósito</option>
        <option value="transferencia">Transferência</option>
      </select>
    </div>
  )
}
