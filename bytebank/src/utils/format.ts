export const formatDate = (value: string) => {
  if (!value) return "";
  
  // Isolate the "2026-06-29" part by splitting at the "T"
  const datePart = value.split("T")[0]; 
  
  // Now split the clean date string
  const [year, month, day] = datePart.split("-");
  
  return `${day}/${month}/${year}`;
};

export const formatCurrency = (value: number | string | undefined | null) => {
  if (value === null || value === undefined || value === "") return "R$ 0,00";

  // parseFloat garante um primitivo number puro, não um objeto Number boxed
  const numericValue = parseFloat(String(value));

  if (isNaN(numericValue) || !isFinite(numericValue)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
};