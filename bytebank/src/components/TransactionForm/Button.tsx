type Props = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit"
}

export default function Button({ children, onClick, type = "button" }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#004D61] text-white w-full py-3 rounded-md font-semibold"
    >
      {children}
    </button>
  )
}