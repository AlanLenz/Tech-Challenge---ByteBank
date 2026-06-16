import { useRef, useState } from "react";
import { Paperclip, Upload, X } from "lucide-react";
import { Label } from "@/components/Label";

type Props = {
  label?: string;
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // em bytes
  error?: string;
};

export default function InputFile({
  label = "Comprovante",
  value,
  onChange,
  accept = "image/*,application/pdf",
  maxSize = 5 * 1024 * 1024, // 5MB padrão
  error,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState<string>("");

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getAcceptedTypes = (): string[] => {
    return accept.split(",").map((type) => type.trim());
  };

  const validateFile = (file: File): string => {
    // Validação de tamanho
    if (file.size > maxSize) {
      return `Arquivo muito grande. Tamanho máximo: ${formatFileSize(maxSize)}`;
    }

    // Validação de tipo
    const acceptedTypes = getAcceptedTypes();
    const fileType = file.type;
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    const isValidType = acceptedTypes.some((acceptedType) => {
      if (acceptedType === "*") return true;
      if (acceptedType.endsWith("/*")) {
        const category = acceptedType.split("/")[0];
        return fileType.startsWith(`${category}/`);
      }
      if (acceptedType.startsWith(".")) {
        return acceptedType.toLowerCase() === fileExtension;
      }
      return acceptedType === fileType;
    });

    if (!isValidType) {
      return "Tipo de arquivo não permitido.";
    }

    return "";
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setValidationError("");
      onChange(null);
      return;
    }

    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      onChange(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setValidationError("");
    onChange(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setValidationError("");
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const displayError = validationError || error;
  const hasError = !!displayError;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="receipt-input">
        {label}{" "}
        <span className="font-normal text-gray-500">(opcional)</span>
      </Label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`bg-white flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 cursor-pointer transition-colors ${
          hasError
            ? "border-red-300 hover:border-red-400 bg-red-50"
            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        {value ? (
          <div className="flex w-full items-center justify-between gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2 min-w-0">
              <Paperclip className="w-4 h-4 shrink-0 text-gray-500" />
              <span className="truncate">{value.name}</span>
              <span className="text-xs text-gray-400 shrink-0">
                ({formatFileSize(value.size)})
              </span>
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
            <Upload className={`w-5 h-5 ${hasError ? "text-red-400" : "text-gray-400"}`} />
            <p className={`text-sm ${hasError ? "text-red-600" : "text-gray-500"}`}>
              Clique para anexar um comprovante
            </p>
            <p className="text-xs text-gray-400">
              PDF, JPG, PNG ou outros formatos de imagem (máx. {formatFileSize(maxSize)})
            </p>
          </>
        )}
        <input
          ref={fileInputRef}
          id="receipt-input"
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />
      </div>
      {displayError && (
        <p className="text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
}
