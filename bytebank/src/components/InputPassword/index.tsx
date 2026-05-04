"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputPasswordProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  bgColor?: string;
};

export default function InputPassword({
  label,
  value,
  onChange,
  id,
  placeholder = "••••••••",
  required = false,
  disabled = false,
  error,
  className,
  bgColor,
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          className="h-10 px-3 py-2 pr-10 text-sm focus-visible:border-[#004D61] focus-visible:ring-[#004D61]/30"
          style={bgColor ? { backgroundColor: bgColor } : undefined}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-[#004D61] transition-colors disabled:pointer-events-none"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
