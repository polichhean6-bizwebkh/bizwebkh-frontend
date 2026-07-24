import type { GalleryImage } from '../types';
import { villaImagePool, foodImagePool, barImagePool, experienceImagePool, lifestyleImages } from './images';

export const galleryImages: GalleryImage[] = [
  ...villaImagePool.slice(0, 6).map((src, i) => ({ id: `g-villa-${i}`, src, category: 'Villas' as const, alt: 'Private villa at Kep Ocean Resort' })),
  { id: 'g-food-1', src: foodImagePool.seafood, category: 'Food', alt: 'Fresh Kep seafood' },
  { id: 'g-food-2', src: foodImagePool.khmer, category: 'Food', alt: 'Khmer dish' },
  { id: 'g-food-3', src: foodImagePool.breakfast, category: 'Food', alt: 'Breakfast spread' },
  { id: 'g-food-4', src: foodImagePool.western, category: 'Food', alt: 'Western dish' },
  { id: 'g-bar-1', src: barImagePool.cocktail, category: 'Bar', alt: 'Cocktail at the resort bar' },
  { id: 'g-bar-2', src: barImagePool.sunsetDrinks, category: 'Bar', alt: 'Sunset drinks' },
  { id: 'g-bar-3', src: barImagePool.bar, category: 'Bar', alt: 'Resort bar area' },
  { id: 'g-ocean-1', src: lifestyleImages.ocean, category: 'Ocean', alt: 'Kep coastline' },
  { id: 'g-ocean-2', src: lifestyleImages.aerial, category: 'Ocean', alt: 'Aerial view of the coast' },
  { id: 'g-ocean-3', src: lifestyleImages.couple, category: 'Ocean', alt: 'Couple relaxing by the sea' },
  { id: 'g-exp-1', src: experienceImagePool.island, category: 'Experiences', alt: 'Rabbit Island boat trip' },
  { id: 'g-exp-2', src: experienceImagePool.crabMarket, category: 'Experiences', alt: 'Kep Crab Market' },
  { id: 'g-exp-3', src: experienceImagePool.nationalPark, category: 'Experiences', alt: 'Kep National Park trail' },
];
