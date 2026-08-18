export type Product = {
  id: string
  name: string
  emoji: string
  price: number
  tags: Array<'sweet' | 'salty' | 'healthy'>
  stock: number
}

export const products: Product[] = [
  { id: 'snk-001', name: 'Trail Mix Supreme', emoji: '🥜', price: 4.99, tags: ['salty', 'healthy'], stock: 24 },
  { id: 'snk-002', name: 'Sour Gummy Worms', emoji: '🪱', price: 2.49, tags: ['sweet'], stock: 41 },
  { id: 'snk-003', name: 'Sea Salt Popcorn', emoji: '🍿', price: 3.29, tags: ['salty'], stock: 17 },
  { id: 'snk-004', name: 'Dark Chocolate Almonds', emoji: '🍫', price: 5.99, tags: ['sweet', 'healthy'], stock: 12 },
  { id: 'snk-005', name: 'Wasabi Peas', emoji: '🫛', price: 3.49, tags: ['salty', 'healthy'], stock: 8 },
  { id: 'snk-006', name: 'Strawberry Fruit Leather', emoji: '🍓', price: 1.99, tags: ['sweet', 'healthy'], stock: 33 },
  { id: 'snk-007', name: 'Everything Pretzel Bites', emoji: '🥨', price: 3.99, tags: ['salty'], stock: 21 },
  { id: 'snk-008', name: 'Mango Habanero Jerky', emoji: '🥩', price: 7.49, tags: ['salty'], stock: 6 },
  { id: 'snk-009', name: 'Honey Granola Clusters', emoji: '🍯', price: 4.49, tags: ['sweet', 'healthy'], stock: 19 },
  { id: 'snk-010', name: 'Rainbow Sour Belts', emoji: '🌈', price: 2.99, tags: ['sweet'], stock: 27 },
  { id: 'snk-011', name: 'Seaweed Crisps', emoji: '🌿', price: 2.79, tags: ['salty', 'healthy'], stock: 14 },
  { id: 'snk-012', name: 'Birthday Cake Bites', emoji: '🎂', price: 3.79, tags: ['sweet'], stock: 22 },
]
