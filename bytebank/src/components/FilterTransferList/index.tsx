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

const EMPTY_FILTERS: TransferFilters = {
  description: "",
  startDate: "",
  endDate: "",
  type: "all",
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
      <h2 className="text-[28px] font-bold mb-6" style={{ color: black }}>
        Filtrar Transferências
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
        </div>

        <div className="flex gap-3 mt-6">
          <Button type="submit" variant="primary" size="md">
            Filtrar
          </Button>
          <Button type="button" variant="neutral" size="md" onClick={handleClear}>
            Limpar filtros
          </Button>
        </div>
      </form>
    </section>
  );
};

export default FilterTransferList;