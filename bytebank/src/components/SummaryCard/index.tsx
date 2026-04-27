"use client";

import { useThemeColors } from "@/hooks/useThemeColors";

type SummaryCardVariant = "deposit" | "transfer" | "records";

interface SummaryCardProps {
  label: string;
  value: string | number;
  variant: SummaryCardVariant;
}

const variantStyles: Record<
  SummaryCardVariant,
  { bgKey: keyof ReturnType<typeof useThemeColors>; colorKey: keyof ReturnType<typeof useThemeColors> }
> = {
  deposit: { bgKey: "backgroundPage", colorKey: "deposit" },
  transfer: { bgKey: "backgroundTransfer", colorKey: "transfer" },
  records: { bgKey: "highlight", colorKey: "black" },
};

const SummaryCard = ({ label, value, variant }: SummaryCardProps) => {
  const colors = useThemeColors();
  const { bgKey, colorKey } = variantStyles[variant];

  return (
    <div className="rounded-md p-3" style={{ backgroundColor: colors[bgKey] }}>
      <p className="text-[12px] text-gray-600">{label}</p>
      <p className="text-[18px] font-semibold" style={{ color: colors[colorKey] }}>
        {value}
      </p>
    </div>
  );
};

export default SummaryCard;
