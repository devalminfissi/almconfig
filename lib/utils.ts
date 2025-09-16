import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency in Euro
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

// Format dimensions
export function formatDimensions(dimensions: { width: number; height: number; depth?: number }): string {
  const { width, height, depth } = dimensions;
  if (depth) {
    return `${width} × ${height} × ${depth} cm`;
  }
  return `${width} × ${height} cm`;
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Debounce function for search/filter
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone format
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Calculate total price
export function calculateTotalPrice(
  basePrice: number,
  accessories: Array<{ price: number }>,
  glassPrice: number = 0
): number {
  const accessoriesTotal = accessories.reduce((sum, acc) => sum + acc.price, 0);
  return basePrice + accessoriesTotal + glassPrice;
}

// Get step title
export function getStepTitle(step: number): string {
  const titles = {
    0: 'Accesso',
    1: 'Materiale',
    2: 'Categoria Prodotto',
    3: 'Configurazione',
    4: 'Anteprima',
    5: 'Richiesta Preventivo'
  };
  return titles[step as keyof typeof titles] || 'Passo Sconosciuto';
}

// Get step description
export function getStepDescription(step: number): string {
  const descriptions = {
    0: 'Scegli come accedere al configuratore',
    1: 'Seleziona il materiale del tuo serramento',
    2: 'Scegli il tipo di prodotto desiderato',
    3: 'Personalizza dimensioni, colori e accessori',
    4: 'Visualizza l\'anteprima della tua configurazione',
    5: 'Invia la richiesta di preventivo'
  };
  return descriptions[step as keyof typeof descriptions] || '';
}
