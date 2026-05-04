import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

type InputSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  bgColor?: string;
  size?: "default" | "lg";
};

export default function InputSelect({
  label,
  value,
  onChange,
  options,
  id,
  placeholder = "Selecione",
  required = false,
  disabled = false,
  error,
  className,
  bgColor,
  size = "default",
}: InputSelectProps) {
  const isLg = size === "lg";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          aria-invalid={!!error}
          className={cn(
            "w-full focus-visible:border-[#004D61] focus-visible:ring-[#004D61]/30",
            isLg
              ? "!h-10 px-3 py-2 text-sm"
              : "px-2 py-1.5 text-xs"
          )}
          style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
