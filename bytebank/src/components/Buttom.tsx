type ButtonProps = {
  children: React.ReactNode
  variant?: "primary"
}

export function Button({ children, variant = "primary" }: ButtonProps) {
  const base = "btn"

  const variants = {
    primary: "btn-primary-custom",
  }

  return (
    <button className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  )
} 