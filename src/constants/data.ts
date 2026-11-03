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
 * Productos
 */
export const PRODUCTS: Item[] = [
  {
    id: 3,
    thumbnail:
      'images/productos/fresas1.webp',
    name: 'Fresas 1',
    description: '12oz',
    price: 15000,
  },
  {
    id: 2,
    thumbnail:
      'images/productos/fresas.webp',
    name: 'Fresas 2',
    description: '14oz',
    price: 18000,
  },
  {
    id: 1,
    thumbnail:
      'images/productos/fresas.webp',
    name: 'Fresas 3',
    description: '16oz',
    price: 21000,
  },
  
   {
    id: 4,
    thumbnail:
      'images/productos/ensalada2.webp',
    name: 'Ensalada de Frutas 2',
    description: '14oz',
    price: 16000,
  },
   {
    id: 5,
    thumbnail:
      'images/productos/ensalada1.webp',
    name: 'Ensalada de Frutas 1',
    description: '16oz',
    price: 18000,
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
    price: 0,
  },
 
  {
    id: 6,
    thumbnail:
      'images/toppings/barquillos.webp',
    name: 'Barquillos',
    price: 0,
  },
  {
    id: 7,
    thumbnail:
      'images/toppings/oreo.webp',
    name: 'Oreo',
    price: 0,
  },
  
  {
    id: 12,
    thumbnail:
      'images/toppings/m&m.webp',
    name: 'm&m',
    price: 3000,
  },
   
  {
    id: 14,
    thumbnail:
      'images/toppings/fresas.extra.webp',
    name: 'Fresas Extra',
    price: 3000,
  },

  {
    id: 16,
    thumbnail:
    'images/toppings/nussmilh.webp',
    name: 'Nuss Milh',
    price: 0,
  },
  {
    id: 17,
    thumbnail:
    'images/toppings/chips.webp',
    name: 'Chips de Chocolate',
    price: 0,
  },
  {
    id: 18,
    thumbnail:
    'images/toppings/chocolate.blanco.webp',
    name: 'Chocolate Blanco',
    price: 0,
  },
] as const;

/**
 * Indicadores (derivados del catálogo para que no se desactualicen)
 */
export const KPI = [
  { id: 'fresh', name: 'Fruta fresca', value: 100, suffix: '%' },
  { id: 'products', name: 'Productos', value: PRODUCTS.length },
  { id: 'toppings', name: 'Toppings', value: TOPPINGS.length },
  {
    id: 'sizes',
    name: 'Tamaños',
    value: new Set(PRODUCTS.map((item) => item.description)).size,
  },
] as const;
