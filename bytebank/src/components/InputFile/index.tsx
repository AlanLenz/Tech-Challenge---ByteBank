import { useRef } from "react";
import { Paperclip, Upload, X } from "lucide-react";
import { Label } from "@/components/Label";

type Props = {
  label?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
};

export default function InputFile({
  label = "Comprovante",
  value,
  onChange,
  accept = "image/*,application/pdf",
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="receipt-input">
        {label}{" "}
        <span className="font-normal text-gray-500">(opcional)</span>
      </Label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="bg-white flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 cursor-pointer transition-colors hover:border-gray-400 hover:bg-gray-50"
      >
        {value ? (
          <div className="flex w-full items-center justify-between gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2 min-w-0">
              <Paperclip className="w-4 h-4 shrink-0 text-gray-500" />
              <span className="truncate">{value.name}</span>
            </div>
            <button
              type="button"
              aria-label="Remover anexo"
              onClick={handleRemove}
              className="shrink-0 text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="w-5 h-5 text-gray-400" />
            <p className="text-sm text-gray-500">Clique para anexar um comprovante</p>
            <p className="text-xs text-gray-400">PDF, JPG, PNG ou outros formatos de imagem</p>
          </>
        )}
        <input
          ref={fileInputRef}
          id="receipt-input"
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}
