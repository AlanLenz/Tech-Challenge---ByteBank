import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit"
}

export default function Button({ children, onClick, type = "button" }: Props) {
  const { primary, white } = useThemeColors();

  return (
    <button
      type={type}
      onClick={onClick}
      className="cursor-pointer w-full py-3 rounded-md font-semibold"
      style={{ backgroundColor: primary, color: white }}
    >
      {children}
    </button>
  )
}