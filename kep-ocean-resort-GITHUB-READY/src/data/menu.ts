import type { MenuItem } from '../types';
import { foodImagePool, barImagePool } from './images';

export const menuItems: MenuItem[] = [
  { id: 'm1', name: 'Khmer Rice Porridge (Borbor)', category: 'Breakfast', price: 3.5, image: foodImagePool.breakfast, description: 'Warm rice porridge with herbs, ginger, and a side of fried dough.', available: true },
  { id: 'm2', name: 'Tropical Fruit Plate', category: 'Breakfast', price: 3, image: foodImagePool.breakfast, description: 'Seasonal Cambodian fruit including dragon fruit, papaya, and pineapple.', available: true },
  { id: 'm3', name: 'Eggs & Baguette', category: 'Breakfast', price: 4, image: foodImagePool.breakfast, description: 'Fried or scrambled eggs served with a fresh Cambodian baguette.', available: true },
  { id: 'm4', name: 'Kep Crab with Green Pepper', category: 'Seafood', price: 14, image: foodImagePool.seafood, description: 'Kep\'s signature dish — local crab stir-fried with fresh green peppercorns.', available: true },
  { id: 'm5', name: 'Grilled Squid', category: 'Seafood', price: 9, image: foodImagePool.seafood, description: 'Grilled squid with a lime and chili dipping sauce.', available: true },
  { id: 'm6', name: 'Steamed Fish with Lime', category: 'Seafood', price: 11, image: foodImagePool.seafood, description: 'Whole steamed fish with garlic, lime, and fresh herbs.', available: true },
  { id: 'm7', name: 'Amok Trey (Fish Amok)', category: 'Khmer Food', price: 8, image: foodImagePool.khmer, description: 'Traditional Khmer steamed fish curry in banana leaf.', available: true },
  { id: 'm8', name: 'Khmer Beef Lok Lak', category: 'Khmer Food', price: 7.5, image: foodImagePool.khmer, description: 'Stir-fried marinated beef served over rice with a fried egg.', available: true },
  { id: 'm9', name: 'Bai Sach Chrouk', category: 'Khmer Food', price: 4.5, image: foodImagePool.khmer, description: 'Grilled pork with rice, pickled vegetables, and broth.', available: false },
  { id: 'm10', name: 'Green Papaya Salad', category: 'Khmer Food', price: 4, image: foodImagePool.khmer, description: 'Fresh papaya salad with lime, chili, and peanuts.', available: true },
  { id: 'm11', name: 'Club Sandwich', category: 'Western Food', price: 6, image: foodImagePool.western, description: 'Grilled chicken, egg, and vegetables on toasted bread with fries.', available: true },
  { id: 'm12', name: 'Margherita Pizza', category: 'Western Food', price: 8, image: foodImagePool.western, description: 'Classic tomato, mozzarella, and basil on a thin crust.', available: true },
  { id: 'm13', name: 'French Fries', category: 'Snacks', price: 2.5, image: foodImagePool.snacks, description: 'Crispy fries served with house dipping sauce.', available: true },
  { id: 'm14', name: 'Spring Rolls', category: 'Snacks', price: 3, image: foodImagePool.snacks, description: 'Fresh vegetable spring rolls with peanut sauce.', available: true },
  { id: 'm15', name: 'Kep Sunset Cocktail', category: 'Cocktails', price: 4.5, image: barImagePool.sunsetDrinks, description: 'House rum cocktail with passionfruit and lime, best enjoyed at sunset.', available: true },
  { id: 'm16', name: 'Mojito', category: 'Cocktails', price: 4, image: barImagePool.cocktail, description: 'White rum, mint, lime, and soda.', available: true },
  { id: 'm17', name: 'Gin & Tonic', category: 'Cocktails', price: 4, image: barImagePool.cocktail2, description: 'Classic gin and tonic with fresh lime.', available: true },
  { id: 'm18', name: 'Angkor Draft Beer', category: 'Beer', price: 1.5, image: barImagePool.beer, description: 'Local Cambodian draft beer, ice cold.', available: true },
  { id: 'm19', name: 'Cambodian Red Wine', category: 'Wine', price: 5, image: barImagePool.wine, description: 'Glass of red wine from our small selection.', available: true },
  { id: 'm20', name: 'Fresh Watermelon Juice', category: 'Juice', price: 2, image: foodImagePool.juice, description: 'Freshly pressed watermelon juice.', available: true },
  { id: 'm21', name: 'Fresh Lime Soda', category: 'Soft Drinks', price: 1.5, image: foodImagePool.juice, description: 'Sparkling soda with fresh lime and a touch of sugar or salt.', available: true },
  { id: 'm22', name: 'Khmer Iced Coffee', category: 'Coffee', price: 2, image: foodImagePool.coffee, description: 'Strong local coffee with condensed milk over ice.', available: true },
  { id: 'm23', name: 'Espresso', category: 'Coffee', price: 2, image: foodImagePool.coffee, description: 'Double shot espresso.', available: true },
];
