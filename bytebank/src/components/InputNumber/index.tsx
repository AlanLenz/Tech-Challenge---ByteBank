import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { cn } from "@/lib/utils";

type InputNumberProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  bgColor?: string;
};

export default function InputNumber({
  label,
  value,
  onChange,
  onBlur,
  id,
  placeholder = "0,00",
  min,
  max,
  step,
  required = false,
  disabled = false,
  error,
  className,
  bgColor,
}: InputNumberProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");

    if (!onlyDigits) {
      onChange("");
      return;
    }

    const numericValue = Number(onlyDigits) / 100;

    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);

    onChange(formattedValue);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        type="text"
        inputMode="decimal"
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        aria-invalid={!!error}
        className="h-10 px-3 py-2 text-sm focus-visible:border-[#004D61] focus-visible:ring-[#004D61]/30"
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
