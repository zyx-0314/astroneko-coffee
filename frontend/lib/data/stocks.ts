import { StockItem, StockStatus } from '@/schema/stock.schema';

export const stockItems: StockItem[] = [
  {
    id: 's1',
    name: 'Arabica Coffee Beans',
    category: 'beans',
    currentQty: 15,
    threshold: 20,
    unit: 'kg',
    supplier: 'Cosmic Roasters',
    lastRestocked: '2025-08-15T09:00:00.000Z',
    cost: 45.00
  },
  {
    id: 's2',
    name: 'Whole Milk',
    category: 'milk',
    currentQty: 8,
    threshold: 10,
    unit: 'L',
    supplier: 'Galaxy Dairy',
    lastRestocked: '2025-08-17T07:30:00.000Z',
    cost: 3.50
  },
  {
    id: 's3',
    name: 'Vanilla Syrup',
    category: 'syrups',
    currentQty: 5,
    threshold: 6,
    unit: 'bottles',
    supplier: 'Stellar Flavors',
    lastRestocked: '2025-08-14T11:00:00.000Z',
    cost: 12.50
  },
  {
    id: 's4',
    name: 'Croissants (Frozen)',
    category: 'pastries',
    currentQty: 25,
    threshold: 15,
    unit: 'pieces',
    supplier: 'Nebula Bakery',
    lastRestocked: '2025-08-17T06:00:00.000Z',
    cost: 1.25
  },
  {
    id: 's5',
    name: 'Paper Cups (16oz)',
    category: 'supplies',
    currentQty: 120,
    threshold: 100,
    unit: 'pieces',
    supplier: 'Orbital Supplies',
    lastRestocked: '2025-08-16T10:00:00.000Z',
    cost: 0.15
  },
  {
    id: 's6',
    name: 'Chocolate Powder',
    category: 'ingredients',
    currentQty: 2,
    threshold: 5,
    unit: 'kg',
    supplier: 'Dark Matter Co.',
    lastRestocked: '2025-08-12T14:00:00.000Z',
    cost: 28.00
  },
  {
    id: 's7',
    name: 'Oat Milk',
    category: 'milk',
    currentQty: 12,
    threshold: 8,
    unit: 'L',
    supplier: 'Plant Planets',
    lastRestocked: '2025-08-17T08:00:00.000Z',
    cost: 4.20
  },
  {
    id: 's8',
    name: 'Earl Grey Tea',
    category: 'ingredients',
    currentQty: 3,
    threshold: 4,
    unit: 'kg',
    supplier: 'Stellar Tea Co.',
    lastRestocked: '2025-08-13T12:00:00.000Z',
    cost: 35.00
  },
  {
    id: 's9',
    name: 'Danish Pastries (Frozen)',
    category: 'pastries',
    currentQty: 18,
    threshold: 12,
    unit: 'pieces',
    supplier: 'Nebula Bakery',
    lastRestocked: '2025-08-16T06:30:00.000Z',
    cost: 1.80
  },
  {
    id: 's10',
    name: 'Napkins',
    category: 'supplies',
    currentQty: 45,
    threshold: 50,
    unit: 'packs',
    supplier: 'Orbital Supplies',
    lastRestocked: '2025-08-15T09:30:00.000Z',
    cost: 2.50
  }
];

export function getStockStatus(item: StockItem): StockStatus {
  if (item.currentQty <= item.threshold) {
    return 'danger';
  } else if (item.currentQty <= item.threshold * 1.2) {
    return 'warning';
  }
  return 'ok';
}

export function getLowStockItems(): StockItem[] {
  return stockItems.filter(item => getStockStatus(item) === 'danger');
}

export function getStockItemsByCategory(category: StockItem['category']): StockItem[] {
  return stockItems.filter(item => item.category === category);
}
