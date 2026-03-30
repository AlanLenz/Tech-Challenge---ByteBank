type Option = {
  value: string
  label: string
}

type SelectInputProps = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: Option[]
}

export function SelectInput({ value, onChange, options }: SelectInputProps) {
  return (
    <select className="form-select mb-3" value={value} onChange={onChange}>
      <option value="">Selecione</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}