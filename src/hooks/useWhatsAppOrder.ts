import { CONFIG } from '../constants/config';
import { useAppStore } from '../store/appStore';
import { formatMoney } from '../utils/formats';

/**
 * Hook personalizado para ordenar por WhatsApp
 */
export function useWhatsAppOrder() {
  const cart = useAppStore((s) => s.cart);
  const clearCart = useAppStore((s) => s.clearCart);

  /**
   * Clic para ordenar a WhatsApp
   */
  const handleOrder = () => {
    let message: string = '';

    if (cart.length > 0) {
      const grandTotal = cart.reduce((acc, item) => acc + item.total, 0);
      message += 'Hola, me gustaría adquirir estos productos:\n\n';
      cart.forEach((item) => {
        message += `✅ *${item.name}*\n`;
        message += `Cant: ${item.quantity} | Subtotal: ${formatMoney(item.total)}\n\n`;
      });
      message += `*TOTAL A PAGAR: ${formatMoney(grandTotal)}*\n`;
    } else {
      message =
        '¡Hola! 👋 Vi su catálogo en línea y me gustaría realizar un pedido. 😊';
    }

    const encodedMessage = encodeURIComponent(message);
    clearCart();
    window.open(
      `https://wa.me/${CONFIG.PHONE}?text=${encodedMessage}`,
      '_blank',
    );
  };

  return handleOrder;
}
