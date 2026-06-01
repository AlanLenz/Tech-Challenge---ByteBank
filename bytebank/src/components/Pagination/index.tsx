"use client";

import { cn } from "@/lib/utils";
import { useThemeColors } from "@/hooks/useThemeColors";
import Button from "../Button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className }: PaginationProps) => {
  const { textMuted } = useThemeColors();

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div
      className={cn(
        "flex justify-between items-center pt-6 mt-4 border-t border-gray-200",
        className,
      )}
    >
      <Button variant="neutral" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={isFirst}>
        Anterior
      </Button>

      <span className="text-sm" style={{ color: textMuted }}>
        Página {currentPage} de {totalPages}
      </span>

      <Button variant="neutral" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={isLast}>
        Próxima
      </Button>
    </div>
  );
};

export default Pagination;
