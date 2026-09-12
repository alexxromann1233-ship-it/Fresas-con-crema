/**
 * Convertir a formato de dinero
 */
export const formatMoney = (value: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value);
};

/**
 * Convertir a formato de telefono
 */
export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "+$1 $2 $3 $4");
};
