/**
 * Armazena o anexo de uma transação no localStorage
 */
export function saveReceipt(transferId: string | number, receiptData: string): void {
  try {
    localStorage.setItem(`receipt_${transferId}`, receiptData);
  } catch (error) {
    console.error("Erro ao armazenar anexo:", error);
  }
}

/**
 * Recupera o anexo de uma transação do localStorage
 */
export function getReceipt(transferId: string | number): string | null {
  try {
    return localStorage.getItem(`receipt_${transferId}`);
  } catch (error) {
    console.error("Erro ao recuperar anexo:", error);
    return null;
  }
}

/**
 * Remove o anexo de uma transação do localStorage
 */
export function deleteReceipt(transferId: string | number): void {
  try {
    localStorage.removeItem(`receipt_${transferId}`);
  } catch (error) {
    console.error("Erro ao remover anexo:", error);
  }
}

/**
 * Converte um File para base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
