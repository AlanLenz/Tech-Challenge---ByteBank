type Props = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function ValueInput({ label, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">{label}</label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="00,00"
        className="bg-white border border-gray-300 rounded-md p-3 outline-none focus:border-[#004D61]"/>
    </div>
  )
}