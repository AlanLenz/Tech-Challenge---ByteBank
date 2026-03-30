type TextInputProps = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <input
      type="number"
      className="form-control mb-3"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}