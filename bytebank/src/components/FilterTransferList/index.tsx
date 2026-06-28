"use client";

import { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import InputText from "@/components/InputText";
import InputDate from "@/components/InputDate";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import type { TransferFilters } from "@/types/transfer";

export type { TransferFilters };

interface FilterTransferListProps {
  onFilter?: (filters: TransferFilters) => void;
}

const TYPE_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "Deposit", label: "Depósito" },
  { value: "Transfer", label: "Transferência" },
];

// Updated values to strictly match your Postgres 'categories' table IDs
const CATEGORY_OPTIONS = [
  { value: "all", label: "Todas" },
  { value: "1", label: "Alimentação" },
  { value: "2", label: "Transporte" },
  { value: "3", label: "Moradia" },
  { value: "4", label: "Saúde" },
  { value: "5", label: "Educação" },
  { value: "6", label: "Lazer" },
  { value: "7", label: "Outros" },
];

const RECEIPT_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "yes", label: "Com anexo" },
  { value: "no", label: "Sem anexo" },
];

const EMPTY_FILTERS: TransferFilters = {
  description: "",
  startDate: "",
  endDate: "",
  type: "all",
  category: "all",
  hasReceipt: "all",
};

const FilterTransferList = ({ onFilter }: FilterTransferListProps) => {
  const { black, white } = useThemeColors();
  const [filters, setFilters] = useState<TransferFilters>(EMPTY_FILTERS);

  const handleChange = <K extends keyof TransferFilters>(key: K, value: TransferFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter?.(filters);
  };

  const handleClear = () => {
    setFilters(EMPTY_FILTERS);
    onFilter?.(EMPTY_FILTERS);
  };

  return (
    <section
      className="w-full rounded-lg p-4 sm:p-6 lg:p-8"
      style={{ backgroundColor: white }}
    >
      <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold mb-6" style={{ color: black }}>
        Filtrar Transferências
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <InputText
            id="filter-description"
            label="Descrição"
            value={filters.description}
            onChange={(val) => handleChange("description", val)}
            placeholder="Buscar por descrição"
          />

          <InputDate
            id="filter-start-date"
            label="Data inicial"
            value={filters.startDate}
            onChange={(val) => handleChange("startDate", val)}
            max={filters.endDate || undefined}
          />

          <InputDate
            id="filter-end-date"
            label="Data final"
            value={filters.endDate}
            onChange={(val) => handleChange("endDate", val)}
            min={filters.startDate || undefined}
          />

          <InputSelect
            id="filter-type"
            label="Tipo"
            value={filters.type}
            onChange={(val) => handleChange("type", val as TransferFilters["type"])}
            options={TYPE_OPTIONS}
            placeholder="Todos"
            size="lg"
          />

          <InputSelect
            id="filter-category"
            label="Categoria"
            value={String(filters.category)}
            onChange={(val) => {
              // If they pick "all", pass the string "all". Otherwise, convert "1" to Number(1)
              const parsedCategory = val === "all" ? "all" : Number(val);
              handleChange("category", parsedCategory as TransferFilters["category"]);
            }}
            options={CATEGORY_OPTIONS}
            placeholder="Todas"
            size="lg"
          />

          <InputSelect
            id="filter-receipt"
            label="Anexo"
            value={filters.hasReceipt}
            onChange={(val) => handleChange("hasReceipt", val as TransferFilters["hasReceipt"])}
            options={RECEIPT_OPTIONS}
            placeholder="Todos"
            size="lg"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
            Filtrar
          </Button>
          <Button type="button" variant="neutral" size="md" className="w-full sm:w-auto" onClick={handleClear}>
            Limpar filtros
          </Button>
        </div>
      </form>
    </section>
  );
};

export default FilterTransferList;