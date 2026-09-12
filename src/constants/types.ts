/**
 * Productos y toppings
 */
export interface Item {
  id: number;
  thumbnail: string;
  name: string;
  description?: string;
  price: number;
}

/**
 * Elemento del carrito
 */
export type CartItem = Item & {
  quantity: number;
  total: number;
};

/**
 * Estado de aplicación
 */
export interface AppState {
  showNav: boolean;
  showCart: boolean;
  cart: CartItem[];
  handleToggleNav: () => void;
  handleToggleCart: () => void;
  handleAddProduct: (item: Item) => void;
  handleRemoveProduct: (item: Item) => void;
  handleDeleteFromCart: (id: number) => void;
  clearCart: () => void;
}
