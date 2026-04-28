"use client";

import Link from "next/link";
import { useThemeColors } from "@/hooks/useThemeColors";

interface MenuItemProps {
  label: string;
  href: string;
  isActive: boolean;
  hasDivider?: boolean;
}

const MenuItem = ({ label, href, isActive, hasDivider = true }: MenuItemProps) => {
  const { primary } = useThemeColors();

  return (
    <li className="text-center">
      <Link href={href} className={`text-[16px] ${isActive ? "font-bold" : "font-normal"}`} style={{ color: primary }}>
        {label}
      </Link>
      {hasDivider && <div className="w-full h-[1px] my-4" style={{ backgroundColor: primary }} />}
    </li>
  );
};

export default MenuItem;