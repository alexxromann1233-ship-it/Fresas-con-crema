import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState } from '../constants/types';

/**
 * Almacenamiento de aplicación
 */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      showNav: false,
      showCart: false,
      cart: [],

      handleToggleNav: () => set((s) => ({ showNav: !s.showNav })),

      handleToggleCart: () => set((s) => ({ showCart: !s.showCart })),

      handleAddProduct: (item) => {
        const cart = get().cart;
        const existingItem = cart.find((i) => i.id === item.id);

        if (existingItem) {
          set((state) => ({
            cart: state.cart.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                    total: (i.quantity + 1) * i.price,
                  }
                : i,
            ),
          }));
        } else {
          set((s) => ({
            cart: [...s.cart, { ...item, quantity: 1, total: item.price }],
          }));
        }
      },

      handleRemoveProduct: (item) => {
        const cart = get().cart;
        const existingItem = cart.find((i) => i.id === item.id);

        if (existingItem && existingItem.quantity > 1) {
          set((s) => ({
            cart: s.cart.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    quantity: i.quantity - 1,
                    total: (i.quantity - 1) * i.price,
                  }
                : i,
            ),
          }));
        } else {
          set((s) => ({
            cart: s.cart.filter((i) => i.id !== item.id),
          }));
        }
      },

      handleDeleteFromCart: (id) => {
        set((s) => ({
          cart: s.cart.filter((i) => i.id !== id),
        }));
      },

      clearCart: () => set(() => ({ cart: [] })),
    }),
    { name: 'app-store' },
  ),
);
