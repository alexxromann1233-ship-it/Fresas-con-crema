import type { Item } from './types';

/**
 * Navegador
 */
export const NAV = [
  { href: '#inicio', text: 'Inicio' },
  { href: '#productos', text: 'Productos' },
  { href: '#contacto', text: 'Contacto' },
] as const;

/**
 * Indicadores
 */
export const KPI = [
  { name: 'Fresco', value: '100%' },
  { name: 'Toppings', value: '12+' },
  { name: 'Tamaños', value: '3' },
] as const;

/**
 * Productos
 */
export const PRODUCTS: Item[] = [
  {
    id: 3,
    thumbnail:
      'https://images.rappi.com/products/1704407546970_1704407541485_1704407542703.jpeg',
    name: 'Fresas 1',
    description: '14oz',
    price: 15000,
  },
  {
    id: 2,
    thumbnail:
      'https://images.rappi.com/products/1704407546970_1704407541485_1704407542703.jpeg',
    name: 'Fresas 2',
    description: '16oz',
    price: 20000,
  },
  {
    id: 1,
    thumbnail:
      'https://images.rappi.com/products/1704407546970_1704407541485_1704407542703.jpeg',
    name: 'Fresas 3',
    description: '22oz',
    price: 25000,
  },
  
   {
    id: 4,
    thumbnail:
      'images/productos/ensalada2.webp',
    name: 'Ensalada de Frutas 2',
    description: '16oz',
    price: 18000,
  },
   {
    id: 5,
    thumbnail:
      'images/productos/ensalada1.webp',
    name: 'Ensalada de Frutas 1',
    description: '14oz',
    price: 15000,
  },
 
] as const;

/**
 * Toppings
 */
export const TOPPINGS: Item[] = [
  {
    id: 4,
    thumbnail:
      'images/toppings/queso.webp',
    name: 'Queso Rayado',
    price: 1500,
  },
 
  {
    id: 6,
    thumbnail:
      'https://llenatudespensa.com/barquillos-cortos-bicolor-cacao_Id-14614.jpg',
    name: 'Barquillos',
    price: 1000,
  },
  {
    id: 7,
    thumbnail:
      'images/toppings/oreo.webp',
    name: 'Oreo',
    price: 2500,
  },
  
  {
    id: 12,
    thumbnail:
      'images/toppings/m&m.webp',
    name: 'm&m',
    price: 1500,
  },
  {
    id: 13,
    thumbnail:
      'images/toppings/chocoramo.webp',
    name: 'Chocoramo',
    price: 1200,
  },
  {
    id: 14,
    thumbnail:
      'images/toppings/fresas.extra.webp',
    name: 'Fresas Extra',
    price: 1800,
  },

  {
    id: 16,
    thumbnail:
    'images/toppings/nutella.webp',
    name: 'Nutella',
    price: 3000,
  },
  {
    id: 17,
    thumbnail:
    'images/toppings/chips.webp',
    name: 'Chips de Chocolate',
    price: 3000,
  },
  {
    id: 18,
    thumbnail:
    'images/toppings/chocolate.blanco.webp',
    name: 'Chocolate Blanco',
    price: 3000,
  },
] as const;
