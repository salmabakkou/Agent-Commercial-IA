/**
 * Mock product data for Moroccan souk e-commerce
 * Stock status: 'in_stock' | 'low_stock' | 'out_of_stock'
 */
export const featuredProducts = [
  {
    id: '1',
    name: 'Lanterne en Laiton Traditionnel',
    price: 245,
    image: 'https://images.unsplash.com/photo-1602874801006-4e0c82c6bc78?w=400&h=400&fit=crop',
    stockStatus: 'in_stock',
    category: 'Artisanat',
  },
  {
    id: '2',
    name: 'Tapis Berbère Fait Main',
    price: 890,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop',
    stockStatus: 'in_stock',
    category: 'Textile',
  },
  {
    id: '3',
    name: 'Théière en Céramique Émaillée',
    price: 165,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop',
    stockStatus: 'low_stock',
    category: 'Céramique',
  },
  {
    id: '4',
    name: 'Safran du Taliouine - 2g',
    price: 95,
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&h=400&fit=crop',
    stockStatus: 'in_stock',
    category: 'Épices',
  },
]

export const allProducts = [
  ...featuredProducts,
  {
    id: '5',
    name: 'Cuivre Martelé - Plat de Service',
    price: 320,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop',
    stockStatus: 'in_stock',
    category: 'Artisanat',
  },
  {
    id: '6',
    name: 'Pot d\'Argan Bio - 100ml',
    price: 78,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    stockStatus: 'out_of_stock',
    category: 'Beauté',
  },
  {
    id: '7',
    name: 'Bougie aux Notes d\'Oud',
    price: 45,
    image: 'https://images.unsplash.com/photo-1602874801006-4e0c82c6bc78?w=400&h=400&fit=crop',
    stockStatus: 'in_stock',
    category: 'Parfumerie',
  },
  {
    id: '8',
    name: 'Babouches Cuir Traditionnel',
    price: 120,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    stockStatus: 'low_stock',
    category: 'Textile',
  },
]
