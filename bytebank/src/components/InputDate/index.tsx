import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputDateProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  bgColor?: string;
};

export default function InputDate({
  label,
  value,
  onChange,
  id,
  min,
  max,
  required = false,
  disabled = false,
  error,
  className,
  bgColor,
}: InputDateProps) {
  const [yearError, setYearError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw) {
      const year = raw.split("-")[0];
      if (year.length !== 4) {
        setYearError("O ano deve ter exatamente 4 dígitos.");
        return;
      }
    }
    setYearError("");
    onChange(raw);
  };

  const displayError = yearError || error;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        type="date"
        id={id}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
        aria-invalid={!!displayError}
        className="h-10 px-3 py-2 text-sm focus-visible:border-[#004D61] focus-visible:ring-[#004D61]/30 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      />
      {displayError && <p className="text-destructive text-xs">{displayError}</p>}
    </div>
  );
}
